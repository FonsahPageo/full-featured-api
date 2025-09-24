import { doHash, doHashValidation, hmacProcess } from '../utils/hashing.js';
import { signupSchema, signinSchema, acceptCodeSchema, changePasswordSchema } from '../middlewares/validator.js';
import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import { transport } from '../middlewares/sendMail.js';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });

        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPasswword = await doHash(password, 12);
        const newUser = new User({
            email,
            password: hashedPasswword
        });
        const result = await newUser.save();
        result.password = undefined;

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            result,
        });
    } catch (error) {
        console.log(error)
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message
            });
        }

        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist!'
            });
        }

        const result = await doHashValidation(password, existingUser.password);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '8h',
            }
        );

        res.cookie('Authorization', 'Bearer ' + token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production'
        })
            .json({
                success: true,
                token,
                message: 'Logged in successfully',
            });
    } catch (error) {
        console.log(error);
    }
};

export const signout = async (req, res) => {
    res.clearCookie('Authorization').status(200)
        .json({
            success: true,
            message: 'Logged out successfully'
        });
};

export const sendVerificationCode = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist!'
            });
        }
        if (existingUser.verified) {
            return res.status(400).json({
                success: false,
                message: 'You are already verified!'
            });
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: 'Verification code',
            html: '<h1>' + codeValue + '</h1>'
        });

        if (info.accepted[0] === existingUser.email) {
            const hashedCodeValue = hmacProcess(
                codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET
            );
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValidation = Date.now();
            await existingUser.save();
            return res.status(200).json({
                success: true,
                message: 'Verification code sent successfully'
            })
        }
        return res.status(400).json({
            success: true,
            message: 'Failed to send verification code'
        })
    } catch (error) {
        console.log(error);
    }
};

export const verifyVerificationCode = async (req, res) => {
    const { email, emailVerificationCode } = req.body;
    try {
        const { error, value } = acceptCodeSchema.validate({ email, emailVerificationCode });
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message
            });
        }

        const codeValue = emailVerificationCode.toString();
        const existingUser = await User.findOne({ email }).select('+verificationCode +verificationCodeValidation');
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist!'
            });
        }

        if (existingUser.verified) {
            return res.status(400).json({
                success: false,
                message: 'You are already verified!'
            });
        }

        if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
            return res.status(400).json({
                success: false,
                message: 'Something is wrong with the code!'
            })
        }

        if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
            return res.status(400).json({
                success: false,
                message: 'Code has expired'
            });
        }

        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
        if (hashedCodeValue === existingUser.verificationCode) {
            existingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodeValidation = undefined;
            await existingUser.save();
            return res.status(200).json({
                success: true,
                message: 'Your email has been succesfully verified.'
            });
        }

        return res.status(400).json({
            success: false,
            message: 'An unexpected error occured. Please try again'
        });
    } catch (error) {
        console.log(error);
    }
};

export const changePassword = async (req, res) => {
    const { userId, verified } = req.user;
    const { oldPassword, newPassword } = req.body;

    try {
        const { error, value } = changePasswordSchema.validate({ oldPassword, newPassword });
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message
            });
        }

        if (!verified) {
            return res.status(401).json({
                success: false,
                message: 'You have not yet verified your email!'
            })
        }

        const existingUser = await User.findOne({ _id: userId }).select('+password');
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist!'
            });
        }

        const result = await doHashValidation(oldPassword, existingUser.password);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        const hashedPasswword = await doHash(newPassword, 12);
        existingUser.password = hashedPasswword;
        await existingUser.save();
        return res.status(200).json({
                success: true,
                message: 'Password changed successfully'
            });
    } catch (error) {
        console.log(error);
    }
}
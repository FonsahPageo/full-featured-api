import { signupSchema } from "../middlewares/validator.js";
import { doHash } from "../utils/hashing.js";

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });

        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: 'user already exists'
            });
        }

        const hashedPasswword = await doHash(password, 12);
        const newUser = new User({
            email,
            password:hashedPasswword
        });
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            result
        });
    } catch (err) {
        console.log(err)
    }
    res.json({ message: 'Signup success' });
}
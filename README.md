# **Node.js** API Tutorial with Node.js, Express, MongoDB, JWT Authentication

This is a full-featured API that supports user authentication while performing operations like user sign-up, sign-in, email verification, password reset, sign-out. Also supports CRUD operations for a blog-like post system.

## Features

- User registration & login with secure password hashing (`bcrypt`)
- JWT-based authentication 
- Email verification (with Gmail)
- Password reset
- Post creation
- Viewing all posts & individual posts with the post ID
- Updating and deleting posts
- Logout

## Tech stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT (Access & Refresh Tokens), bcrypt
- **Validation:** Joi
- **Environment Config:** dotenv
- **API Platform:** Postman
- **Email sending:** Nodemailer

```
index.js                    # Main Express app configuration/server entry point
models/                     # Data models (Service Layer)
    |---userModel.js        # User data operations
    |---postModel.js        # Post data operations
controllers/                # Route handlers (Controller Layer)
    |---authController.js   # User route handlers
    |---postController.js   # Post route handlers
routes/                     # Route definitions
    |---userRoutes.js       # User API routes
    |---postRoutes.js       # Post API routes
middlewares/                # Custom middleware
    |---sendMail.js         # Setup for sending emails
    |---validator.js        # Input Validation
    |---identification.js   # User verification with JWT
utils/                      # Utility functions
    |---hashing.js          # Hashing functions for different valuees
```
---

## Database structure

### Users table

- Stores user information during registration (email, password)
- Uses bcrypt to hash passwords before storing for security
- Email and password shemas are validated by Joi

### Posts table

- Stores various posts created by the user
- Post schema validated by Joi

## Getting started

### Clone the repository 

```bash
git clone https://github.com/FonsahPageo/nodejs-api-tut.git

cd nodejs-api-tut

npm install

mv .env.example .env

npm run dev
```

**NOTE:** Edit the `.env` file to fill in the required parameters such as **PORT** **MONGO_URI** etc.

for instance

`.env`
```bash
PORT=desired_port_number
MONGO_URI=your_mongo_uri
TOKEN_SECRET=your_token
NODE_CODE_SENDING_EMAIL_ADDRESS=your_gmail_address
NODE_CODE_SENDING_EMAIL_PASSWORD=your_google_app_password
HMAC_VERIFICATION_CODE_SECRET=your_hmac_verfication_code_secret
```

Open **Postman** or any API platform, create a new collection for the various endpoints, make requests to test the different API endpoints.

## API Documentation

Ensure to change **DB_HOST** and **DB_PORT** to the values defined in your `.env` file

### Authentication

#### Create User
POST /signup

#### Login User
POST /signin

#### Logout User
POST /signout

#### Send email verification code
PATCH /send-verification-code

#### Verify the email verification code
PATCH /verify-verification-code

#### Send password reset verification code
PATCH /send-forgot-password-code

#### Verify the passwword reset verification code
PATCH /verify-forgot-password-code

#### Create a post
POST /create-post

#### Show all posts
GET /all-posts

#### Show a particular post by its ID
GET /single-post?_id=<post_id>

#### Update a post
PUT /update-post?_id=<post_id>

#### Delete a post
DELETE delete-post?_id=<post_id>


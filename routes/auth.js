const express = require(`express`);
const router = express.Router();
const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);


//Register route
router.post (`/register`, async (req, res) => {

    // Getting all the fields 
    const { name, email, mobile, password } = req.body;
    try {
        if ( !name || !email || !mobile || !password ) {
            return res.status(400).json({ error: `All fields are required` });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: `Email is already registered` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User ({ 
            name, 
            email, 
            mobile, 
            password: hashedPassword 
        });
        await user.save();
    } 

    catch (error) {
        console.log(error);
        res.json ({ 
            success: false, 
            errorMessage: `Internal Server Error` 
        });
    }
});

//Login route
router.post(`/login`, async (req, res) => {
    try {
        if (!email || !password) {
            return res.status().json ({ error: `Both fields are mandatory` });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: `Invalid email or password` });
        } 

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json ({ error: `Invalid email or password` })
        }

        const token = jwt.sign({ userID: user._id }, `JWT_KEY`);
        res.json({
            success: true,
            token,
            recruiterName: user.name,
            user: email,
        });

    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: `Something went wrong! Please try after some time.` })
    }
});

module.exports = router;
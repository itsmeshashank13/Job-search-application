const jwt = require(`jsonwebtoken`);


const verifyAuth = (req, res, next) => {
    try {
        const token = req.headers(`Authorization`);

        if (!token) {
            return res.status().json({ message: `Unauthorized` });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) return res.status(401).json({ message: `Invalid token` });

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            success: false, 
            errorMessage: `Something went wrong! Please try again later...` 
        });
    }
};


module.exports = verifyAuth;


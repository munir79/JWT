
 const jwt=require('jsonwebtoken')
export  const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // res.json({ message: "Protected content", user: decoded });

        next();
    } catch (err) {
        res.status(403).send("Invalid Token");
    }
};
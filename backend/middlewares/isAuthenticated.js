import jwt from "jsonwebtoken";

const isAuthenticated=async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not auth",
                success:false
            })
        }
        const jwtSecret = process.env.SECRET_KEY || process.env.JWT_SECRET_KEY || "fallback-secret-key-for-development";
        const decode= await jwt.verify(token, jwtSecret);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                seccess:false
            })
        }
        req.id=decode.userId;
        next();

    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;
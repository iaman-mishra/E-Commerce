import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next)=>{
    try {
        const {token}=req.headers
        if (!token) {
            return res.json({sucess:false, message: "Unauthorized" });
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if (decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({sucess:false, message: "Unauthorized Login again" });
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message: error.message });
    }
}

export default adminAuth
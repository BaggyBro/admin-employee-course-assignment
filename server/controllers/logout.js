const logout = async(req,res)=>{
    try{
        const cookieOption = {
            http:true,
            secure: true
        }

        return res.cookie('token',``,cookieOption).status(200).json({
            message: "Logout successfull!",
            success : true
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            error :true
        })
    }
}

module.exports = logout
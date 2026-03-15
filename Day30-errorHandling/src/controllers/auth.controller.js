export async function registerController(req, res, next){
    const user = ""
     
    if(!user){
        const error = new Error("user does not exist")
        error.statusCode = 404
        return next(error)
    }

    res.json({
        message: "User registered"
    })
}
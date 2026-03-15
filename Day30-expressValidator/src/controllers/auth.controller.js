export async function registerController(req, res, next){
    res.status(201).json({
        message: "User registered successfully"
    })
}
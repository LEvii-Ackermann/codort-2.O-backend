import dotenv from "dotenv"

dotenv.config()

export async function handleError(err, req, res, next){
    const statusCode = err.statusCode
    const response = {
        "message": err.message
    }

    if(process.env.NODE_ENVIRONMENT === "development"){
        response.stack = err.stack
    }

    res.status(statusCode).json(response)
}
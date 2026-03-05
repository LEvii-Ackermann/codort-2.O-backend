import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getFeed(){
    try {
        const response = await api.get('/api/post/feed');
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function createPost(imageFile, caption) {
    try {
        const formData = new FormData()

        formData.append("image", imageFile)
        formData.append("caption", caption)

        const response = await api.post('/api/post', formData)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
    const context = useContext(PostContext)

    const {loading, setLoading, post, setPost, feed, setFeed} = context

    const handleGetFeed = async () => {
        try {
            setLoading(true)
            const data = await getFeed()
            setFeed(data.posts)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {loading, feed, post, handleGetFeed}
}
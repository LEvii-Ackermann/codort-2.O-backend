import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
    const context = useContext(PostContext)

    const {loading, setLoading, post, setPost, feed, setFeed} = context

    const handleGetFeed = async () => {
        try {
            setLoading(true)
            const data = await getFeed()
            setFeed(data.posts.reverse())
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (imgFile, caption) => {
        try {
            setLoading(true)
            const data = await createPost(imgFile, caption)
            setFeed([data.post, ...feed])
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLikePost = async (postId) => {
        try {
            const data = await likePost(postId)
            await handleGetFeed()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnlikePost = async (postId) => {
        try {
            const data = await unlikePost(postId)
            await handleGetFeed()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return {loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost, handleUnlikePost}
}
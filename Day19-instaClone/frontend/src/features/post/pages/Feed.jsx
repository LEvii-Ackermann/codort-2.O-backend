import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import { useEffect } from "react";


const Feed = () => {

    const { loading, feed, handleGetFeed, handleLikePost, handleUnlikePost } = usePost() 

    useEffect(() => {
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is Loading</h1></main>)
    }

    console.log(feed)

  return (
    <main className="feed-page">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed.map(post=>{
            return <Post key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;

import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import { useEffect } from "react";


const Feed = () => {

    const { loading, feed, handleGetFeed } = usePost() 

    useEffect(() => {
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is Loading</h1></main>)
    }

    console.log(feed)

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map(post=>{
            return <Post key={post._id} user={post.user} post={post} />
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;

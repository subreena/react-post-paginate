import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useState } from 'react';
import Post from './Components/Posts/Post';
import Pagination from './Components/Pagination/Pagination';

function App() {
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [ postsPerPage] = useState(10);
  
  useEffect( () =>{
 
    const fetchPosts = async () =>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data);
      setLoading(false);
    }
fetchPosts();

  },[]);

  // GET CURRENT POSTS
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost , indexOfLastPost)


  // PAGINATE
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog Posts</h1>
        <Post posts={currentPosts} loading={loading}></Post>
        <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length}></Pagination>
      
       
    </div>
  );
}

export default App;

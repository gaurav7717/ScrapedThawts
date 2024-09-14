import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../components/blogs/BlogList.css";
import BlogItem from "./BlogItem";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";


const BlogList = ({ searchQuery }) => { // Accept searchQuery as a prop
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsArray); // Set the blogs in state
        console.log(blogsArray);
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const navigate = useNavigate();

  // Filter blogs based on the searchQuery
  const filteredBlogs = blogs.filter((blog) => 
    blog.tags?.toLowerCase().includes(searchQuery.toLowerCase()) // Apply filtering based on tags
  );
  
  console.log("filtered", filteredBlogs);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      alert("Blog deleted successfully");
      setBlogs(blogs.filter((blog) => blog.id !== id)); // Update blogs after deletion
      navigate("/");
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };

  return (
    <div>
      {/* Display filtered blogs */}
      {filteredBlogs.length > 0 ? (
        <>
        <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingTop: 5 }} className="list-box">
          <Grid container spacing={2} className="blog-list">
            {/* Map over filteredBlogs instead of blogs */}
            {filteredBlogs.map((blog) => (
              <Grid item key={blog.id} size="auto">
                <BlogItem blog={blog} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        </Box>
        </>
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;

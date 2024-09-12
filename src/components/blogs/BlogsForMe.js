import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import BlogItem from "./BlogItem";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function BlogsForMe({searchQuery=""}) {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    // Fetch the blogs collection
                    const blogsRef = collection(db, "blogs");
                    // Query to filter blogs where the recipient field matches currentUser.displayName
                    const q = query(blogsRef, where("recipient", "==", currentUser.displayName));
                    const querySnapshot = await getDocs(q);
                    // Map over the documents to extract the data
                    const userBlogs = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    // Set the blogs state
                    setBlogs(userBlogs);
                } catch (err) {
                    console.error("Failed to fetch blogs:", err);
                }
            } else {
                setUser(null);
                setBlogs([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const filteredBlogs = blogs.filter((blog) => 
        blog.tags?.toLowerCase().includes(searchQuery.toLowerCase()) // Apply filtering based on tags
      );
    

    return (
        <div>
            {
                user ? (
                    filteredBlogs.length > 0 ? (
                        <>
                            <Box sx={{ flexGrow: 1, paddingLeft: 5, paddingTop: 5 }}>
                                <Grid container spacing={3} className="blog-list">
                                    {filteredBlogs.map((blog) => (
                                        <Grid>
                                           <li key={blog.id}>
                                           <BlogItem blog={blog} />
                                           </li>
                                              
                                           
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>
                    ) : (
                        <p>Haven't recieved any thoughts</p>
                    )
                ) : (
                    <p>Please log in</p>
                )
            }
        </div>
    );
}

export default BlogsForMe;

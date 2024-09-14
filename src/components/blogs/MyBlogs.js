import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import BlogItem from "./BlogItem";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "../blogs/MyBlogs.css"

function MyBlogs({searchQuery}) {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const blogsRef = collection(db, "blogs");
                const q = query(blogsRef, where("userId", "==", currentUser.uid));
                const querySnapshot = await getDocs(q);
                const userBlogs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(userBlogs);
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
                            <Box sx={{ flexGrow: 1, paddingLeft: 5, paddingTop: 5 }} className="list-box"> 
                                <Grid container spacing={3} className="blog-list">
                                    {filteredBlogs.map((blog) => (
                                        <Grid>
                                           <li key={blog.id}>
                                           <BlogItem blog={blog} isMyBlog={true} />
                                           </li>
                                              
                                           
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>
                    ) : (
                        <p>Haven't written yet</p>
                    )
                ) : (
                    <p>Please log in</p>
                )
            }
        </div>
    );
}

export default MyBlogs;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Box, TextField, Button } from "@mui/material";  // Importing MUI components
import Navbar from "../Navbar";  // Assuming Navbar is a custom component in your project
import { Timestamp } from "firebase/firestore"; // Import Timestamp if you are using it


function EditBlogs() {
    const {id}=useParams();
    console.log("Blog ID:", id);
    const Navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("")
    const [tags, setTags] = useState("");

    useEffect(()=>
    {
        const fetchBlog = async () => 
        {
            try 
            {
                const docRef = doc(db, "blogs", id)
                const docSnap = await getDoc(docRef);
                if(docSnap.exists())
                {
                    const blog = docSnap.data();
                    setTitle(blog.title)
                    setDescription(blog.description)
                    setTags(blog.tags)
                }
            }
            catch(e){
                console.error(e)
            }
        }
        fetchBlog();

    }, [id])
    const handleUpdate = async (e)=>
    {
        e.preventDefault();
        try{
            const blogRef = doc(db, "blogs", id)
            await updateDoc (blogRef , 
                {
                    title: title,
                    description: description,
                    tags: tags,
                    updatedAt: Timestamp.fromDate(new Date()),
                }
            )
            Navigate("/")
        }
        catch(e){
            console.error("connot update blog: ", e)

        }
    }


  return (
    <div>
      <Navbar />
      <Box className="createpage">
        <h2>Description</h2>
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <h2>Tags</h2>
        <TextField
          id="standard-basic"
          label="Tags"
          variant="standard"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />

        <h3 className="publish-btn">
          {/*publish button*/}

          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </h3>
      </Box>
    </div>
  )
}

export default EditBlogs
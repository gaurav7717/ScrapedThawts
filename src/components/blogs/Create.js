import React, { useState , useEffect} from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "../blogs/Create.css";
import { Box, colors } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Navbar from "../Navbar";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";
import "../blogs/Create.css";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


const createblog = async (description, tags, imageUrl , selectedRecipient) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in ");
      throw new Error("User is not Authenticated");
    }
    const docRef = await addDoc(collection(db, "blogs"), {
      title: user.displayName,
      recipient:selectedRecipient,
      description: description,
      tags: tags,
      imageUrl: imageUrl,
      createdAt: new Date(),
      userId: user.uid,
    });
    console.log("Blog created with ID: ", docRef.id);
    alert("Blog created succesfully");
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

function Create() {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]); // Store all users
  const [selectedRecipient, setSelectedRecipient] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        displayName: doc.data().displayName
      }));
      setUsers(userList);
      console.log(userList)
    };
    

    fetchUsers();
  }, []);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_prese");
  };

  const handlePublish = async () => {
    if (description && tags && selectedRecipient) {
      try {
        // Check if selectedRecipient is valid
        const recipientDocRef = doc(db, "users", selectedRecipient);
        const recipientSnapshot = await getDoc(recipientDocRef);
  
        if (!recipientSnapshot.exists()) {
          console.error("Recipient does not exist.");
          alert("Recipient does not exist.");
          return;
        }
  
        const recipientData = recipientSnapshot.data();
        if (!recipientData) {
          console.error("Recipient data is undefined.");
          alert("Recipient data is undefined.");
          return;
        }
  
        const recipientDisplayName = recipientData.displayName;
        console.log("Selected Recipient Display Name:", recipientDisplayName);
        
        let imageUrl = "";
        if (image) {
          const storage = getStorage();
          const storageRef = ref(storage, `images/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.error("Image upload failed:", error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              await createblog(description, tags, imageUrl, recipientDisplayName);
              Navigate("/");
            }
          );
        } else {
          await createblog(description, tags, imageUrl, recipientDisplayName);
          setTitle("");
          setDescription("");
          setTags("");
          setSelectedRecipient("");
          Navigate("/");
        }
      } catch (error) {
        console.error("Error publishing blog:", error);
        alert("An error occurred while publishing your blog.");
      }
    } else {
      alert("Please fill all required fields.");
    }
  };
  

  const maxWords = 500;
  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleChange = (e) => {
    const text = e.target.value;

    // Check if the word count is within the limit
    if (wordCount(text) <= maxWords) {
      setDescription(text);
    }
  };
  const handleSelectChange = (event, newValue) => {
    // Ensure the ID is used for fetching
    setSelectedRecipient(newValue);
  };
  

  return (
    <div>
      <Navbar />
      <Box className="createpage">
        <h4>Thought for ..</h4>
        <Select
          value={selectedRecipient}
          onChange={handleSelectChange}
          variant="soft"
          sx={{
            color: "white",
            backgroundColor: "black",
            opacity: "0.5",
            maxWidth: "220px",
            width: "150px",
          }}
          placeholder="Select a user"
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.displayName}
            </Option>
          ))}
        </Select>
        <h2>Description</h2>
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
          value={description}
          onChange={handleChange}
          fullWidth
        />
        <p style={{ colors: "#A7BEC8 !important" , fontSize: "medium"}}>
          {maxWords - wordCount(description)} words remaining
        </p>

        <h2>Tags</h2>
        <TextField
          id="standard-basic"
          label="Tags"
          variant="standard"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />

        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          className="upload-button"
          size="small"
        >
          Upload a Pic
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        <h3 className="publish-btn">
          {/*publish button*/}

          <Button variant="contained" onClick={handlePublish}>
            Publish
          </Button>
        </h3>
      </Box>
    </div>
  );
}

export default Create;

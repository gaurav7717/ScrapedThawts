// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import EastIcon from '@mui/icons-material/East';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import "../blogs/BlogItem.css";
import { Icon } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function BlogItem({blog , isMyBlog}) {
//     // console.log("In blog item", blog)
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   const Navigate = useNavigate();

//   const handleEdit=()=>
//   {
//     Navigate(`/EditBlogs/${blog.id}`)
//   }
//   const handleDelete = async () =>
//   {
//     try{
//       await deleteDoc(doc(db , "blogs", blog.id))
//       alert("Blog deleted succefully")
//     }
//     catch(e)
//     {
//       console.log(e)
//     }
//   }

//   return (
//     <Card sx={{ maxWidth: 400 }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {}
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={blog.title}
//         subheader={blog.tags}
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {blog.description.slice(0,40) + "..."}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//        {
//         isMyBlog &&
//         <>
//         <IconButton aria-label="edit" onClick={handleEdit}>
//               <EditIcon />
//             </IconButton>
//             <IconButton aria-label="delete" onClick={handleDelete}>
//               <DeleteIcon />
//             </IconButton>
//         </>

//        }
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//          <Typography paragraph>
//           {blog.description}
//          </Typography>

//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import CardActionArea from "@mui/material/CardActionArea";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { CardCover } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function BlogItem({ blog, isMyBlog }) {
  const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();

  const handleEdit = () => {
    Navigate(`/EditBlogs/${blog.id}`);
  };
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "blogs", blog.id));
      alert("Blog deleted succefully");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <React.Fragment>
      <Card
        sx={{
          maxWidth: 330,
          minWidth: 300,
          maxHeight: 300,
          border: "1px solid var(--border-color)",
          // minWidth:345,
         // Ensure the card covers the entire height
          backgroundImage: `url(${blog.imageUrl})`, // Set background image
          position: "relative",
          backgroundSize: "cover", // Cover the entire card area
          backgroundPosition: "center", // Center the background image
          // Set text color to contrast with the background
        }}
        onClick={() => setOpen(true)}
        className="item-card"
      >
        <div
          style={{
            height: "auto",
            position: "absolute",
            inset: "0px",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "var(--card-color)",
            opacity: 0.5, // Darken overlay with transparency
            backdropFilter: "blur(1px)", // Apply blur effect
            zIndex: 0, // Ensure the overlay is above the background
          }}
        ></div>
        <CardActionArea>
          <CardContent >
           <div className="name-recp">
           <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "black",
                fontWeight: "600",
                // textShadow: "1px 1px black",
                border: "1px solid black",
                width: "auto",
                display: "inline-block",
                padding: 0.75,
                lineHeight: "18px",
                textAlign: "center",
                verticalAlign: "middle",
                backgroundColor: "var(--accent-color)",
                borderRadius: "4px",
              }}
            >
              {blog.title}
            </Typography>
            <IconButton>
              <EastIcon/>
            </IconButton>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "var(--neutral-color)",
                fontWeight: "500",
                // textShadow: "1px 1px black",
                border: "1px solid black",
                width: "auto",
                display: "inline-block",
                padding: 0.75,
                // paddingBottom:1,
                fontSize: "small",
                // lineHeight: "15px",
        
                textAlign: "center",
                verticalAlign: "middle",
                backgroundColor: "#4C5760",
                borderRadius: "4px",
              }}
            >
              {blog.recipient}
            </Typography>
           </div>
            <Typography variant="body2"  className="item-desc" sx={{color: "var(--primary-text-color)"}}>
              <span>"</span>
              {blog.description.length > 250
                ? blog.description.slice(0, 230) + " ...."
                : blog.description}
              <span>"</span>
            </Typography>
            <div className="update-icons">
            {isMyBlog && (
              <>
                <IconButton aria-label="edit" onClick={handleEdit} className="icon">
                  <EditIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDelete}className="icon">
                  <DeleteIcon sx={{ color: "black" }} />
                </IconButton>
              </>
            )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
        className="sheet"
          variant="outlined"
          sx={{ maxWidth: 400, borderRadius: "md", p: 2, boxShadow: "lg" }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            id="modal-desc"
            textColor="text.tertiary"
            className="modal-description"
          >
            {blog.description}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

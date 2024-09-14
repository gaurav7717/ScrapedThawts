import React, { useEffect, useState } from 'react'
import {Outlet, Link} from "react-router-dom"
import Button from '@mui/material/Button';
import '../components/Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const [user , setUser] = useState(null);

  useEffect(()=>
  {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>
    {
      setUser(currentUser);
    });
    return () => unsubscribe();
  },[]);

  const handleLogout = async ()=>
  {
    try
    {
      await signOut(auth);
      console.log("User loogged out succesful")
      
    }
    catch(e)
    {
      console.error(e);
    }
  }
  return (
    <>
    <div className="navbar">
       <h1 className='logo'>
            <Link to="/"><span>Scraped</span>THAWTS</Link>
        </h1>
        <ul>
            {/* <li><Link to="/">Home</Link></li> */}
            <li><Link to="/Create" className="link">Create</Link></li>
            
            <li>
              {user ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                {/* <AccountCircleIcon /> */}
                <span className='display-name' style={{color: "var(--accent-color)"}}>{user.displayName}</span>
                
                <Button  aria-label='logout' onClick={handleLogout}><LogoutIcon className='btn-logout'/></Button>
              </div>
              ):(
                <Link to="/SignUp" className="link">SignUp</Link>
              )}
            </li>
          
        </ul>
        <Outlet/>
    </div>
    </>
  )
}

export default Navbar
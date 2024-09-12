import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Create from './components/blogs/Create';
import Home from './components/blogs/Home';
import SignUp from './components/blogs/SignUp';
import EditBlogs from './components/blogs/EditBlogs';
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      {/* <Create/> */}
      <BrowserRouter>
      <Routes>
        <Route>
         
          {/* <Route path="/" element={<Home></Home>}></Route> */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Create" element={<Create/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}>SignUp</Route>
          <Route path="/EditBlogs/:id" element={<EditBlogs />} />
        
          
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

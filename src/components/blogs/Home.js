import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../Navbar';
import BlogList from './BlogList';
import MyBlogs from './MyBlogs';
import '../blogs/Home.css'
import BlogsForMe from './BlogsForMe';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [searchQuery , setSearchQuery]= React.useState("")
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (e) =>
  {
    setSearchQuery(e.target.value.toLowerCase())
  }

  return (
    <div className='home-page'>
    <Navbar/>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#F1E1C6' , display: "flex" , justifyContent: "space-between"}}>
        <Tabs className="tabs" value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="#E4552">
          <Tab label="All THGTS" {...a11yProps(0)} />
          <Tab label="Thoughts for me" {...a11yProps(1)} />
          <Tab label="My THGTS" {...a11yProps(2)} />
          
        </Tabs>
        <TextField
        
        size="small"  
            label="Search by tags"
            variant="filled"
            onChange={handleSearch} // Capture search query
            
          />
      </Box>
      
      <CustomTabPanel value={value} index={0}>
        <BlogList searchQuery={searchQuery}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <MyBlogs searchQuery={searchQuery}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <BlogsForMe />
      </CustomTabPanel>
     
    </Box>
    </div>
  );
}
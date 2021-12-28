import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WorkIcon from '@mui/icons-material/Work';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HowToRegIcon from '@mui/icons-material/HowToReg';
export default function JobsNavBar() {
    let history = useHistory();

    

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    
    const onClickUserProfile = () => {
      history.push("/userprofile");
  
    }
    const onClickNewJob = () => {
      history.push("/MargeTestJob");  
    }
    const allJobs = () => {
      history.push("/jobs");  
    }
    const uploadCv = () => {
      history.push("/uploadcv");  
    }
    const homePage = () => {
      history.push("/");  
    }

    const userInfoTable = () => {
      history.push("/HrTableInfo");  
    }
    
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
            <ListItem onClick={onClickNewJob} button key={"Publish New Job"}>
              <ListItemIcon>
                <AddCircleOutlineIcon/>
              </ListItemIcon>
              <ListItemText primary={"Publish New Job"} />
            </ListItem>
            <ListItem onClick={allJobs} button key={"All Jobs"}>
              <ListItemIcon>
                <WorkIcon/>
              </ListItemIcon>
              <ListItemText primary={"All Jobs"} />
            </ListItem>
            <ListItem onClick={onClickUserProfile} button key={"My Profile"}>
              <ListItemIcon>
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary={"My Profile"} />
            </ListItem>
            <ListItem onClick={uploadCv} button key={"Upload CV"}>
              <ListItemIcon>
                <UploadFileIcon/>
              </ListItemIcon>
              <ListItemText primary={"Upload CV"} />
            </ListItem>
            <ListItem onClick={userInfoTable} button key={"User Pass Test"}>
              <ListItemIcon>
                <HowToRegIcon/>
              </ListItemIcon>
              <ListItemText primary={"User Pass Test"} />
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem onClick={homePage} button key={"Home Page"}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary={"Home Page"} />
            </ListItem>
            </List>
      </Box>
    );
  return (
    <>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <div>
        <React.Fragment key={'left'}>
        {/* <Button onClick={toggleDrawer('left', true)}>{'left'}</Button>  */}
                 <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
    </>
  );
}



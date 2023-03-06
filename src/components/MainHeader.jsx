import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {section1,section2,icons1,icons2, links1,links2,
        iconStyles,DrawerHeader} from '../const/const'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from '../features/DrawerOpen/DrawerOpenSlice'
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { hideLogo } from '../features/LogoAppear/LogoAppearSlice'

export default function MainHeader() {

  const open = useSelector((state) => state.DrawerOpen.value)

  const dispatch = useDispatch()
  const [activeLink, setactiveLink] = useState(section1[0]);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const handleNavigation = (navigationLink,activeText) =>{
      navigate(navigationLink)
      setactiveLink(activeText)
    }
  
  useEffect(() => {
    dispatch(hideLogo())
  }, );

  return (
    <>
    <Box sx={{ display: 'flex',fontFamily:"inherit" }}>
      <CssBaseline />
      <Drawer
        transitionDuration={{ enter: 200, exit: 200 }}
        sx={{
          
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            color:"#fff",
            backgroundColor:"#25292a"
          },
        }}
        variant={isSmallScreen?"": "persistent"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{fontWeight:"bold", color:"white",mt:0.7,ml:2,fontSize:25}}>Excel Model</Box>
          <IconButton sx={{color:"#fff"}} onClick={()=>{dispatch(closeDrawer())}}>
            <ChevronLeftIcon sx={{fontSize:40,mt:0.5}}/> 
          </IconButton>
        </DrawerHeader>
        <Divider />
          
        <List >
          {section1.map((text, index) => (
            <ListItem 
              key={text} 
              disablePadding 
              button
              onClick={() => {
                handleNavigation(links1[index],text)
              }}
                sx={{
                  backgroundColor: activeLink === text ? "primary.main" : "inherit",
                  my:2,
                  py:0.1,
                  borderRadius:3,
                  '&: hover':{
                      backgroundColor:"primary.main",
                      borderRadius:3,
                      '& .MuiListItemIcon-root':{
                        color:"#fff !important"
                      }
                   },
                   '&: focus':{
                    borderRadius:0
                   }
            }}
              >
              
              <ListItemButton >
                <ListItemIcon sx={{...iconStyles,color:activeLink===text?"#fff":"primary.light"}}>
                  {icons1[index]}
                </ListItemIcon>
                <ListItemText sx={{fontSize:22,fontFamily:"Montserrat"}} disableTypography primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {section2.map((text, index) => (
            <ListItem 
              key={text} 
              disablePadding
              button
              onClick={() => {
                handleNavigation(links2[index],text)
              }}
                sx={{
                  backgroundColor: activeLink === text ? "primary.main" : "inherit",
                  my:2,
                  py:0.1,
                  borderRadius:3,
                  '&: hover':{
                      backgroundColor:"primary.main",
                      borderRadius:3,
                      '& .MuiListItemIcon-root':{
                        color:"#fff !important"
                      }
                   },
                   '&: focus':{
                    borderRadius:0
                   }
                  }}
              >
              <ListItemButton>
                <ListItemIcon sx={{...iconStyles,color:activeLink===text?"#fff":"primary.light"}}>
                  {icons2[index]}
                </ListItemIcon>
                <ListItemText sx={{fontSize:22,fontFamily:"Montserrat"}} disableTypography primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>

    <Outlet />
</>
  );
}

import React from 'react'
import {  NavLink  } from 'react-router-dom';
import { openDrawer } from '../features/DrawerOpen/DrawerOpenSlice';

import {Stack, Paper, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '../const/const';
import { useSelector, useDispatch } from 'react-redux'

const Nav = () => {
    const open = useSelector((state) => state.DrawerOpen.value)
    const logo = useSelector((state) => state.LogoAppear.value)

    const dispatch = useDispatch()

  return (
    <AppBar position="fixed" open={open} >
        <Toolbar component={Paper} sx={{justifyContent:"space-between",backgroundColor:"secondary.dark"}}>
          <Stack direction="row">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{dispatch(openDrawer())}}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{fontSize:35,color:"#fff"}}/>
          </IconButton>
          <NavLink to={""}  style={{textDecoration:"none"}}><Typography variant="h3" sx={{color:"primary.dark",ml:1,mt:1,fontWeight:"bold", display:logo?'inherit':'none','&: hover':{color:"lightseagreen"}}}>Control Panel</Typography> </NavLink>
          </Stack>

        </Toolbar>
      </AppBar>
  )
}

export default Nav

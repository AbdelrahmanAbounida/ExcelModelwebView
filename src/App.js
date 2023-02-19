import './App.css';
import {MainHeader,Main} from './components/';
import React from 'react';
import {Container} from '@mui/material'
import { Route, Routes }from 'react-router-dom'
import {HomePage, ExcelModel } from './pages';
import {Nav} from './components';
import { useSelector } from 'react-redux';

function App() {

  const open = useSelector((state) => state.DrawerOpen.value)
  

  return (
    
      <div className="App">
        
        <Main open={open} >
          <Container  sx={{mt:9,ml:open? "13%" : "0"}}>
            <Nav />
          <Routes>
              <Route path="/ExcelModelwebView" element={<MainHeader />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/ExcelModelwebView" element={<HomePage />} />
                <Route path="/excel_model" element={<ExcelModel />} />
              </Route>
          </Routes>
          </Container>
        </Main>
      </div>
  );
}

export default App;

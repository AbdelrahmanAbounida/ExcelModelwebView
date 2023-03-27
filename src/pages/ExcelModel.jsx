import React from 'react'
import {Stack, Box, Typography} from '@mui/material'
import { revenuesElements, OperationalCostsElements,timeLinesElements, CapitalInvestmentElements, othersElements } from '../const/const';


// tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

// table
import CustomTable from '../components/CustomTable'

const ExcelModel = () => {

    // ###############
    // Tabs
    // ###############
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
            </div>
        );
    }

    TabPanel.propTypes = {
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





    
  return (
    <Stack direction="column" gap={5}  sx={{mx:"auto",justifyContent:"center"}}>

            {/* <Typography variant='h4' sx={{backgroundColor:"#25292a",fontSize:27,width:400,py:2,borderRadius:5,mx:"auto",color:"lightseagreen"}}>Excel Model</Typography>                */}

            <Box 
                display="flex" 
                flexDirection={"column"} 
                justifyContent="center" 
                alignItems="center" 
                sx={{ mt:7}}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider',minWidth: 1050, mx:"auto", justifyContent:"center",display:"flex" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{fontWeight:"bold",}}>
                        <Tab label="Revenues" {...a11yProps(0)} sx={{fontSize:18,fontWeight:"bold"}}/>
                        <Tab label="Operational Costs" {...a11yProps(1)} sx={{fontSize:19, fontWeight:"bold"}}/>
                        <Tab label="Capital investments" {...a11yProps(2)} sx={{fontSize:18,fontWeight:"bold"}}/>
                        <Tab label="Timelines" {...a11yProps(3)} sx={{fontSize:18,fontWeight:"bold"}}/>
                        <Tab label="Others" {...a11yProps(4)} sx={{fontSize:18,fontWeight:"bold"}}/>
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0} >
                    <CustomTable  props={revenuesElements}/>
                </TabPanel>
               
                <TabPanel value={value} index={1}>
                    <CustomTable  props={OperationalCostsElements}/>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <CustomTable  props={timeLinesElements}/>
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <CustomTable  props={CapitalInvestmentElements}/>
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <CustomTable  props={othersElements}/>
                </TabPanel>

                
            </Box>

                    
            {/* <Divider /> */}

   
          </Stack>
  )
}

export default ExcelModel
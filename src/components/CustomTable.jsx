
import React from 'react'
// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import { setCapitalInvestment, setRevenue, setOperationalCost, setTimeLine, setOthers } from '../features/ExcelModel/ExcelModelSlice'
import { useState } from 'react'

const CustomTable = (props) => {

    const dispatch = useDispatch()

    // general state
    const RevenueState = useSelector((state) => state.ExcelModel.Revenue)
    const OperationalCostState = useSelector((state) => state.ExcelModel.OperationalCost)
    const CapitalInvestmentState = useSelector((state) => state.ExcelModel.CapitalInvestment)
    const TimeLineState = useSelector((state) => state.ExcelModel.TimeLine)
    const OthersState = useSelector((state) => state.ExcelModel.Others)


    // current states
    const [currentRevenue, setCurrentRevenue] = useState({Volume:RevenueState.Volume,
                                                          AnnualVolumeGrowth:RevenueState.AnnualVolumeGrowth,
                                                          Price:RevenueState.Price,
                                                          AnnualPriceGrowth:RevenueState.AnnualPriceGrowth })

    
    const [currentCapitalInvestment, setCurrentCapitalInvestment] = useState({capex1:CapitalInvestmentState.capex1,
                                                                            capex2:CapitalInvestmentState.capex2,
                                                                            total:CapitalInvestmentState.total,
                                                                            equity:CapitalInvestmentState.equity,
                                                                            repayment:CapitalInvestmentState.repayment })
                                                                         
    
    const [currentOperationalCost, setCurrentOperationalCost] = useState({CostItemVariable:OperationalCostState.CostItemVariable,
                                                                        CostItemFixed:OperationalCostState.CostItemFixed,
                                                                        CostItemAnnual:OperationalCostState.CostItemAnnual,
                                                                        })

    const [currentTimeLine, setCurrentTimeLine] = useState({StartCapex:TimeLineState.StartCapex,
                                                            EndCapex:TimeLineState.EndCapex,
                                                            StartOperations:TimeLineState.StartOperations,
                                                            AssetLife:TimeLineState.AssetLife,
                                                            })
    const [currentOthers, setCurrentOthers] = useState({Income:OthersState.Income,
                                                        Interest:OthersState.Interest,
                                                        })

        
    const rows = {...props}.props

    // select current value for each input

    const selectValue = (type) =>{

        switch(type){
            case 'Volume': return currentRevenue.Volume;
            case 'Annual Volume Growth': return currentRevenue.AnnualVolumeGrowth;
            case 'Price':  return currentRevenue.Price;
            case 'Annual Price Growth':  return currentRevenue.AnnualPriceGrowth;

            case 'Project capex item 1':  console.log("capex1"); return currentCapitalInvestment.capex1;
            case 'Project capex item 2':  return currentCapitalInvestment.capex2;
            case 'Total project capex':  return currentCapitalInvestment.total;
            case 'Equity / (Debt + Equity)':  return currentCapitalInvestment.equity;
            case 'Debt repayment period (years)':  return currentCapitalInvestment.repayment;

            case 'Start of Capex':  return currentTimeLine.StartCapex;
            case 'End of Capex':  return currentTimeLine.EndCapex;
            case 'Start of operations':  return currentTimeLine.StartOperations;
            case 'Asset life (years)':  return currentTimeLine.AssetLife;

            case 'Cost Item 1 (variable) as a share of revenue': console.log("capex1"); return currentOperationalCost.CostItemVariable;
            case 'Cost Item 2 (fixed)':  return currentOperationalCost.CostItemFixed;
            case 'Cost Item 2 annual growth':  return currentOperationalCost.CostItemAnnual;

            case 'Income tax rate':  return currentOthers.Income;
            case 'Interest rate on debt':  return currentOthers.Interest;
            default: return 0;

        }
    }

   // change current value for each input
    const UpdateCurrentState = async (type,event)=>{
        // const t = type.replace(/\s/g, '')

        console.log(type);

        switch(type){
            case "Volume": setCurrentRevenue({...currentRevenue,Volume:Number(event.target.value)});break;
            case "Annual Volume Growth":setCurrentRevenue({...currentRevenue,AnnualVolumeGrowth:Number(event.target.value)});break;
            case "Price": setCurrentRevenue({...currentRevenue,Price:Number(event.target.value)});break;
            case "Annual Price Growth":setCurrentRevenue({...currentRevenue,AnnualPriceGrowth:Number(event.target.value)});break;

            case 'Project capex item 1':  setCurrentCapitalInvestment({...currentCapitalInvestment,capex1:Number(event.target.value)});break;
            case 'Project capex item 2':  setCurrentCapitalInvestment({...currentCapitalInvestment,capex2:Number(event.target.value)});break;
            case 'Total project capex':  setCurrentCapitalInvestment({...currentCapitalInvestment,total:Number(event.target.value)});break;
            case 'Equity / (Debt + Equity)':  setCurrentCapitalInvestment({...currentCapitalInvestment,equity:Number(event.target.value)});break;
            case 'Debt repayment period (years)':  setCurrentCapitalInvestment({...currentCapitalInvestment,repayment:Number(event.target.value)});break;

            case 'Start of Capex':  setCurrentTimeLine({...currentTimeLine,StartCapex:Number(event.target.value)});break;
            case 'End of Capex':  setCurrentTimeLine({...currentTimeLine,EndCapex:Number(event.target.value)});break;
            case 'Start of operations':  setCurrentTimeLine({...currentTimeLine,StartOperations:Number(event.target.value)});break;
            case 'Asset life (years)':  setCurrentTimeLine({...currentTimeLine,AssetLife:Number(event.target.value)});break;

            case 'Cost Item 1 (variable) as a share of revenue':  setCurrentOperationalCost({...currentOperationalCost,CostItemVariable:Number(event.target.value)});break;
            case 'Cost Item 2 (fixed)':  setCurrentOperationalCost({...currentOperationalCost,CostItemFixed:Number(event.target.value)});break;
            case 'Cost Item 2 annual growth':  setCurrentOperationalCost({...currentOperationalCost,CostItemAnnual:Number(event.target.value)});break;

            case 'Income tax rate':  setCurrentOthers({...currentOthers,Income:Number(event.target.value)});break;
            case 'Interest rate on debt':  setCurrentOthers({...currentOthers,Interest:Number(event.target.value)});break;
            default: console.log("un expected field");
        }
    }

    // update general state
    const handleSave = () =>{
        dispatch(setRevenue(currentRevenue))
        dispatch(setOperationalCost(currentOperationalCost))
        dispatch(setCapitalInvestment(currentCapitalInvestment));
        dispatch(setTimeLine(currentTimeLine));
        dispatch(setOthers(currentOthers));
    }

    
  return (

    <>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1050 }} aria-label="simple table" >
        <TableHead >
            <TableRow >
                <TableCell sx={{fontSize:17}} align="left">Property</TableCell>
                <TableCell sx={{fontSize:17,pl:34}} align="center">Value</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {rows.map((row) => (
            <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

                <TableCell component="th" scope="row">
                    {row}
                </TableCell>

                <TableCell align="right">
                    <Box>
                    <input
                        placeholder=""
                        type={"number"}
                        value={selectValue(row)}
                        onChange={(e)=>{
                            UpdateCurrentState(row,e)
                        }}
                        style={{
                            border: "none",
                            width: "320px",
                            fontSize: "17px",
                            borderRadius:13,
                        }}
                        />
                    </Box>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>

    <Box textAlign='center' sx={{mt:3}}>
        <Button 
            variant="contained"  
            sx={{borderRadius:2,color:"#fff",width:170,py:1,fontSize:17,fontWeight:"bold"}}
            onClick={()=>{handleSave()}}
            >
            Save
        </Button>
    </Box>
    </>
  )
}

export default CustomTable




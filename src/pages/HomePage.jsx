import React from 'react'
import { Stack, Button,Box,Typography,Paper } from '@mui/material'
import * as XLSX from 'xlsx'
import { useSelector } from 'react-redux'
import { revenuesElements,OperationalCostsElements,timeLinesElements, CapitalInvestmentElements, othersElements } from '../const/const'

import {MdOutlinePriceChange} from 'react-icons/md'
import {GiJusticeStar} from 'react-icons/gi'
import {BiArrowFromBottom} from 'react-icons/bi'
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from '../components/Header'



const Home = () => {


  // general state
  const RevenueState = useSelector((state) => state.ExcelModel.Revenue)
  const OperationalCostState = useSelector((state) => state.ExcelModel.OperationalCost)
  const CapitalInvestmentState = useSelector((state) => state.ExcelModel.CapitalInvestment)
  const TimeLineState = useSelector((state) => state.ExcelModel.TimeLine)
  const OthersState = useSelector((state) => state.ExcelModel.Others)


  const getSpecificData = (type) =>{
    console.log(type)
      switch(type){
          case 'Volume': console.log("volume");return RevenueState.Volume;
          case 'Annual Volume Growth': return RevenueState.AnnualVolumeGrowth +"%";
          case 'Price':  return RevenueState.Price;
          case 'Annual Price Growth':  return RevenueState.AnnualPriceGrowth +"%";

          case 'Project capex item 1':  console.log("capex1"); return CapitalInvestmentState.capex1;
          case 'Project capex item 2':  return CapitalInvestmentState.capex2;
          case 'Total project capex':  return CapitalInvestmentState.total;
          case 'Equity / (Debt + Equity)':  return CapitalInvestmentState.equity +"%";
          case 'Debt repayment period (years)':  return CapitalInvestmentState.repayment;

          case 'Start of Capex':  return TimeLineState.StartCapex;
          case 'End of Capex':  return TimeLineState.EndCapex;
          case 'Start of operations':  return TimeLineState.StartOperations;
          case 'Asset life (years)':  return TimeLineState.AssetLife;

          case 'Cost Item 1 (variable) as a share of revenue': console.log("capex1"); return OperationalCostState.CostItemVariable +"%";
          case 'Cost Item 2 (fixed)':  return OperationalCostState.CostItemFixed;
          case 'Cost Item 2 annual growth':  return OperationalCostState.CostItemAnnual +"%";

          case 'Income tax rate':  return OthersState.Income +"%";
          case 'Interest rate on debt':  return OthersState.Interest +"%";
          default: return 0;

      }
  }

  const createDataset = () =>{
    let out = [];

    // revenuesElements
    for (let i = 0; i < revenuesElements.length; i++) {
      out.push({ Revenues: revenuesElements[i], '': getSpecificData(revenuesElements[i]) },)
    }

    // OperationalCostsElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Operational Costs","":""})
    for (let i = 0; i < OperationalCostsElements.length; i++) {
      out.push({ "Revenues": OperationalCostsElements[i], '': getSpecificData(OperationalCostsElements[i]) },)
    }

    // CapitalInvestmentElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Capital investments","":""})
    for (let i = 0; i < CapitalInvestmentElements.length; i++) {
      out.push({ Revenues: CapitalInvestmentElements[i], '': getSpecificData(CapitalInvestmentElements[i]) },)
    }

    // timeLinesElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Timelines","":""})
    for (let i = 0; i < timeLinesElements.length; i++) {
      out.push({ "Revenues": timeLinesElements[i], '': getSpecificData(timeLinesElements[i]) },)
    }

    // othersElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Others","":""})
    for (let i = 0; i < othersElements.length; i++) {
      out.push({ Revenues: othersElements[i], '': getSpecificData(othersElements[i]) },)
    }
    out.push({"Revenues":"","":""})

    return out;

  }

  const download = () =>{

    
    var out = createDataset();

    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(out)

    XLSX.utils.book_append_sheet(wb,ws, "Sheet1");

    XLSX.writeFile(wb, "Output.xlsx");
  }

  const createHomeCardsInfo = () =>{
    return [
          {
            title:'Annual Price Growth',
            value: RevenueState.AnnualPriceGrowth,
            icon: <MdOutlinePriceChange style={{ color: "#0bb09a", fontSize: 72, paddingRight:3 }}/>
          },
          {
            title:'Equity',
            value: CapitalInvestmentState.equity,
            icon: <GiJusticeStar style={{ color: "#0bb09a", fontSize: 72, paddingRight:3 }}/>
          },
          {
            title:'Income Tax Rate',
            value: OthersState.Income,
            icon: <BiArrowFromBottom style={{ color: "#0bb09a", fontSize: 72, paddingRight:3 }}/>
          },
          {
            title:'Interest rate on debt',
            value: OthersState.Interest,
            icon: <FaRegMoneyBillAlt style={{ color: "#0bb09a", fontSize: 72, paddingRight:9 }}/>
          }
        ]
    
  }


  return (
    <Stack sx={{width:"100 vh"}}>

    <Header title="Dashboard" subtitle="Welcome To Your Dashboard"></Header>

    <Box
      display="flex"
      gap={1}
      sx={{justifyContent:"space-between",flexWrap:"nowrap",alignItems:"center", width:"100%"}}
    >
      {createHomeCardsInfo().map((item)=>
        
        <Paper
            sx={{width:"35%",height:150,alignItems:"start",justifyContent:"space-between",display: "flex",pt:2,backgroundColor:"#fff"}}
            >
              <Box sx={{display:"flex", flexDirection:"column",pl:1,fontSize:25,mt:1}}>

                <Box sx={{display:"flex",gap:1,justifyContent:"flex-start",pt:1}}>
                  <Typography sx={{fontWeight:"bold",fontSize:25,pl:3}}>{item.value}%</Typography>
                </Box>

                <Box sx={{display:"flex",gap:1,justifyContent:"flex-start",pt:2,pl:1}}>
                    <Typography sx={{fontWeight:"bold"}}>{item.title}</Typography>
                </Box>
              </Box>

              <Box>
                {item.icon}
              </Box>
        </Paper>

    )}
      
    </Box>

    <Box sx={{mt:4}}>
        <Button
          sx={{
            backgroundColor: "primary.dark",
            "&:hover":{backgroundColor:"primary.main"},
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={()=>{download()}}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Report
        </Button>
      </Box>

  </Stack>
  )
}

export default Home

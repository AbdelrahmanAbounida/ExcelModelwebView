import React from 'react'
import { Stack, Button } from '@mui/material'
import * as XLSX from 'xlsx'
import { useSelector } from 'react-redux'
import { revenuesElements,OperationalCostsElements,timeLinesElements, CapitalInvestmentElements, othersElements } from '../const/const'
const Home = () => {


  // general state
  const RevenueState = useSelector((state) => state.ExcelModel.Revenue)
  const OperationalCostState = useSelector((state) => state.ExcelModel.OperationalCost)
  const CapitalInvestmentState = useSelector((state) => state.ExcelModel.CapitalInvestment)
  const TimeLineState = useSelector((state) => state.ExcelModel.TimeLine)
  const OthersState = useSelector((state) => state.ExcelModel.Others)


  const getSpecificData = (type) =>{

      switch(type){
          case 'Volume': return RevenueState.Volume;
          case 'Annual Volume Growth': return RevenueState.AnnualVolumeGrowth;
          case 'Price':  return RevenueState.Price;
          case 'Annual Price Growth':  return RevenueState.AnnualPriceGrowth;

          case 'Project capex item 1':  console.log("capex1"); return CapitalInvestmentState.capex1;
          case 'Project capex item 2':  return CapitalInvestmentState.capex2;
          case 'Total project capex':  return CapitalInvestmentState.total;
          case 'Equity / (Debt + Equity)':  return CapitalInvestmentState.equity;
          case 'Debt repayment period (years)':  return CapitalInvestmentState.repayment;

          case 'Start of Capex':  return TimeLineState.StartCapex;
          case 'End of Capex':  return TimeLineState.EndCapex;
          case 'Start of operations':  return TimeLineState.StartOperations;
          case 'Asset life (years)':  return TimeLineState.AssetLife;

          case 'Cost Item 1 (variable) as a share of revenue': console.log("capex1"); return OperationalCostState.CostItemVariable;
          case 'Cost Item 2 (fixed)':  return OperationalCostState.CostItemFixed;
          case 'Cost Item 2 annual growth':  return OperationalCostState.CostItemAnnual;

          case 'Income tax rate':  return OthersState.Income;
          case 'Interest rate on debt':  return OthersState.Interest;
          default: return 0;

      }
  }

  const createDataset = () =>{
    let out = [];

    // revenuesElements
    for (let i = 0; i < revenuesElements.length; i++) {
      out.push({ Revenues: revenuesElements[i], '': getSpecificData(i) },)
    }

    // OperationalCostsElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Operational Costs","":""})
    for (let i = 0; i < OperationalCostsElements.length; i++) {
      out.push({ "Revenues": OperationalCostsElements[i], '': getSpecificData(i) },)
    }

    
    // timeLinesElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Timelines","":""})
    for (let i = 0; i < timeLinesElements.length; i++) {
      out.push({ "Revenues": timeLinesElements[i], '': getSpecificData(i) },)
    }

    // CapitalInvestmentElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Capital investments","":""})
    for (let i = 0; i < CapitalInvestmentElements.length; i++) {
      out.push({ Revenues: CapitalInvestmentElements[i], '': getSpecificData(i) },)
    }

    // othersElements
    out.push({"Revenues":"","":""})
    out.push({"Revenues":"Others","":""})
    for (let i = 0; i < othersElements.length; i++) {
      out.push({ Revenues: othersElements[i], '': getSpecificData(i) },)
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

  return (
    <Stack sx={{display:"flex", alignItems:"center",justifyContent:"center"}}>

      <Stack direction="row" gap={13} sx={{mt:30,mx:"auto"}}>
        <Button 
            variant="contained"  
            sx={{borderRadius:3,color:"#fff",width:410,py:2,fontSize:30,fontWeight:"bold",backgroundColor:"primary.dark","&:hover":{backgroundColor:"primary.main"}}}
            onClick={()=>{download()}}
            >
            Download
        </Button>

      </Stack>

    </Stack>
  )
}

export default Home

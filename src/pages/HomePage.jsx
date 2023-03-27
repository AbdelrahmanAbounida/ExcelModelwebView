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
      switch(type){
          case 'Volume': return RevenueState.Volume;
          case 'Annual Volume Growth': return RevenueState.AnnualVolumeGrowth;
          case 'Price':  return RevenueState.Price;
          case 'Annual Price Growth':  return RevenueState.AnnualPriceGrowth;

          case 'Project capex item 1':  return CapitalInvestmentState.capex1;
          case 'Project capex item 2':  return CapitalInvestmentState.capex2;
          case 'Total project capex':  return CapitalInvestmentState.total;
          case 'Equity / (Debt + Equity)':  return CapitalInvestmentState.equity;
          case 'Debt repayment period (years)':  return CapitalInvestmentState.repayment;

          case 'Start of Capex':  return TimeLineState.StartCapex;
          case 'End of Capex':  return TimeLineState.EndCapex;
          case 'Start of operations':  return TimeLineState.StartOperations;
          case 'Asset life (years)':  return TimeLineState.AssetLife;

          case 'Cost Item 1 (variable) as a share of revenue':  return OperationalCostState.CostItemVariable;
          case 'Cost Item 2 (fixed)':  return OperationalCostState.CostItemFixed;
          case 'Cost Item 2 annual growth':  return OperationalCostState.CostItemAnnual;

          case 'Income tax rate':  return OthersState.Income;
          case 'Interest rate on debt':  return OthersState.Interest;
          default: return 0;

      }
  }

// #############################################################################################
// ########################################Excel Model#######################################
// #############################################################################################
// Helper Variables
const startYear = 2027;
const endYear = 2051;
const num_of_years = endYear - startYear;


// #############################################################################################
// Revenue Modeling
var volumeList = calculateProperty(
  getSpecificData("Volume"),
  getSpecificData("Annual Volume Growth"),
  num_of_years
);
var priceList = calculateProperty(
  getSpecificData("Price"),
  getSpecificData("Annual Price Growth"),
  num_of_years
);
var Revenues = volumeList.map(function (num, idx) {
  return num * priceList[idx];
});


// #############################################################################################
// Cost Modeling
// #############################################################################################

var cost_item1_share_of_revenue = Array(num_of_years).fill(
  Number(getSpecificData("Cost Item 1 (variable) as a share of revenue"))
  );
  var cost_item2_annual_growth_list = Array(num_of_years).fill(
    getSpecificData("Cost Item 2 annual growth")
  );

  var cost_item1_list = cost_item1_share_of_revenue.map(function (
    num,
    idx
  ) {
    return (-1 * num * Revenues[idx]) / 100;
  });
  var cost_item2_fixed_list = calculateProperty(
    getSpecificData("Cost Item 2 (fixed)"),
    getSpecificData("Cost Item 2 annual growth"),
    num_of_years
  ).map(function (x) {
    return x * -1;
  });
  var TotalCosts = cost_item1_list.map(function (num, idx) {
    return num + cost_item2_fixed_list[idx];
  });
  
  // Income Statement
  // #############################################################################################
  
  var EBITDA = Revenues.map((num, idx) => {
    return num + TotalCosts[idx];
  });
 
  
  
  var Depreciation = Array(num_of_years).fill(
    (-1 * getSpecificData("Total project capex")) / getSpecificData("Asset life (years)")
  );
  var EBIT = EBITDA.map(function (num, idx) {
    return num + Depreciation[idx];
  });
  
  var totalDebt = getSpecificData("Total project capex") * (1 - getSpecificData("Equity / (Debt + Equity)") / 100);
  var InterestExpense = Array(num_of_years).fill(
    (-1 * getSpecificData("Interest rate on debt") * totalDebt) / 100
  );
  var profitBeforeTax = EBIT.map(
    (num, idx) => num + InterestExpense[idx]
  );
  var TaxRate = Array(num_of_years).fill(getSpecificData("Income tax rate"));
  var IncomeTax = TaxRate.map(
    (num, idx) => (-1 * num * profitBeforeTax[idx]) / 100
  );
  var ProfitAfterTax = profitBeforeTax.map(
    (num, idx) => num + IncomeTax[idx]
  );
  
  // Cash Flow Statement
  // #############################################################################################
  
  // output1 ( Project IIR)
  var InterestPaid = InterestExpense;
  var taxesPaid = IncomeTax;
  var OperatingCashFlow = EBITDA.map((num, idx) =>
    Number(num + InterestPaid[idx])
  ).map((n, idx) => n + taxesPaid[idx]);


  var final_capex = getSpecificData("Total project capex") / (getSpecificData("End of Capex") - getSpecificData("Start of Capex")+ 1);


  var FreeCashFlowToFirm = Array(getSpecificData("End of Capex") - getSpecificData("Start of Capex")+ 1)
    .fill(-1 * final_capex)
    .concat(OperatingCashFlow);
  
  // output2 ( Equity IIR)
  var TotalDebt = -1 * getSpecificData("Total project capex") * (1 - getSpecificData("Equity / (Debt + Equity)") / 100);
  var DebtRepaymentPeriod = getSpecificData("Debt repayment period (years)");
  var annual_debt_repayment = Array(num_of_years).fill(
    TotalDebt / getSpecificData("Debt repayment period (years)")
  );
  var equity_list = Array(getSpecificData("End of Capex") - getSpecificData("Start of Capex")+ 1)
    .fill(-1 * final_capex)
    .map((num, idx) => (num * getSpecificData("Equity / (Debt + Equity)")) / 100);

  var FreeCashFlowsForEquityIRR = equity_list.concat(
    OperatingCashFlow.map(
      (num, idx) => num + annual_debt_repayment[idx]
    )
  );
  

  // ############################################################
  // Helper Functions
  // ############################################################
  
  // calculateVolume, Price  Functions
  function calculateProperty(
    initial_value,
    annual_growth,
    array_length
  ) {
    var out_vol = Array(array_length).fill(initial_value);
    for (var i = 1; i < array_length; i++) {
      out_vol[i] = out_vol[i - 1] * (1 + annual_growth / 100);
    }
    return out_vol;
  }
  
  // Range Functions
  function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }
  
// IRR Functions
function IRR(values, guess) {
  var irrResult = function (values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
    }
    return result;
  };

  var irrResultDeriv = function (values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = (dates[i] - dates[0]) / 365;
      result -= (frac * values[i]) / Math.pow(r, frac + 1);
    }
    return result;
  };
  var dates = [];
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }

  if (!positive || !negative) return '#NUM!';

  var guess = typeof guess === 'undefined' ? 0.1 : guess;
  var resultRate = guess;

  var epsMax = 1e-10;
  var iterMax = 50;

  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate =
      resultRate -
      resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
  } while (contLoop && ++iteration < iterMax);

  if (contLoop) return '#NUM!';

  return resultRate;
}

  

 // ############################################################
  // Create Dataset
  // ############################################################
  const createInputSheet = () =>{
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

  const createModelSheet = () =>{

  }


  // ############################################################
  // Download
  // ############################################################
  const download = () =>{

    var out = createInputSheet();
    var wb = XLSX.utils.book_new()
    var ws1 = XLSX.utils.json_to_sheet(out)

    XLSX.utils.book_append_sheet(wb,ws1, "Sheet1");
    XLSX.writeFile(wb, "Output.xlsx");
  }
// #############################################################################################
// ########################################Output#######################################
// #############################################################################################
var Project_IRR = Math.round(IRR(FreeCashFlowToFirm) * 100);
var Equity_IRR = (IRR(FreeCashFlowsForEquityIRR)* 100).toFixed(2);

console.log(`Project IRR = ${Project_IRR}%`);
console.log(`Equity IRR = ${Equity_IRR}%`);


  const createHomeCardsInfo = () =>{
    return [
          {
            title:'Project IRR',
            value: Project_IRR,//RevenueState.AnnualPriceGrowth,
            icon: <MdOutlinePriceChange style={{ color: "#0bb09a", fontSize: 72, paddingRight:3 }}/>
          },
          {
            title:'Equity IRR',
            value: Equity_IRR,//CapitalInvestmentState.equity,
            icon: <GiJusticeStar style={{ color: "#0bb09a", fontSize: 72, paddingRight:3 }}/>
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
            key={item.title}
            sx={{width:"45%",height:150,alignItems:"start",justifyContent:"space-between",display: "flex",pt:2,backgroundColor:"#fff"}}
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

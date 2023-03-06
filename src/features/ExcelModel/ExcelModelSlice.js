import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Revenue:{
    Volume: 100,
    AnnualVolumeGrowth: 1,
    Price: 100,
    AnnualPriceGrowth: 1,
  },
  CapitalInvestment:{
    capex1: 20000,
    capex2: 20000,
    total: 40000,
    equity: 20,
    repayment: 20,
  },
  OperationalCost:{
    CostItemVariable: 20,
    CostItemFixed: 2000,
    CostItemAnnual: 1,
  },
  TimeLine:{
    StartCapex: 2024,
    EndCapex: 2026,
    StartOperations: 2027,
    AssetLife: 25,
  },
  Others:{
    Income: 30,
    Interest: 5,
  }
}

export const ExcelModelSlice = createSlice({
  name: 'excelModel',
  initialState,
  reducers: {
    setCapitalInvestment: (state,action) => {
      state.CapitalInvestment = action.payload
    },
    setRevenue: (state,action) => {
        state.Revenue = action.payload
    },
    setOperationalCost: (state,action) => {
        state.OperationalCost = action.payload
    },
    setTimeLine: (state,action) => {
        state.TimeLine = action.payload
    },
    setOthers: (state,action) => {
        state.Others = action.payload
    },
  },
})

export const { setCapitalInvestment, setRevenue, setOperationalCost, setTimeLine, setOthers} = ExcelModelSlice.actions
export default ExcelModelSlice.reducer







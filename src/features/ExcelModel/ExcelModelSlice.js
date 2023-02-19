import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Revenue:{
    Volume: 0,
    AnnualVolumeGrowth: 0,
    Price: 0,
    AnnualPriceGrowth: 0,
  },
  CapitalInvestment:{
    capex1: 0,
    capex2: 0,
    total: 0,
    equity: 0,
    repayment: 0,
  },
  OperationalCost:{
    CostItemVariable: 0,
    CostItemFixed: 0,
    CostItemAnnual: 0,
  },
  TimeLine:{
    StartCapex: 0,
    EndCapex: 0,
    StartOperations: 0,
    AssetLife: 0,
  },
  Others:{
    Income: 0,
    Interest: 0,
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







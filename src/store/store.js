import { configureStore } from '@reduxjs/toolkit'
import DrawerOpenReducer from '../features/DrawerOpen/DrawerOpenSlice'
import LogoAppearReducer from '../features/LogoAppear/LogoAppearSlice'
import  ExcelModelSlice  from '../features/ExcelModel/ExcelModelSlice'

export const store = configureStore({

  reducer: {
    DrawerOpen:DrawerOpenReducer,
    LogoAppear:LogoAppearReducer,
    ExcelModel:ExcelModelSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

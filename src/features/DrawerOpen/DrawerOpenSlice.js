import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const DrawerOpenSlice = createSlice({
  name: 'drawer_open',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.value = true
    },
    closeDrawer: (state) => {
      state.value = false
    }
  },
})

export const { openDrawer, closeDrawer } = DrawerOpenSlice.actions

export default DrawerOpenSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const LogoAppearSlice = createSlice({
  name: 'logo_appear',
  initialState,
  reducers: {
    showLogo: (state) => {
      state.value = true
    },
    hideLogo: (state) => {
      state.value = false
    }
  },
})

export const { showLogo, hideLogo } = LogoAppearSlice.actions

export default LogoAppearSlice.reducer
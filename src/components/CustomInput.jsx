import React from 'react'
import {Paper} from '@mui/material'
import { useState } from 'react'

const CustomInput = () => {
  
    const[currentValue,setcurrentValue] = useState(0)

    const handleSubmit = ()=>{
        console.log("submit")
    }
  return (
    <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            my: 0.5,
            boxShadow: "none",
            
          }}
        >
            <input
              placeholder=""
              type={"number"}
              value={currentValue}
              onChange={(e)=>{
                setcurrentValue(e.target.value)
              }}
              style={{
                border: "none",
                width: "320px",
                fontSize: "17px",
                borderRadius:13,
              }}
            />
    </Paper>
  )
}

export default CustomInput
import MDTypography from '~/components/MDTypography'
import { Button, Input } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

export default function HiddenPassword({ password }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
      <Input type={isPasswordVisible ? 'text' : 'password'} value={password} sx={{ width: '100px'}} disabled />
      <Button onClick={() => setIsPasswordVisible((prev) => !prev)} sx={{ p: 0 }}>
        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
      </Button>
    </MDTypography>
  )
}

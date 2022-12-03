import React from 'react'
import { Chip, Tooltip } from '@mui/material'

interface RatedTagProps {
  rated: string
  size?: 'medium' | 'small'
  styles?: any
  placement?: any
}

export default function RatedTag(props: RatedTagProps) {
  return (
    <Tooltip title={
      props.rated == 'P' ? 'Thích hợp mọi độ tuổi' :
        props.rated == 'C13' ? 'Cấm người dưới 13 tuổi' :
          props.rated == 'C16' ? 'Cấm người dưới 16 tuổi' :
            props.rated == 'C18' ? 'Cấm người dưới 18 tuổi' : ''
    }
      placement={props.placement}
      disableInteractive
      arrow
    >
      <Chip
        label={props.rated}
        style={props.styles}
        color={props.rated == 'P' ? 'success' : 'primary'}
        size={props.size}
      />
    </Tooltip>
  )
}

import React from 'react'
import { Chip, Tooltip } from '@mui/material'

enum RatedType {
  P = 'P',
  C13 = 'C13',
  C16 = 'C16',
  C18 = 'C18'
}
interface RatedTagProps {
  rated: string
  size?: 'medium' | 'small'
  styles?: any
  placement?: any
}

export default function RatedTag(props: RatedTagProps) {
  return (
    <Tooltip title={
      props.rated == RatedType.P ? 'Thích hợp mọi độ tuổi' :
        props.rated == RatedType.C13 ? 'Cấm người dưới 13 tuổi' :
          props.rated == RatedType.C16 ? 'Cấm người dưới 16 tuổi' :
            props.rated == RatedType.C18 ? 'Cấm người dưới 18 tuổi' : ''
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

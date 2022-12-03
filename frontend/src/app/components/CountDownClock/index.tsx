import React from 'react'
import { Restore } from '@mui/icons-material';
import Countdown from 'react-countdown'

const renderer = ({ minutes, seconds }: any) => {
  return <span style={{ display: 'flex', alignItems: 'center', fontSize: '1em' }}>
    <Restore fontSize='inherit' /> {(minutes < 10 ? '0' : '') + minutes}:{(seconds < 10 ? '0' : '') + seconds}
  </span>;
};

interface CountDownClockProps {
  onComplete: () => void
  timeStart: number
}

export default function CountDownClock(props: CountDownClockProps) {
  return (
    <Countdown
      date={props.timeStart + 5 * 60 * 1000}
      renderer={renderer}
      onComplete={props.onComplete}
    />
  )
}

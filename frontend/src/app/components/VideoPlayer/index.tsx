import React from 'react'
import { Dialog } from '@mui/material';
import YouTube from 'react-youtube';
import useStyles from './styles';

interface VideoPlayerProps {
  trailer: string | undefined
  show: boolean
  onClose: () => void
  autoPlay?: boolean
}


export default function VideoPlayer(props: VideoPlayerProps) {

  const videoId = props.trailer?.replace('https://www.youtube.com/watch?v=', '')

  const opts = {
    height: 584,
    width: 960,
    playerVars: {
      autoplay: 1,
    },
  }

  const classes = useStyles()

  return (
    <Dialog open={props.show} onClose={props.onClose} className={classes.dialog}>
      <YouTube className={classes.player} videoId={videoId} allow-presentation opts={opts} />
    </Dialog>
  )
}

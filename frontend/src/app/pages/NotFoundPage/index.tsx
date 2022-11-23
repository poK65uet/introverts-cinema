import { Box } from '@mui/material'
import useStyles from './styles';
import icon from './assets/ic-404.png'

export default function NotFoundPage() {

	const classes = useStyles()
	return (
		<Box className={classes.notFoundPage}>
			<img src={icon} className={classes.icon} />
		</Box>
	)
}

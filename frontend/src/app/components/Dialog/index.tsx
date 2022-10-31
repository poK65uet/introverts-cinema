import React from 'react';
import {
	Button,
	Dialog as MuiDialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Typography
} from '@mui/material';
import {
	InfoOutlined as InfoIcon,
	CheckCircleOutlineOutlined as SuccessIcon,
	WarningAmber as WarningIcon,
	ReportGmailerrorredOutlined as ErrorIcon,
} from '@mui/icons-material';
import useStyles from './styles';

interface DialogProps {
	open: boolean
	handleClose?: (event: React.MouseEvent) => void
	handleAccept?: (event: React.MouseEvent) => void
	handleCancel?: (event: React.MouseEvent) => void
	type: 'inform' | 'success' | 'warning' | 'error'
	title: string
	content?: string
}

export default function Dialog(props: DialogProps) {

	const classes = useStyles();
	return (
		<MuiDialog
			open={props.open} onClose={props.handleClose}
			classes={{ paper: classes.dialog }} >
			<DialogTitle className={classes.title} padding='10px !important'>
				{
					props.type == 'inform'
						? <InfoIcon sx={{ mr: '10px' }} color='info' fontSize='large' />
						: props.type == 'success'
							? <SuccessIcon sx={{ mr: '10px' }} color='success' fontSize='large' />
							: props.type == 'warning'
								? <WarningIcon sx={{ mr: '10px' }} color='warning' fontSize='large' />
								: props.type == 'error'
									? <ErrorIcon sx={{ mr: '10px' }} color='error' fontSize='large' /> : null
				}
				<Typography variant='h6' fontWeight={900} margin='auto' paddingRight='35px'>
					{props.title}
				</Typography>
			</DialogTitle>
			<Divider variant='middle' />
			<DialogContent>
				{props.content}
			</DialogContent>
			<DialogActions className={classes.action}>
				<Button
					disableRipple
					className={classes.button}
					onClick={props.handleClose}>
					Đồng ý
				</Button>
				<Button
					disableRipple
					className={classes.button}
					onClick={props.handleClose}>
					Hủy
				</Button>
			</DialogActions>
		</MuiDialog >
	);

}
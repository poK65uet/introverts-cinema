import * as React from 'react';
import { styled } from '@mui/material/styles';
import { CalendarMonth, Done, LocalActivity, MovieFilter, Payment } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

export const CustomizedConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient(90deg, rgba(255,190,75,0.8797268907563025) 25%, rgba(255,136,75,1) 50%, rgba(255,102,0,1) 75%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient(90deg, rgba(255,190,75,0.8797268907563025) 25%, rgba(255,136,75,1) 50%, rgba(255,102,0,1) 75%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderRadius: 1,
	},
}));

const CustomizedStepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	transition: '0.25s',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient(90deg, rgba(255,47,0,1) 15%, rgba(255,102,0,1) 30%, rgba(255,136,75,1) 40%, rgba(255,190,75,0.8797268907563025) 80%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		scale: '1.2',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient(90deg, rgba(255,47,0,1) 15%, rgba(255,102,0,1) 30%, rgba(255,136,75,1) 40%, rgba(255,190,75,0.8797268907563025) 80%)',
	}),
}));

export function CustomizedStepIcon(props: StepIconProps) {
	const { active, completed, className } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <MovieFilter />,
		2: <CalendarMonth />,
		3: <LocalActivity />,
		4: <Payment />
	};

	return (
		<CustomizedStepIconRoot ownerState={{ completed, active }} className={className}>
			{completed ? <Done fontSize='large' />
				: icons[String(props.icon)]}
		</CustomizedStepIconRoot>
	);
}
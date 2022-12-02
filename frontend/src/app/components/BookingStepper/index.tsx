import React, { useState } from 'react';
import {
  Container,
  Step,
  StepIconProps,
  StepLabel,
  Stepper
} from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CalendarMonth, LocalActivity, MovieFilter, Payment } from '@mui/icons-material';
import { CustomizedStepIcon, CustomizedConnector } from './custom';

interface BookingStepperProps { }

export default function BookingStepper(props: BookingStepperProps) {

  const store = useSelector<RootState, RootState>(state => state)

  const steps = ['CHỌN PHIM', 'CHỌN SUẤT CHIẾU', 'CHỌN GHẾ', 'THANH TOÁN'];

  const classes = useStyles()

  const CustomizedStepIcons = (props: StepIconProps) => {
    const classes = useStyles()
    const { active, completed, className } = props;

    const stepIcons: { [index: string]: React.ReactElement } = {
      1: <MovieFilter />,
      2: <CalendarMonth />,
      3: <LocalActivity />,
      4: <Payment />
    };
    return (
      <div className={className}>
        {stepIcons[String(props.icon)]}
      </div>
    );
  }
  return (
    <Container sx={{ my: 5 }}>
      <Stepper activeStep={store.bookTicket.activeStep} connector={<CustomizedConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={store.bookTicket.completedSteps[index]}>
            <StepLabel StepIconComponent={CustomizedStepIcon}
              className={classes.stepLabel}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
}

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
import { CustomizedStepIcon, CustomizedConnector } from './custom';

interface BookingStepperProps { }

export default function BookingStepper(props: BookingStepperProps) {

  const store = useSelector<RootState, RootState>(state => state)

  const steps = ['CHỌN PHIM', 'CHỌN SUẤT CHIẾU', 'CHỌN GHẾ', 'THANH TOÁN'];

  const classes = useStyles()

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

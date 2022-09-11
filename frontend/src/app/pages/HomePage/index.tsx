import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useStyles from './styles';
import { useGetMessage } from 'queries/message';

export function HomePage() {
  const classes = useStyles();
  const { data: message } = useGetMessage();
  return (
    <div className={classes.homePage}>
      <h2>Homepage: </h2>
      <span>{message}</span>
    </div>
  );
}

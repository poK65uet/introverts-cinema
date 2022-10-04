import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './styles';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import Banner from 'app/components/Banner';
import NewMovieList from 'app/components/NewMovieList';
import UpcomingMovieList from 'app/components/UpcomingMovieList';

export function HomePage() {

  const classes = useStyles();

  React.useEffect(() => {
    document.body.style.margin = '0';
  }, []);

  return (
    <div className={classes.homePage} >
      <Banner />
      <NewMovieList />
      <UpcomingMovieList />
    </div>
  );
}

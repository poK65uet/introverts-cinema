import React, { useEffect } from "react";
import { Header } from "app/containers/Header";
import { HomePage } from "app/pages/HomePage";
import NewMoviePage from "app/pages/NewMoviePage";
import UpcomingMoviePage from "app/pages/UpcomingMoviePage";
import MovieDetailPage from '../pages/MovieDetailPage/index';
import NotFoundPage from '../pages/NotFoundPage/index';
import { Route, Switch } from 'react-router-dom';
import Footer from "app/containers/Footer";
import MasterDialog, { notify } from "app/components/MasterDialog";
import { useSelector } from 'react-redux';
import { RootState } from 'store';


const HomeLayout = () => {

	const store = useSelector<RootState, RootState>(state => state)

	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/new-movies' component={NewMoviePage} />
				<Route path='/upcoming-movies' component={UpcomingMoviePage} />
				<Route path='/movie-detail/:movieId' component={MovieDetailPage} />
				<Route path='/*' component={NotFoundPage} />
			</Switch>
			<MasterDialog />
			<Footer />
		</React.Fragment >
	);
};

export default HomeLayout;
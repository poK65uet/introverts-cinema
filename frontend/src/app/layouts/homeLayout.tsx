import React, { useEffect } from "react";
import { Header } from "app/containers/Header";
import { HomePage } from "app/pages/HomePage";
import NewMoviePage from "app/pages/NewMoviePage";
import UpcomingMoviePage from "app/pages/UpcomingMoviePage";
import MovieDetailPage from 'app/pages/MovieDetailPage/index';
import NotFoundPage from 'app/pages/NotFoundPage/index';
import BookTicketPage from 'app/pages/BookTicketPage/index';
import UserPage from 'app/pages/UserPage/index';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from "app/containers/Footer";
import MasterDialog, { notify } from "app/components/MasterDialog";
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import paths from "paths";


const HomeLayout = () => {

	const store = useSelector<RootState, RootState>(state => state)

	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path={`${paths.NewMoviePage}`} component={NewMoviePage} />
				<Route path={`${paths.UpcomingMoviePage}`} component={UpcomingMoviePage} />
				<Route path={`${paths.MovieDetailPage}/:movieId`} component={MovieDetailPage} />
				<Route path={`${paths.BookTicketPage}`} component={BookTicketPage} />
				{!store.login.isLoggedin ? <Redirect from={`${paths.UserPage}`} exact to='/' /> : null}
				<Route path={`${paths.UserPage}`} component={UserPage} />
				<Route path='/*' component={NotFoundPage} />
			</Switch>
			<MasterDialog />
			<Footer />
		</React.Fragment >
	);
};

export default HomeLayout;	
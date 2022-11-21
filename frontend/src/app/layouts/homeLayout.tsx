import React, { useEffect } from "react";
import { Header } from "app/containers/Header";
import AdminPage from "app/pages/AdminPage";
import { HomePage } from "app/pages/HomePage";
import NewMoviePage from "app/pages/NewMoviePage";
import { Route, Switch } from 'react-router-dom';
import Footer from "app/containers/Footer";

const HomeLayout = () => {
	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/new-movies' component={NewMoviePage} />
			</Switch>
			<Footer />
		</React.Fragment>
	);
};

export default HomeLayout;
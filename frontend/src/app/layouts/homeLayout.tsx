import React, { useEffect } from "react";
import { Header } from "app/containers/Header";
import { HomePage } from "app/pages/HomePage";
import NewMoviePage from "app/pages/NewMoviePage";
import { Route, Switch } from 'react-router-dom';
import Footer from "app/containers/Footer";
import MasterDialog, { notify } from "app/components/MasterDialog";
import { useSelector } from 'react-redux';
import { RootState } from 'store';


const HomeLayout = () => {

	const store = useSelector<RootState, RootState>(state => state)

	//useEffect(() => {
	//	if (store.register.isRegisterSuccessAccount != undefined) {
	//		notify(
	//			{
	//				type: 'success',
	//				content: 'Đăng ký thành công',
	//			})
	//	}
	//}, [store.register.isRegisterSuccessAccount])

	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/new-movies' component={NewMoviePage} />
			</Switch>
			<MasterDialog />
			<Footer />
		</React.Fragment>
	);
};

export default HomeLayout;
import React, { useEffect, useState } from 'react'
import { Container, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from 'app/components/UserProfile/index';
import { getUserProfileThunk } from 'app/components/LoginDialog/slice';
import { RootState } from 'store'
import useStyles from './styles';

enum TabNames {
	PROFILE = 'profile',
	BOOKING_HISTORY = 'bookingHistory'
}

export default function UserPage() {

	const store = useSelector<RootState, RootState>(state => state)
	const [tab, setTab] = useState(TabNames.PROFILE)

	const handleTabChange = (event: React.SyntheticEvent, newTab: TabNames) => {
		setTab(newTab);
	};

	const dispatch = useDispatch()

	useEffect(() => {
		!store.login.user ? dispatch(getUserProfileThunk()) : null
	}, [])

	const classes = useStyles()

	return (
		<div className={classes.profilePage}>
			<Container className={classes.container}>
				<TabContext value={tab.toString()}>
					<TabList className={classes.tabList} onChange={handleTabChange} >
						<Tab className={classes.tab} value={TabNames.PROFILE} label='Thông Tin Chi Tiết' />
						<Tab className={classes.tab} value={TabNames.BOOKING_HISTORY} label='Lịch Sử Đặt Vé' />
					</TabList>
					<TabPanel value={TabNames.PROFILE} className={classes.tabPanel}>
						<UserProfile user={store.login.user} />
					</TabPanel>
				</TabContext>
			</Container>
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import { Container, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from 'app/containers/UserProfile';
import BookingHistory from 'app/containers/BookingHistory';
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
    window.scrollTo({
      top: 0
    })
  }, [])

  useEffect(() => {
    !store.login.user ? dispatch(getUserProfileThunk()) : null
  }, [store.login.user])

  const classes = useStyles()

  return (
    <div className={classes.profilePage}>
      <Container className={classes.container}>
        <TabContext value={tab.toString()}>
          <TabList className={classes.tabList} onChange={handleTabChange} >
            <Tab
              className={classes.tab} disableFocusRipple
              value={TabNames.PROFILE} label='Thông Tin Chi Tiết' />
            {!store.login.isAdmin ?
              <Tab
                className={classes.tab} disableFocusRipple
                value={TabNames.BOOKING_HISTORY} label='Lịch Sử Đặt Vé' /> : null
            }
          </TabList>
          <TabPanel value={TabNames.PROFILE} className={classes.tabPanel}>
            <UserProfile />
          </TabPanel>
          <TabPanel value={TabNames.BOOKING_HISTORY} className={classes.tabPanel}>
            <BookingHistory />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  )
}

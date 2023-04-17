import React, { useEffect, useState, useRef } from "react";

// containers
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import UserDashboard from "./containers/UserDashboard";
import Search from "./containers/Search";
import Friends from "./containers/Friends";
import Groups from "./containers/Groups";
import Playlists from "./containers/Playlists";

// components
import Logo from "./components/_common/Logo";
import NavBar from "./components/_common/NavBar";
import Notification from "./components/_common/Notification";

// third party
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';

// config
import { dashboardNavBarTabs, themeColors } from "./config";

// css
import './css/main.scss';

const App = ({ login, theme }) => {
	const { success } = login;
	const navBarRef = useRef();

	const handleCloseDropdown = () => {
		if (navBarRef.current) {
			navBarRef.current.closeDropdown();
		}
	}

	return (
		<div className='app' style={{ "--theme": themeColors[theme.color] }} onClick={handleCloseDropdown}>
			<Router history={history}>
				<Notification />
				{
					!success &&
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Redirect from="*" to="/login" />
					</Switch>
				}
				{
					success &&
					<SecureRoutes 
						location={window.location}
						navTabs={
							dashboardNavBarTabs.slice(0, -2).concat([
								{
									label: login?.user?.fullname || 'Sign Out',
									value: 'signout',
									path: '/',
								}
							])
						} 
						navBarRef={navBarRef}
					/>
				}
			</Router>
		</div>
	);
}
export default connect((store) => ({
	login: store.login,
	theme: store.theme,
}))(App);

const SecureRoutes = ({ location, navTabs, navBarRef }) => {
    const [selectedTab, setSelectedTab] = useState(navTabs[1].value);

	useEffect(() => {
		setSelectedTab(navTabs.find((tab) => tab.path === location.pathname)?.value || navTabs[1].value);
	}, [location.pathname, navTabs]);

	return (
		<div className="layout-container">
			<div className="site-header">
				<Logo />
				<NavBar 
					tabs={navTabs}
					selectedTab={selectedTab}
					switchTab={(tab) => setSelectedTab(tab.value)}
					classes="secure"
					showSearch={true}
					connectedRef={navBarRef}
				/>
			</div>
			<Switch>
				<Route exact path="/" component={UserDashboard} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/friends" component={Friends} />
				<Route exact path="/groups" component={Groups} />
				<Route exact path="/playlists" component={Playlists} />
				<Redirect from="*" to="/" />
			</Switch>
		</div>
	);
}

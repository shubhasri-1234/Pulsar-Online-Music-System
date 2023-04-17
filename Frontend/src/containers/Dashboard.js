import React, { useState } from 'react';

// components
import NavBar from "../components/_common/NavBar";
import Logo from "../components/_common/Logo";

// config
import { dashboardNavBarTabs } from "../config";

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(dashboardNavBarTabs[1].value);
    return (
        <div className="section-container dashboard-container">
            <div className="left-content">
                <Logo />
                <img className="stock-img" src="/stock/dashboard2.png" alt="" />
            </div>
            <div className="right-content">
                <NavBar 
                    tabs={dashboardNavBarTabs}
                    selectedTab={selectedTab}
                    switchTab={(tab) => setSelectedTab(tab.value)}
                    showSearch={false}
                />
                <div className="tag-line">
                    <div>Listen and Chat.</div>
                    <div>Anywhere. Anytime.</div>
                </div>
                <div className="description">
                    Chat with your friends, create or join groups and listen to your favourite artists together.
                </div>
            </div>
        </div>
    );
}
export default Dashboard;

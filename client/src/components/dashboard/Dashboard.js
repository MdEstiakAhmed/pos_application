import React from 'react';
import LeftBar from '../navbar/LeftBar';
import TopBar from '../navbar/TopBar';

const Dashboard = (props) => {
    return (
        <>
            <TopBar/>
            <div className="container-fluid">
                <div className="row">
                    <LeftBar/>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
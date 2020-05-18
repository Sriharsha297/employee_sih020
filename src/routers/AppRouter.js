import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import NavBar from "../components/NavBar";
import LoginPage from "../components/LoginPage.js";
import PageNotFound from "../components/NotFoundPage";
import Footer from "../components/Footer";
import LeaveForm from "../components/LeaveForm";
import AttendencePage from "../components/AttendencePage";
import TrackAttendance from '../components/TrackAttendance';
import LeaveHistory from '../components/LeaveHistory';


const AppRouter = () => (
    <BrowserRouter>
        <div>

        <NavBar/>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/apply-leave" exact component={LeaveForm} />
                <Route path="/attendence" exact component={AttendencePage}/>
                <Route path="/track-attendance" exact component={TrackAttendance}/>
                <Route path="/leave-history" exact component={LeaveHistory}/>
                <Route component={PageNotFound} />
            </Switch>
        <Footer/>
        </div>
    </BrowserRouter>
)

export default AppRouter;
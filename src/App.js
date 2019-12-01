import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import './App.scss';
import {compose} from "redux";
import News from "./components/News/News";
import Login from "./components/Login/Login";
import Articles from "./components/Articles/Artiles";
import Pagination from "./components/Pagination/Pagination";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HamburgerMenu from "./components/Header/HamburgerMenu/HamburgerMenu";

class App extends Component {

    componentDidMount() {

        this.props.history.push("/home");
    }

    render() {

        return (
            <div className='app'>
                <div className='app__header'>
                    <Header/>
                    <HamburgerMenu/>
                </div>
                    <Route path='/home'
                           render={() => {
                               return (
                                   <div>
                                       <div className='app__news-login-container'>
                                           <News/>
                                           <Login/>
                                       </div>
                                       < Articles/>
                                       < Pagination/>
                                   </div>)
                           }}/>
                    <Footer/>
                </div>
        )
    }
};


let AppContainer = compose(
    connect(),
    withRouter
)(App);


const SKYTRACK = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SKYTRACK;



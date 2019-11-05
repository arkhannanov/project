import React, {Component} from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import './App.scss';
import Main from "./components/Main/Main";
import History from "./components/History/History";
import {compose} from "redux";


class App extends Component {

    componentDidMount() {

        this.props.history.push("/main");
    }

    render() {

        return (
            <div className='app'>
                <div className='app__content'>
                    <Navbar/>
                    <div className='app__content-right-side'>
                        <Route path='/main'
                               render={() => <Main/>}/>

                        <Route path='/history'
                               render={() => <History/>}/>

                    </div>
                </div>
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



import React, {Component} from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import './App.scss';
import Main from "./components/Main/Main";


class App extends Component {

  componentDidMount() {
    if(this.props.isAuth === false) {

      this.props.history.push("/login");
    }
  }

  render() {

    return (
      <div className='app'>
        <div className='app__content'>
          <Navbar/>
          <div className='app__content-right-side'>
            <Route path='/main'
                   render={() => <Main/>}/>

            {/*<Route path='/history'*/}
            {/*       render={() => <History/>}/>*/}

          </div>
        </div>
      </div>
    )
  }
};

const SKYTRACK = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
}

export default SKYTRACK;



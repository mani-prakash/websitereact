import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import RouteDetail from './jsx/RouteDetail.jsx'
import Constants from './jsx/Constants.jsx'
import AppHomeScreen from './jsx/AppHomeScreen.jsx'
import MainPage from './jsx/MainPage.jsx'
//import MainPage from './jsx/MainPage.jsx'
import Utils from './jsx/Utils.jsx'
import Store from './jsx/Store.jsx'
/*ReactDOM.render(
    <Hello name='mani' isPerson={false} height={6} />,
    document.getElementById('area')
);*/
//import { cube, foo } from 'my-module';
//export default App
ReactDOM.render( <MainPage />, document.getElementById('page'));
Store.initStore();
//ReactDOM.render( <App name='mani' isPerson={false} height={6} />, document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { AppRoot } from './components';
import ExampleConfig from './config/ExampleConfig';
ReactDOM.render( /*#__PURE__*/React.createElement(AppRoot, ExampleConfig), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register();
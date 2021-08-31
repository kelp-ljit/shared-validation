require('babel-polyfill');
require('./stylesheets');

const ReactDOM = require('react-dom');
const React = require('react');
const Home = require('./pages/home');

ReactDOM.render(
	<Home/>,
	document.getElementById('root'),
);

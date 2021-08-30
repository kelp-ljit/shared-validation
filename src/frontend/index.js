require('babel-polyfill');
require('./stylesheets');

const ReactDOM = require('react-dom');
const React = require('react');

ReactDOM.render(
	<h1>Home</h1>,
	document.getElementById('root'),
);

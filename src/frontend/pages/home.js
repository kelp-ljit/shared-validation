const React = require('react');
const LoginForm = require('../components/forms/login-form');

module.exports = class Home extends React.Component {
	render() {
		return (
			<div className="container pt-3">
				<div className="row">
					<LoginForm/>
				</div>
			</div>
		);
	}
};

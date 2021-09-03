const React = require('react');
const Base = require('./base');
const _ = require('../../languages');

module.exports = class RootCreateUserForm extends Base {
	render() {
		return (
			<div className="col-12 col-xl-6">
				<div className="card shadow mb-4">
					<div className="card-header d-flex justify-content-between align-items-center">
						<div>{_('Create user')}</div>
						<div className="badge bg-primary">{_('Admin panel')}</div>
					</div>
				</div>
			</div>
		);
	}
};

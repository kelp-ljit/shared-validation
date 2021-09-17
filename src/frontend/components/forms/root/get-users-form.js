const classNames = require('classnames');
const progress = require('nprogress');
const React = require('react');
const {Formik, Form, Field} = require('formik');
const USER_PERMISSION = require('../../../../shared/constants/user-permission');
const {
	getUsersFormSchema,
} = require('../../../../shared/validation/form-schema/root/user');
const _ = require('../../../languages');
const utils = require('../../../common/utils');
const api = require('../../../common/api');
const Base = require('../base');

module.exports = class RootGetUsersForm extends Base {
	constructor(props) {
		super(props);
		this.ids = {
			getUsersForm: utils.generateIdsByFormSchema(getUsersFormSchema),
		};
		this.state.apiResponse = null;
	}

	onSubmitGetUsersForm = async values => {
		try {
			progress.start();

			const {status, data} = await api.root.user.getUsers({
				...values,
				permission: values.permission || undefined,
			});
			this.setState({
				apiResponse: JSON.stringify({status, data}, null, 2),
			});
		} catch (error) {
			const {status, data} = error.response || {};

			this.setState({
				apiResponse: data ? JSON.stringify({status, data}, null, 2) : `${error}`,
			});
		} finally {
			progress.done();
		}
	}

	getUsersFormRender = ({errors, touched}) => {
		const {ids: {getUsersForm: ids}} = this;
		const {$isApiProcessing, apiResponse} = this.state;

		return (
			<Form>
				<div className="mb-3">
					<label htmlFor={ids.permission} className="form-label">{_('Permission')}</label>
					<Field
						id={ids.permission} as="select" name="permission"
						className={classNames('form-select', {'is-invalid': errors.permission && touched.permission})}
					>
						<option>{`-- ${_('Permission')} --`}</option>
						<option value={USER_PERMISSION.ROOT}>
							{_(`user-permission-${USER_PERMISSION.ROOT}`)}
						</option>
						<option value={USER_PERMISSION.MANAGER}>
							{_(`user-permission-${USER_PERMISSION.MANAGER}`)}
						</option>
						<option value={USER_PERMISSION.MEMBER}>
							{_(`user-permission-${USER_PERMISSION.MEMBER}`)}
						</option>
						<option value="error">
							{_('Error')}
						</option>
					</Field>
					{
						errors.permission && touched.permission && (
							<div className="invalid-feedback">{errors.permission}</div>
						)
					}
				</div>
				<button disabled={$isApiProcessing} type="submit" className="btn btn-outline-primary mr-3">
					{_('Search')}
				</button>
				{apiResponse && <pre className="mt-3 mb-0"><code>{apiResponse}</code></pre>}
			</Form>
		);
	}

	render() {
		return (
			<div className="col-12 col-xl-6">
				<div className="card shadow mb-4">
					<div className="card-header d-flex justify-content-between align-items-center">
						<div>{_('Get users')}</div>
						<div className="badge bg-primary">{_('Admin panel')}</div>
					</div>
					<div className="card-body">
						<Formik
							initialValues={{permission: ''}}
							onSubmit={this.onSubmitGetUsersForm}
						>
							{this.getUsersFormRender}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
};

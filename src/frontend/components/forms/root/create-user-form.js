const classNames = require('classnames');
const progress = require('nprogress');
const React = require('react');
const {Formik, Form, Field} = require('formik');
const USER_PERMISSION = require('../../../../shared/constants/user-permission');
const {
	createUserFormSchema,
} = require('../../../../shared/validation/form-schema/root/user');
const _ = require('../../../languages');
const utils = require('../../../common/utils');
const api = require('../../../common/api');
const userValidator = require('../../../validators/root/user-validator');
const Base = require('../base');
const SuccessCheckmark = require('../../success-checkmark');

module.exports = class RootCreateUserForm extends Base {
	constructor(props) {
		super(props);
		this.validators = {
			validateCreateUserForm: utils.makeFormikValidator(
				userValidator.validateCreateUserForm,
			),
		};
		this.ids = {
			createUserForm: utils.generateIdsByFormSchema(createUserFormSchema),
		};
		this.state.isCreateSuccess = null;
		this.state.apiResponse = null;
	}

	onSubmitCreateUserForm = async (values, {resetForm}) => {
		try {
			progress.start();
			this.setState(({isCreateSuccess}) =>
				isCreateSuccess ? {isCreateSuccess: false} : null,
			);

			const {status, data} = await api.root.user.createUser(values);
			this.setState({
				isCreateSuccess: true,
				apiResponse: JSON.stringify({status, data}, null, 2),
			});
			resetForm({values: {username: '', email: '', permission: ''}});
		} catch (error) {
			const {status, data} = error.response || {};

			this.setState({
				apiResponse: data ? JSON.stringify({status, data}, null, 2) : `${error}`,
			});
		} finally {
			progress.done();
		}
	}

	createUserFormRender = ({errors, touched}) => {
		const {ids: {createUserForm: ids}} = this;
		const {$isApiProcessing, isCreateSuccess, apiResponse} = this.state;

		return (
			<Form>
				<div className="mb-3">
					<label htmlFor={ids.username} className="form-label">{_('Username')}</label>
					<div className={classNames('input-group', {'has-validation': errors.username && touched.username})}>
						<span className="input-group-text">http://localhost:8000/</span>
						<Field
							id={ids.username} name="username" type="text"
							maxLength={createUserFormSchema.username.max}
							className={classNames('form-control', {'is-invalid': errors.username && touched.username})}/>
						{
							errors.username && touched.username && (
								<div className="invalid-feedback">{errors.username}</div>
							)
						}
					</div>
					<div className="form-text text-muted">
						{_('Please use lowercase letters, numbers, underscore, dash and dot.')}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor={ids.email} className="form-label">{_('Email')}</label>
					<Field
						id={ids.email} name="email" type="text"
						maxLength={createUserFormSchema.email.max}
						className={classNames('form-control', {'is-invalid': errors.email && touched.email})}/>
					{
						errors.email && touched.email && (
							<div className="invalid-feedback">{errors.email}</div>
						)
					}
				</div>
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
					</Field>
					{
						errors.permission && touched.permission && (
							<div className="invalid-feedback">{errors.permission}</div>
						)
					}
				</div>
				<button disabled={$isApiProcessing} type="submit" className="btn btn-outline-primary mr-3">
					{_('Save')}
				</button>
				{isCreateSuccess && <SuccessCheckmark/>}
				{apiResponse && <pre className="mt-3 mb-0"><code>{apiResponse}</code></pre>}
			</Form>
		);
	}

	render() {
		const {validateCreateUserForm} = this.validators;

		return (
			<div className="col-12 col-xl-6">
				<div className="card shadow mb-4">
					<div className="card-header d-flex justify-content-between align-items-center">
						<div>{_('Create user')}</div>
						<div className="badge bg-primary">{_('Admin panel')}</div>
					</div>
					<div className="card-body">
						<Formik
							initialValues={{username: '', email: '', permission: ''}}
							validate={validateCreateUserForm}
							onSubmit={this.onSubmitCreateUserForm}
						>
							{this.createUserFormRender}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
};

const classNames = require('classnames');
const progress = require('nprogress');
const React = require('react');
const {Formik, Form, Field} = require('formik');
const {
	ACCOUNT_PAGES: {
		SHOW_USERNAME_WAS_TOKEN_ALERT,
	},
} = require('../../../shared/constants/frontend-operation-code');
const {
	registerFormSchema,
} = require('../../../shared/validation/form-schema/user');
const _ = require('../../languages');
const utils = require('../../common/utils');
const api = require('../../common/api');
const userValidator = require('../../validators/user-validator');
const Base = require('./base');
const SuccessCheckmark = require('../success-checkmark');

module.exports = class RegisterForm extends Base {
	constructor(props) {
		super(props);
		this.validators = {
			validateRegisterForm: utils.makeFormikValidator(
				userValidator.validateRegisterForm,
			),
		};
		this.ids = {
			registerForm: utils.generateIdsByFormSchema(registerFormSchema),
		};
		this.state.isRegisterSuccess = null;
		this.state.isUsernameConflict = null;
		this.state.apiResponse = null;
	}

	onSubmitRegisterForm = async (values, {resetForm}) => {
		try {
			progress.start();
			this.setState(({isRegisterSuccess, isUsernameConflict}) =>
				(isRegisterSuccess || isUsernameConflict) ? {isRegisterSuccess: false, isUsernameConflict: false} : null,
			);

			const response = await api.user.register(values);
			this.setState({
				isRegisterSuccess: true,
				apiResponse: JSON.stringify(response.data, null, 2),
			});
			resetForm({values: {username: '', email: '', password: ''}});
		} catch (error) {
			if (error.response?.data?.extra?.frontendOperationCode === SHOW_USERNAME_WAS_TOKEN_ALERT) {
				this.setState({
					isUsernameConflict: true,
					apiResponse: JSON.stringify(error.response.data, null, 2),
				});
				return;
			}

			this.setState({
				apiResponse: error.response?.data ? JSON.stringify(error.response.data, null, 2) : `${error}`,
			});
		} finally {
			progress.done();
		}
	}

	registerFormRender = ({errors, touched}) => {
		const {registerForm: ids} = this.ids;
		const {$isApiProcessing, isRegisterSuccess, isUsernameConflict, apiResponse} = this.state;

		return (
			<Form>
				<div className="mb-3">
					<label htmlFor={ids.username} className="form-label">{_('Username')}</label>
					<div className={classNames('input-group', {'has-validation': errors.username && touched.username})}>
						<span className="input-group-text">http://localhost:8000/</span>
						<Field
							id={ids.username} name="username" type="text"
							maxLength={registerFormSchema.username.max}
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
						maxLength={registerFormSchema.email.max}
						className={classNames('form-control', {
							'is-invalid': errors.email && touched.email,
						})}/>
					{
						errors.email && touched.email && (
							<div className="invalid-feedback">{errors.email}</div>
						)
					}
				</div>
				<div className="mb-3">
					<label htmlFor={ids.password} className="form-label">{_('Password')}</label>
					<Field
						id={ids.password} name="password" type="password"
						maxLength={registerFormSchema.password.max}
						className={classNames('form-control', {
							'is-invalid': errors.password && touched.password,
						})}/>
					{
						errors.password && touched.password && (
							<div className="invalid-feedback">{errors.password}</div>
						)
					}
				</div>
				{
					isUsernameConflict && (
						<div className="alert alert-danger">{_('The username was token.')}</div>
					)
				}
				<button disabled={$isApiProcessing} type="submit" className="btn btn-outline-primary mr-3">
					{_('Register')}
				</button>
				{isRegisterSuccess && <SuccessCheckmark/>}
				{apiResponse && <pre className="mt-3 mb-0"><code>{apiResponse}</code></pre>}
			</Form>
		);
	}

	render() {
		const {validateRegisterForm} = this.validators;

		return (
			<div className="col-12 col-xl-6">
				<div className="card shadow mb-4">
					<div className="card-header">{_('Sign up')}</div>
					<div className="card-body">
						<Formik
							initialValues={{username: '', email: '', password: ''}}
							validate={validateRegisterForm}
							onSubmit={this.onSubmitRegisterForm}
						>
							{this.registerFormRender}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
};

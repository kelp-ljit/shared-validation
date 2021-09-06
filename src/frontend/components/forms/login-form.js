const classNames = require('classnames');
const progress = require('nprogress');
const React = require('react');
const {Formik, Form, Field} = require('formik');
const {
	loginFormSchema,
} = require('../../../shared/validation/form-schema/user');
const {
	ACCOUNT_PAGES: {
		SHOW_INVALID_PASSWORD_ALERT,
	},
} = require('../../../shared/constants/frontend-operation-code');
const _ = require('../../languages');
const utils = require('../../common/utils');
const api = require('../../common/api');
const userValidator = require('../../validators/user-validator');
const Base = require('./base');
const SuccessCheckmark = require('../success-checkmark');

module.exports = class LoginForm extends Base {
	constructor(props) {
		super(props);
		this.validators = {
			validateLoginForm: utils.makeFormikValidator(
				userValidator.validateLoginForm,
			),
		};
		this.ids = {
			loginForm: utils.generateIdsByFormSchema(loginFormSchema),
		};
		this.state.isLoginSuccess = null;
		this.state.isIncorrectPassword = null;
		this.state.loginResponse = null;
	}

	onSubmitLoginForm = async (values, {resetForm}) => {
		try {
			progress.start();
			this.setState(({isLoginSuccess, isIncorrectPassword}) =>
				isLoginSuccess || isIncorrectPassword ? {isLoginSuccess: false, isIncorrectPassword: false} : null,
			);

			const response = await api.user.login(values);
			this.setState({
				isLoginSuccess: true,
				loginResponse: JSON.stringify(response.data, null, 2),
			});
			resetForm({values: {email: '', password: ''}});
		} catch (error) {
			if (error.response?.data?.extra?.frontendOperationCode === SHOW_INVALID_PASSWORD_ALERT) {
				this.setState({
					isIncorrectPassword: true,
					loginResponse: JSON.stringify(error.response.data, null, 2),
				});
				return;
			}

			this.setState({
				loginResponse: error.response?.data ? JSON.stringify(error.response.data, null, 2) : `${error}`,
			});
		} finally {
			progress.done();
		}
	}

	loginFormRender = ({errors, submitCount}) => {
		const {loginForm: ids} = this.ids;
		const {$isApiProcessing, isLoginSuccess, isIncorrectPassword, loginResponse} = this.state;
		const isSubmitted = submitCount > 0;

		return (
			<Form>
				<div className="mb-3">
					<label htmlFor={ids.email} className="form-label">{_('Email')}</label>
					<Field
						autoFocus
						id={ids.email} name="email" type="text"
						maxLength={loginFormSchema.email.max}
						className={classNames('form-control', {
							'is-invalid': errors.email && isSubmitted,
						})}/>
					{
						errors.email && isSubmitted && (
							<div className="invalid-feedback">{errors.email}</div>
						)
					}
				</div>
				<div className="mb-3">
					<label htmlFor={ids.password} className="form-label">{_('Password')}</label>
					<Field
						id={ids.password} name="password" type="password"
						maxLength={loginFormSchema.password.max}
						className={classNames('form-control', {
							'is-invalid': errors.password && isSubmitted,
						})}/>
					{
						errors.password && isSubmitted && (
							<div className="invalid-feedback">{errors.password}</div>
						)
					}
				</div>
				{
					isIncorrectPassword && (
						<div className="alert alert-danger">{_('Incorrect email or password.')}</div>
					)
				}
				<button disabled={$isApiProcessing} type="submit" className="btn btn-outline-primary mr-3">
					{_('Login')}
				</button>
				{isLoginSuccess && <SuccessCheckmark/>}
				{loginResponse && <pre className="mt-3 mb-0"><code>{loginResponse}</code></pre>}
			</Form>
		);
	}

	render() {
		const {validateLoginForm} = this.validators;

		return (
			<div className="col-12 col-xl-6">
				<div className="card shadow mb-4">
					<div className="card-header">{_('Sign in')}</div>
					<div className="card-body">
						<Formik
							initialValues={{email: '', password: ''}}
							validate={validateLoginForm}
							onSubmit={this.onSubmitLoginForm}
						>
							{this.loginFormRender}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
};

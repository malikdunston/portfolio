import React, { Component } from "react";
class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			php: "https://www.malikdunston.com/submit.php",
			fields: [
				{
					name: "firstname",
					type: "text",
					placeholder: "First",
				},
				{
					name: "lastname",
					type: "text",
					placeholder: "Last",
				},
				{
					name: "phone",
					type: "tel",
					pattern: "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
					placeholder: "10-digit Phone",
				},
				{
					name: "email",
					type: "email",
					pattern: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
					placeholder: "Email",
				},
				{
					name: "resume",
					type: "checkbox",
					placeholder: "ex: I need a web app",
					message: "Are you an employer?",
					value: "1"
				},
				{
					name: "needs",
					type: "textarea",
					placeholder: "ex: I need a web app",
					message: "Please describe your needs in detail."
				}
			]
		}
		this.submit = this.submit.bind(this)
	}
	submit(ev) {
		ev.preventDefault();
		let req = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			phone: this.state.phone,
			email: this.state.email,
			resume: parseInt(this.state.resume),
			needs: this.state.needs
		};
		console.log(req); return
		req = JSON.stringify(req)
		fetch(this.state.php, {
			method: 'POST',
			body: req
		}).then(checkError)
		function checkError(response) {
			if (response.status >= 200 && response.status <= 299) {
				return response;
			} else {
				throw Error(response.statusText);
			}
		}
	}
	componentDidMount() {
		let fn;
		this.props.firstname ? fn = this.props.firstname : fn = "";
		this.setState({
			firstname: fn
		})
		this.props.lightModeOnOff(true)()
	}
	handleBlur(ev, f){
		console.dir(ev.target.validity.valid)
	}
	handleChange(ev, f){
		let x = this.state.fields.filter(field=>field.name === f.name)[f.name]
		console.log(x)
		console.dir(ev.target.validity.valid)
	}
	render() {
		const input = (f) => (
			<input required
				id={f.name}
				type={f.type}
				name={f.name}
				pattern={f.pattern}
				data-value={f.value}
				onBlur={ev=>{this.handleBlur(ev, f)}}
				onChange={ev => { this.handleChange(ev, f) }}
				placeholder={f.placeholder} />
		)
		const textarea = (f) => (
			<textarea 
				required
				id={f.name}
				maxlength="500"
				name={f.name}
				onBlur={ev=>{this.handleBlur(ev, f)}}
				onChange={ev => { this.handleChange(ev, f) }}
				placeholder={f.placeholder} />
		)
		return <div id="contact">
			<header>
				{this.state.firstname ? <h1>Hello, {this.state.firstname}.</h1> : ""}
			</header>
			<form action="#">
				<fieldset>
					{this.state.fields.map(f=>{
						return <label htmlFor={"#" + f.name}>
							{f.message}
							{f.type === "textarea" ? textarea(f) : input(f)}
						</label>
					})}
					<label htmlFor="male">Male
						<input type="radio" id="male" name="gender" value="male" />
					</label>
					<label htmlFor="female">Female
						<input type="radio" id="female" name="gender" value="female" />
					</label>
					<label htmlFor="other">Other
						<input type="radio" id="other" name="gender" value="other" />
					</label>

				</fieldset>
				<input onClick={this.submit} type="submit" />
			</form>
		</div>
	};
}; export default Contact;
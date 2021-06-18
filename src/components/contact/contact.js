import React, { Component } from "react";
class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			php: "https://www.malikdunston.com/submit.php",
			fields: {
				firstname: {
					name: "firstname",
					type: "text",
					pattern: "^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$",
					placeholder: "First",
				},
				lastname: {
					name: "lastname",
					type: "text",
					pattern: "^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$",
					placeholder: "Last",
				},
				phone: {
					name: "phone",
					type: "tel",
					pattern: "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
					placeholder: "10-digit Phone",
				},
				email: {
					name: "email",
					type: "email",
					pattern: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
					placeholder: "Email",
				},
				needs: {
					name: "needs",
					type: "textarea",
					placeholder: "ex: I need a web app",
					message: "Please describe your needs in detail."
				}
			},
			formIsValid: false,
			allErrors: []
		}
		this.submit = this.submit.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	submit(ev) {
		ev.preventDefault();
		this.checkForm();
		if(this.state.formIsValid){
			let req = {
				firstname: this.state.fields.firstname.value,
				lastname: this.state.fields.lastname.value,
				phone: this.state.fields.phone.value,
				email: this.state.fields.email.value,
				needs: this.state.fields.needs.value,
				resume: 0
			};
			fetch(this.state.php, {
				method: 'POST',
				body: JSON.stringify(req)
			})
			.then(checkError)
			.then(resp=>{this.props.addUser({...req})})
			function checkError(response) {
				if (response.status >= 200 && response.status <= 299) {
					return response;
				} else {
					throw Error(response.statusText);
				}
			}
		} else alert("You have errors.")
	}
	componentDidMount() {
		let fn;
		this.props.firstname ? fn = this.props.firstname : fn = "";
		this.setState({
			firstname: fn
		})
		this.props.lightModeOnOff(true)()

	}
	validateField(validity, field){
		if(!validity.valid){
			field.error = true
		} else field.error = null
		this.setState({})
	}
	checkForm(){
		this.setState({allErrors: []});
		let e = [], formValid = this.state.formIsValid;
		Object.keys(this.state.fields).forEach(field=>{
			if(this.state.fields[field].error || !this.state.fields[field].value){
				e.push(this.state.fields[field])
			}
		})
		if(e.length === 0){formValid = true}
		this.setState({allErrors: e, formIsValid: formValid});
	}
	handleBlur(ev, f){
		f.blur = true;
		this.validateField(ev.target.validity, f);
		this.setState({});
	}
	handleChange(ev, f){
		f.value = ev.target.value;
		this.validateField(ev.target.validity, f);
		this.checkForm()
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
			<textarea required
				id={f.name} 
				maxLength="500"
				name={f.name}
				onBlur={ev=>{this.handleBlur(ev, f)}}
				onChange={ev => { this.handleChange(ev, f) }}
				placeholder={f.placeholder} />
		)
		return <div id="contact">
			<form action="#"
				className={!this.state.formIsValid ? "invalid-form" : ""}>
				<header>{this.state.firstname ? <h1>Hello, {this.state.firstname}.</h1> : ""}</header>
				<fieldset>
					{Object.keys(this.state.fields).map(fieldName=>{
						let f = this.state.fields[fieldName]
						return <label 
							key={f.name} 
							htmlFor={"#" + f.name} 
							className={(f.blur && f.error) ? "error" : ""}>
							{f.message}
							{f.type === "textarea" ? textarea(f) : input(f)}
						</label>
					})}
				</fieldset>
				<input type="submit" 
					onClick={this.submit}
					className={"button" + (!this.state.formIsValid ? " inactive" : "")}/>
			</form>
		</div>
	};
}; export default Contact;
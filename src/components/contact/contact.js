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
					label: "How can I help?"
				}
			},
			errors: []
		}
		this.handleBlur = this.handleBlur.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.validateField = this.validateField.bind(this)
		this.submit = this.submit.bind(this)
		this.checkForm = this.checkForm.bind(this)
	}
	componentDidMount() {
		let fn;
		this.props.firstname ? fn = this.props.firstname : fn = "";
		this.setState({
			fields: {
				...this.state.fields,
				firstname: {
					...this.state.fields.firstname,
					value: fn
				}
			}
		})
	}
	handleBlur(ev, f){
		f.blur = true;
		this.validateField(ev.target, f);
	}
	handleChange(ev, f){
		f.value = ev.target.value;
		this.validateField(ev.target, f);
	}
	validateField(elem, f){
		if(elem.validity.valid === false){
			f.error = true
		} else {
			f.error = undefined
		}
		this.setState({});
	}
	checkForm(){
		Object.keys(this.state.fields).forEach(field=>{
			this.validateField(
				document.querySelector(`#${field}`),
				this.state.fields[field]
			)
		})
	}
	submit(ev) {
		ev.preventDefault();
		this.checkForm();
		let errorCount = Object.keys(this.state.fields).filter(f=>this.state.fields[f].error===true);
		const msg = () => {
			if(errorCount.length === 0){
				return <div>
					<h1>Thanks, {this.state.fields.firstname.value}.</h1>
				</div>
			}else{
				return <div>
		 			<h1>{errorCount.length} Errors</h1>
					{this.state.errors.map(e=>e)}
		 		</div>
			}
		}
		if(errorCount.length === 0){
			let user = {
				firstname: this.state.fields.firstname.value,
				lastname: this.state.fields.lastname.value,
				phone: this.state.fields.phone.value,
				email: this.state.fields.email.value,
				needs: this.state.fields.needs.value,
				resume: 0
			};
			fetch(this.state.php, {
				method: 'POST',
				body: JSON.stringify(user)
			}).then(response=>{
				if (response.status >= 200 && response.status <= 299) {
					return response;
				} else {
					throw Error(response.statusText);
				}
			}).then(()=>{
				this.props.modalToggle(true, msg(), "Return Home", ()=>{
					window.location.href = `${process.env.PUBLIC_URL}/`;
				}, true);
			})
		} else {
			this.props.modalToggle(true, msg(), `fix errors ${errorCount.length}`, null, true);
		}
	}
	render() {
		const input = (f) => (
			<input required
				id={f.name}
				type={f.type}
				name={f.name}
				pattern={f.pattern}
				value={f.value}
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
			<form action="#">
				<fieldset>
					{Object.keys(this.state.fields).map(fieldName=>{
						let f = this.state.fields[fieldName]
						return <label 
							key={f.name} 
							htmlFor={"#" + f.name} 
							className={(f.error) ? "error" : ""}>
							{f.label ? <span>{f.label}</span> : ""}
							{f.type === "textarea" ? textarea(f) : input(f)}
						</label>
					})}
				</fieldset>
				<input type="submit" className="button" onClick={this.submit}/>
			</form>
		</div>
	};
}; export default Contact;
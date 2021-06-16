import React, { Component } from "react";
class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: "",
			lastname: "",
			phone: "",
			email: "",
			resume: false,
			needs: "",
			php: "https://www.malikdunston.com/submit.php"
		}
		this.submit = this.submit.bind(this)
	}
	submit(ev) {
		ev.preventDefault();
		console.log(this.state);
		let req = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			phone: this.state.phone,
			email: this.state.email,
			resume: this.state.resume,
			needs: this.state.needs
		};
		console.log(req);
		return;
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
	}
	render() {
		return <div id="contact">
			<form action="#">
				<fieldset>
					<input id="firstmane"
						type="text"
						name="firstname"
						onChange={ev => { this.setState({ firstname: ev.target.value }) }}
						placeholder="First" />
					<input id="lastname"
						type="text"
						name="lastname"
						onChange={ev => { this.setState({ lastname: ev.target.value }) }}
						placeholder="Last" />
					<input id="phone"
						type=""
						name="phone"
						onChange={ev => { this.setState({ phone: ev.target.value }) }}
						placeholder="Phone" />
					<input id="email"
						type=""
						name="email"
						onChange={ev => { this.setState({ email: ev.target.value }) }}
						placeholder="Email" />
					<input id="needs"
						type="textarea"
						name="needs"
						onChange={ev => { this.setState({ needs: ev.target.value }) }}
						placeholder="ex: 'I need a Developer.'" />
					<input id="resume"
						type="checkbox"
						name="resume"
						data-val="true"
						value="true"
						onChange={ev => { this.setState({ resume: ev.target.value }) }} />
				</fieldset>
				<input onClick={this.submit} type="submit" />
			</form>
		</div>
	};
}; export default Contact;
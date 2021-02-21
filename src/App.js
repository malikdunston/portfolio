import logo from "./logo.svg";
import "./App.css";

function App() {

	// const $data = () => {
		fetch("http://wp.malikdunston.com/wp-json")
			.then((data) => {
				console.log(data);
			})
	// }

	// console.log($data);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					React
				</a>
			</header>
		</div>
	);
}

export default App;

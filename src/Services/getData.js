import React from 'react';
const { REACT_APP_WP_URL, REACT_APP_RESUME, REACT_APP_CITIES} = process.env;
export default function getData(OrigComp) { // HOC
	return function GetDataHOC(props) { // Data
		const getPortfolio = async (lookFor, params = { ["per_page"]: "100" }) => {
			let url = new URL(`https://${REACT_APP_WP_URL}/wp-json/wp/v2/${lookFor}`);
			url.search = new URLSearchParams(params).toString();
			return await fetch(url).then(resp => resp.json())
		}
		const getResume = async (table = "experience") => {
			let url = new URL(REACT_APP_RESUME);
			url.search = new URLSearchParams({table: table}).toString();
			return await fetch(url).then(res => res.json()).catch(err => err)
		}
		const getCities = async () => {
			let url = new URL(REACT_APP_CITIES);
			let text = await fetch(url).then(res => res.text()).catch(err => err);
			let cities = text.split(/\n/).map(city => {
				let obj = city.split('\t');
				return obj
			}); // return just first city for now.
			return cities;
		}
		const findCity = async (lat, long) => {
			let cities = await getCities();
			let city = cities.filter(c => c[1] == "Atlanta");
			console.log(city);
			return city;
		}
		return <OrigComp {...props} getData={getPortfolio} getResume={getResume} findCity={findCity}/>
	}
}
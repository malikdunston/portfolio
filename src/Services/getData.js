import React from 'react';
const { REACT_APP_WP_URL, REACT_APP_RESUME } = process.env;
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
			return await fetch(url).then(res => res.json())
		}
		return <OrigComp {...props} getData={getPortfolio} getResume={getResume} />
	}
}
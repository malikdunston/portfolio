import React from 'react';
export default function getData (OrigComp) {
	return function GetDataHOC ( props ) {
		const getData = async ( lookFor, params ) =>{
			params = params || {};
			params["per_page"] = params.perPage || "100";
			let url = new URL(("https://wp.malikdunston.com/wp-json/wp/v2/" + lookFor));
			url.search = new URLSearchParams(params).toString();
			return  await fetch(url).then(resp => resp.json());
		}
		return <OrigComp {...props} getData={getData} />
	}
}
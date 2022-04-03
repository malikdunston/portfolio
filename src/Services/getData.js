import React from 'react';
const { REACT_APP_WP_URL, REACT_APP_RESUME } = process.env;
export default function getData (OrigComp) {
	return function GetDataHOC ( props ) {
		const getData = async ( lookFor, params ) =>{
			params = params || {};
			let api;
			if(lookFor == "resume"){
				api = REACT_APP_RESUME;
				params.action = "getUsers";
			}else{
				params["per_page"] = params.perPage || "100";
				api = `https://${REACT_APP_WP_URL}/wp-json/wp/v2/${lookFor}`;
			}
			let url = new URL(api);			
			url.search = new URLSearchParams(params).toString();
			return  await fetch(url).then(resp => resp.json());
		}
		return <OrigComp {...props} getData={getData} />
	}
}
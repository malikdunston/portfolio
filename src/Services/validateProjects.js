import Config from "./../config";
const validateProjects = projects => {
	let arr = [];
	projects.forEach(proj => {
		let match = Config.filter(c => c.slug === proj.slug);
		if(match.length === 0) { arr.push(proj) }
	})
	return arr;
}
export default validateProjects;
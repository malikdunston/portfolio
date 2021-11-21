import Config from './config.json'
const validateProjects = projects => {
	let valid = [];
	projects.forEach(proj => {
		console.log(Object.keys(Config));
		console.log(proj.slug);
		if (!Object.keys(Config).includes(proj.slug)){
			valid.push(proj)
		}
	})
	return valid
}
export default validateProjects
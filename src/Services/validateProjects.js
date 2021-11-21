import Config from './config.json'
const validateProjects = projects => {
	let valid = [];
	projects.forEach(proj => {
		if (!Object.keys(Config).includes(proj.slug)){
			valid.push(proj)
		}
	})
	return valid
}
export default validateProjects
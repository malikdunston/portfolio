const validateProjects = projects => {
	let valid = [];
	projects.forEach(proj => {
		if (Object.keys(projects).includes(proj.slug)){
			valid.push(proj)
		}
	})
	return valid
}
export default validateProjects
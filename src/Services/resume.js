const resumeData = {
	someStuff: ["hey"]
}
const formatResume = resume => {
	let newResume = {
		...resume,
		fromService: 8909709
	}
	console.log("from resumeservice: ", newResume);
	return resume;
}
export { formatResume }
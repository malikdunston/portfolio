const getBreakpoints = elem => {
	let names = ["xs", "sm", "md", "lg", "xl"];
	let sizes = [0, 600, 1000, 1360, 1900];
	let stopAt = 0;
	sizes.forEach((bp, i)=>{
		if(elem.innerWidth > bp){
			stopAt = i
		}
	})
	return {
		name: names[ stopAt ],
		size: elem.innerWidth
	}
}
export default getBreakpoints
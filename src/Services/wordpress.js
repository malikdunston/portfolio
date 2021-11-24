import Config from './config.json'
const organizePosts = posts => {
	function handleHeirarchies(posts){
		return posts.filter(post => post.parent === 0).map(post => {	
			return {
				...post,
				projChildren: posts.filter(p => {
					return p.parent === post.id
				})
			}
		})
	}
	return handleHeirarchies( posts.map(post => {
		return {
			...post,
			hidden: Object.keys(Config.exclude).includes(post.slug) ? true : false
		}
	}) )
}
const organizeContent = content => {
	let html = document.createElement("div");
	html.innerHTML = content ? content : "";
	var imgs = []
	html.querySelectorAll("figure").forEach(fig=>{
		let imgTag = fig.querySelector("img");
		let imgCap = fig.querySelector("figcaption");
		imgs.push({
			src: imgTag === null ? "" : imgTag.src,
			caption: imgCap === null ? null : imgCap
		})
	})
	console.log(imgs);
	return imgs
}
export { organizePosts, organizeContent }
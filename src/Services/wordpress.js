import Config from './config.json'
const handleHeirarchies = posts => {
	return posts.filter(post => post.parent === 0).map(post => {	
		return {
			...post,
			projChildren: posts.filter(p => {
				return p.parent === post.id
			})
		}
	})
}
const matchToConfig = posts => {
	let pass = [];
	posts.forEach(post => {
		if (!Object.keys(Config.exclude).includes(post.slug)){
			pass.push( post )
		}
	})
	return handleHeirarchies( pass )
}
export default matchToConfig
import config from "../config/apiConfig";

class Api {
	constructor(config) {
		this.url = config.url
	}
	async countries (){
		const res = await fetch(`${this.url}/countries`).then(res=> res.json())
		return res
	}
	async cities (){
		const res = await fetch(`${this.url}/cities`).then(res=> res.json())
		return res
	}
	async prices (){

	}
}

const api = new Api(config)

export default api

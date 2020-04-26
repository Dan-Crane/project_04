import config from "../config/apiConfig";

class Api {
	constructor(config) {
		this.url = config.url
	}

	async countries() {
		try {
			const res = await fetch(`${this.url}/countries`).then(res => res.json())
			return res
		} catch (err) {
			console.log(err);
			return Promise.reject(err)
		}
	}

	async cities() {
		try {
			const res = await fetch(`${this.url}/cities`).then(res => res.json())
			return res
		} catch (err) {
			console.log(err);
			return Promise.reject(err)
		}
	}

	async prices(params) {
		try {
			const res = await fetch(`${this.url}/prices/cheap?${params}`).then(res => res.json())
			return res
		} catch (err) {
			console.log(err);
			return Promise.reject(err)
		}
	}

	async airlines() {
		try {
			const res = await fetch(`${this.url}/airlines`).then(res => res.json())
			return res
		} catch (err) {
			console.log(err);
			return Promise.reject(err)
		}
	}
}

const api = new Api(config)

export default api

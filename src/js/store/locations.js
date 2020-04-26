import api from "../services/apiService";

class Locations {
	constructor(api) {
		this.api = api
		this.countries = null
		this.cities = null
		this.shortCitiesLis = {}
		this.lastSearch = {}
		this.airlines = {}
	}

	async init() {
		const response = await Promise.all([
			this.api.countries(),
			this.api.cities(),
			this.api.airlines(),
		])

		const [countries, cities, airlines] = response
		this.countries = this.serializeCountry(countries)
		this.cities = this.serializeCities(cities)
		this.shortCitiesLis = this.createShortCitiesList(this.cities);
		this.airlines = this.serializeAirlines(airlines)

		return response
	}

	createShortCitiesList(cities) {
		return Object.entries(cities).reduce((acc, [, city]) => {
			acc[city.full_name] = null
			return acc
		}, {})
	}

	serializeCountry(countries) {
		// {'country code': {...}}
		return countries.reduce((acc, country) => {
			acc[country.code] = country
			return acc
		}, {})
	}

	serializeCities(cities) {
		return cities.reduce((acc, city) => {
			const country_name = this.countries[city.country_code].name;
			city.name = city.name || city.name_translations.en
			const full_name = `${city.name},${country_name}`;
			acc[city.code] = {
				...city,
				country_name,
				full_name
			};
			return acc;
		}, {});
	}

	serializeAirlines(airline) {
		return airline.reduce((acc, item) => {
			item.logo = `http://pics.avs.io/500/500/${item.code}.png`
			item.name = item.name || item.name_translations.en
			acc[item.code] = item
			return acc
		}, {})
	}

	getCountryNameByCode(code) {
		return this.countries[code].name
	}

	getAirlineLogoByCode(code) {
		return this.airlines[code] ? this.airlines[code].logo : ''
	}

	getCityCodeByKey(key) {
		const city = Object.values(this.cities).find((item)=>item.full_name === key)
		return city.code
	}

	getCityNameByCode(code){
		return this.cities[code].name;
	}

	async fetchTickets(params) {
		const response = await this.api.prices(params)
		this.lastSearch = this.serializeTickets(response)
	}

	serializeTickets(tickets){
		return Object.values(tickets).map(ticket=>{
			return {
				...ticket,
				origin_name: this.getCityNameByCode(ticket.origin),
				destination_name: this.getCityNameByCode(ticket.destination),
				airline_logo: this.getAirlineLogoByCode(ticket.airlines),
				airline_name: this.getCityNameByCode(ticket.airlines)
			}
		})
	}
}

const locations = new Locations(api)

export default locations

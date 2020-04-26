import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import formUI from "./vuews/form";
import currencyUI from "./vuews/currency";

locations.init().then(res => {
	console.log(locations);

})

document.addEventListener('DOMContentLoaded', () => {
	initApp()
	const form = formUI.form

	//Events
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		onFormSubmit()
	})

	//Handlers
	async function initApp() {
		await locations.init()
		formUI.setAutoCompleteData(locations.shortCitiesLis)
	}

	async function onFormSubmit() {
		//данные из input
		const origin = locations.getCityCodeByKey(formUI.originValue)
		const destination = locations.getCityCodeByKey(formUI.destinationValue)
		const depart_date = formUI.departDataValue
		const return_date = formUI.returnDataValue
		const currency = currencyUI.currencyValue

		console.log(origin, destination, depart_date, return_date)
		await locations.fetchTickets( {origin, destination, depart_date, return_date, currency})
	}
})

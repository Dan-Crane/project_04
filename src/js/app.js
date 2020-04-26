import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import formUI from "./vuews/form";
import currencyUI from "./vuews/currency";

document.addEventListener('DOMContentLoaded', () => {
	const form = formUI.form

	//Events
	initApp()
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
		await locations.fetchTickets(`origin=${origin}&destination=${destination}&depart_date=${depart_date}&return_date=${return_date}&currency=${currency}`)
	}
})

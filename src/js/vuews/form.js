import {getAutocompleteInstance, getDatepickersInstance} from '../plugins/materialize'

class FormUI {
	constructor(autocompleteInstance, datepickersInstance) {
		this._form = document.forms['location-controls']
		this.origin = document.getElementById('autocomplete-origin')
		this.destination = document.getElementById('autocomplete-destination')
		this.depart = document.getElementById('datepicker-depart')
		this.return = document.getElementById('datepicker-return')
		this.originAutocomplete = autocompleteInstance(this.origin)
		this.destinationAutocomplete = autocompleteInstance(this.destination)
		this.departDatePicker = datepickersInstance(this.depart)
		this.returnDatePicker = datepickersInstance(this.return)
	}

	get form() {
		return this._form
	}

	get originValue() {
		return this.origin.value
	}

	get destinationValue() {
		return this.destination.value
	}

	get departDataValue() {
		return this.departDatePicker.toString()
	}

	get returnDataValue() {
		return this.returnDatePicker.toString()
	}

	setAutoCompleteData(data) {
		this.originAutocomplete.updateData(data)
		this.destinationAutocomplete.updateData(data)
	}
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickersInstance)

export default formUI

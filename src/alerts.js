//import 'sweetalert2/dist/sweetalert2.css'

import swal from 'sweetalert2';

const defaultParams = {
	confirmButtonColor: '#a82727',
};

export default {

	async show(text, title, type)
	{
		//await swal.fire(title, text, type);

		await swal.fire({
			...defaultParams,
			title,
			text,
			icon: type,
		});
	},

	async confirm(text, title, type, yesno)
	{
		var result, params = { text, title, icon: type || 'question', showCancelButton: true };

		if (yesno)
		{
			params = { 
				...defaultParams,
				...params,
				cancelButtonText: 'No',
				confirmButtonText: 'Yes',
			}
		}

		result = await swal.fire(params);
		return result.value ? true : false;
	}
}
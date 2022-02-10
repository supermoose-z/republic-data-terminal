<template>
	<!-- simple search widget that sends the entered ID to the owner via a submitted event -->
	<div class="search-widget">
		<form novalidate @submit.prevent="submit">
			<input v-model="id" type="text" class="search-widget__field" placeholder="Enter ID# of character here">

			<btn type="submit" :disabled="loading">{{ loading ? 'Please wait' : 'Search' }}</btn>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import alerts from '../alerts';

export default {
	data()
	{
		return {
			id: '',
		}
	},

	computed: {
		// include data from state
		...mapState({
			loading: state => state.loading,
		})
	},

	methods: {
		// add actions from state management
		...mapActions(['fetchCharacter']),

		submit()
		{
			// get id
			var id = this.id.trim();

			// if its blank display an error
			if (id == '')
			{
				alerts.show('No ID# entered!', 'Oops!', 'warning');
			}
			// otherwise if its not a number display an error
			else if (false || isNaN(id))
			{
				alerts.show('Please enter a numeric value', 'Oops', 'warning');
			}
			else
			{
				this.fetchCharacter(this.id);
			}
		}
	}
}
</script>
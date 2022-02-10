<template>
	<div class="container">
		
		<app-header/>

		<!-- lookup interface -->
		<panel title="Character Lookup">
			<panel-body>

				<search-widget />	
			
			</panel-body>
		</panel>


		<!-- display loading indicator while loading -->
		<loading v-if="loading"/>

		<!-- if load failed display error -->
		<panel v-else-if="error != null" title="Error">
			<panel-body>
				{{ error }}
			</panel-body>
		</panel>

		<!-- display character info if available -->
		<character-info v-else-if="character != null" :char="character" />

		<!-- otherwise display menu of characters to pre-select -->
		<panel v-else title="Select a character">
			<ul class="menu">
				<li v-for="item in options" :key="item.id">
					<button class="menu__item" @click.prevent="fetchCharacter(item.id)">{{ item.name }}</button>
				</li>
			</ul>
		</panel>

	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AppHeader from './AppHeader.vue';
import SearchWidget from './SearchWidget.vue';
import CharacterInfo from './CharacterInfo.vue';

export default {
	components: { AppHeader, SearchWidget, CharacterInfo },

	data()
	{
		return {
			options: [
				{ id: 1, name: 'Luke Skywalker' },
				{ id: 14, name: 'Han Solo' },
				{ id: 5, name: 'Leia Organa' },
				{ id: 25, name: 'Lando Calrissian' },
			]
		}
	},

	computed: {
		// include data from state
		...mapState({
			loading: state => state.loading,
			character: state => state.character,
			error: state => state.error,
		}),
	},

	methods: {
		// add actions from state management
		...mapActions(['fetchCharacter']),
	}
}
</script>
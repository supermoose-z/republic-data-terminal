<template>
	<div class="character">
		<div class="character-title">
			<div class="title">{{ char.name }}</div>

			<span>
				<btn @click.prevent="clearCharacter">Clear</btn>
			</span>
		</div>

		<div class="info-columns">
			
			<!-- MAIN DETAILS -->
			<div class="info-columns__col33">
				<info-fields 
					title="About"
					:object="char"
					:fields="aboutFields"
				/>
			</div>

			<!-- HOME PLANET -->
			<div class="info-columns__col33">
				<info-fields 
					title="Home Planet"
					:object="char.home_planet"
					:fields="planetFields"
				/>
			</div>

			<!-- SPECIES -->
			<div class="info-columns__col33">
				<info-fields 
					v-for="speciesInfo in char.species"
					:key="speciesInfo.url"
					title="Species"
					:object="speciesInfo"
					:fields="speciesFields"
				/>
			</div>
		</div>

		<!-- FILMS -->
		<div class="title">Appears In These Films</div>
		<div class="info-columns">
			<div v-for="filmInfo in char.films" :key="filmInfo.url" class="info-columns__col33">
				<info-fields 
					:title="filmInfo.title"
					:object="filmInfo"
					:fields="filmFields"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';

import InfoFields from './InfoFields.vue';

export default {
	components: { InfoFields },

	props: {
		char: { type: Object, required: true }
	},

	data()
	{
		return {
			aboutFields: [
				{ name: 'height', title: 'Height', format: 'cm' },
				{ name: 'mass', title: 'Mass', format: 'kg' },
				{ name: 'hair_color', title: 'Hair Color', format: 'title' },
				{ name: 'skin_color', title: 'Skin Color', format: 'title' },
				{ name: 'gender', title: 'Gender', format: 'title' },
				{ name: 'birth_year', title: 'Birth Year' },
			],

			planetFields: [
				{ name: 'name', title: 'Name' },
				{ name: 'terrain', title: 'Terrain', format: 'title' },
				{ name: 'population', title: 'Population', format: 'number' },
			],

			speciesFields: [
				{ name: 'name', title: 'Name' },
				{ name: 'average_lifespan', title: 'Average Lifespan' },
				{ name: 'classification', title: 'Classification', format: 'title' },
				{ name: 'language', title: 'Language' },
			],

			filmFields: [
				{ name: 'director', title: 'Director' },
				{ name: 'producer', title: 'Producers' },
				{ name: 'release_date', title: 'Release Date' },
			],
		}
	},

	methods: {
		...mapMutations(['setCharacter']),

		clearCharacter()
		{
			this.setCharacter(null);
		}
	}
}
</script>

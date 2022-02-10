<template>
	<panel :title="title">
		<div v-for="field in fields" :key="field.name" class="info-line">
			<div class="info-line__label">{{ field.title }}</div>
			<div class="info-line__value">{{ formatField(field) }}</div>
		</div>
	</panel>
</template>

<script>
import _ from 'lodash/string';

export default {
	props: {
		// title of panel
		title: { type: String, required: true },

		// fields - an array of { name: 'field_name', title: 'Field Title', format: 'optional' } used to display fields from the given object
		fields: { type: Array, required: true },

		// object to display fields from
		object: { type: Object, required: true },
	},

	methods: {
		// format field if specified
		formatField(field)
		{
			var value = this.object[field.name] || '';

			if (value == 'unknown')
				return 'Unknown';

			// add kg/cm to value
			if (field.format == 'kg' || field.format == 'cm')
				return `${value} ${field.format}`;

			// title case value
			if (field.format == 'title')
				return _.capitalize(value);

			// numeric format based on locale
			if (field.format == 'number')
				return new Intl.NumberFormat().format(value);
			
			// pass value through if unknown format
			return value;
		}
	}
}
</script>
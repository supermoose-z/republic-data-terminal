<template>
	<!--
	Simple panel component
	-->

	<div class="panel">
		<div v-if="title" class="panel__title">{{ title }}</div>

		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String },
	}
}
</script>
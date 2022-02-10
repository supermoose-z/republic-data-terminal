<template>
	<button class="btn" v-bind="$props" v-on="$listeners">
		<span class="btn__front">
			<slot></slot>
		</span>
	</button>
</template>
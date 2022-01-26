<template>
	<div id="app">
		<VFlex gap="12px">
			<router-view />
		</VFlex>
	</div>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';

	import { VFlex } from '@corioders/vueui';

	export default defineComponent({
		components: {
			VFlex,
		},
	});
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap');
	#app {
		font-family: 'Open Sans', sans-serif;
		* {
			box-sizing: border-box;
		}
	}
</style>

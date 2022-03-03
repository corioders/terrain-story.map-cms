<template>
	<div id="app">
		<VFlex gap="12px">
			<VFlex v-if="$route.name !== 'Login'" direction="row" gap="8px">
				<VButton @click="$router.push('/add-floor')">Dodaj piętro</VButton>
				<VButton @click="$router.push('/add-location')">Dodaj lokalilację</VButton>
				<VButton @click="$router.push('/preexam-recap')">"Wygraj Maturę"</VButton>
			</VFlex>

			<router-view />
		</VFlex>
	</div>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';

	import { VFlex, VButton } from '@corioders/vueui';

	export default defineComponent({
		components: {
			VFlex,
			VButton,
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

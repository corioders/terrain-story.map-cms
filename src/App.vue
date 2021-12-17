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

<style lang="scss"></style>

<template>
	<VFlex direction="row" gap="12px">
		<VButton @click="$router.push('/floor-map/add-floor')">Dodaj piętro</VButton>
		<VButton @click="$router.push('/floor-map/add-location')">Zobacz lokalizację</VButton>
	</VFlex>
	<router-view />
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import { VButton, VFlex } from '@corioders/vueui';

	export default defineComponent({
		name: 'FloorMap',
		components: {
			VButton,
			VFlex,
		},
	});
</script>

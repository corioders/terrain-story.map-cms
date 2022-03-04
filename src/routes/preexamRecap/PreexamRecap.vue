<template>
	<VFlex direction="row" gap="12px">
		<VButton @click="$router.push('/preexam-recap/add-question')">Dodaj zagadkę</VButton>
		<VButton @click="$router.push('/preexam-recap/show-questions')">Zobacz zagadki</VButton>
	</VFlex>
	<router-view />
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import { VButton, VFlex } from '@corioders/vueui';

	export default defineComponent({
		name: 'PreexamRecap',
		components: {
			VButton,
			VFlex,
		},
	});
</script>

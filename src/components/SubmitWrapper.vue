<template>
	<VButton class="showPopupButton" @click="showSubmitPopup = !showSubmitPopup">Prześlij</VButton>
	<section :class="{ showSubmitPopup }">
		<p>Te synek od tego niy ma nawrotu, je żeś pewny?</p>
		<VFlex direction="row" gap="12px" justify="flex-end">
			<VButton style="background: red" @click="$emit('submit')">Jaaaaaaaaaa</VButton>
			<VButton @click="showSubmitPopup = false">Niy</VButton>
		</VFlex>
	</section>
</template>

<script lang="ts">
	import { defineComponent, watch, ref } from 'vue';

	import { VFlex, VButton } from '@corioders/vueui';

	export default defineComponent({
		components: {
			VFlex,
			VButton,
		},
		emits: ['submit'],
		setup() {
			const showSubmitPopup = ref<boolean>(false);

			let closeTimeout: number | null = null;
			watch(showSubmitPopup, () => {
				if (closeTimeout !== null) clearTimeout(closeTimeout);
				closeTimeout = setTimeout(() => {
					showSubmitPopup.value = false;
				}, 2500);
			});

			return { showSubmitPopup };
		},
	});
</script>

<style lang="scss" scoped>
	.showSubmitPopup {
		transform: scaleY(1) translateY(0);
		opacity: 1;
	}

	section {
		padding: 12px;
		border: 1px solid #e0e0e6;
		border-radius: 5px;
		background: #fff;
		transform: scaleY(0) translateY(-100%);
		opacity: 0;
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}
</style>

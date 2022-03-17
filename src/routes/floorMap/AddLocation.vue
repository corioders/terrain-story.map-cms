<template>
	<p>Aby usunąć wprowadzone zmiany odświerz stronę, to działa tylko jeśli ich nie przesłałeś</p>
	<h1>Dodawanie lokalizacji:</h1>

	<h1 v-if="!locationsLoaded">Ladowanie</h1>
	<VFlex v-else gap="24px">
		<VInput v-model="inputLocationName" name="nazwa lokalilacji" type="text" />
		<VInput v-model="inputFriendlyLocationName" name="przyjazna dla użytkownika nazwa lokalilacji" type="text" />
		<VInput v-model="inputLatitude" name="latitude lokalicji" type="text" />
		<VInput v-model="inputLongitude" name="longitude lokalicji" type="text" />

		<VInput v-model="inputLocationID" name="id lokalicji (jak nie wiesz co tutaj dać to pisz do Wiktora!!)" type="text" />
		<VButton @click="addLocation">Dodej lokalilację</VButton>

		<VCard v-for="(location, locationID) in locations" :key="`location${locationID}-${location.name}`">
			<p>Nazwa: {{ location.name }}</p>
			<p>Przyjazna nazwa: {{ location.friendlyName }}</p>
			<p>Latitude: {{ location.latitude }}</p>
			<p>Longitude: {{ location.longitude }}</p>
			<p>ID: {{ locationID }}</p>
		</VCard>

		<SubmitWrapper @submit="submit" />
	</VFlex>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import SubmitWrapper from '@/components/SubmitWrapper.vue';

	import { VCard, VButton, VInput, VFlex } from '@corioders/vueui';

	import { getLocations, Locations, setLocations } from './firebase';

	export default defineComponent({
		name: 'Home',
		components: {
			VCard,
			VButton,
			VInput,
			VFlex,
			SubmitWrapper,
		},
		setup() {
			const inputLocationName = ref('');
			const inputLocationID = ref('');
			const inputFriendlyLocationName = ref('');
			const inputLatitude = ref('');
			const inputLongitude = ref('');

			const locationsLoaded = ref<boolean>(false);
			const locations = ref<Locations>({});
			getLocations().then((l) => {
				locations.value = l;
				locationsLoaded.value = true;
			});

			function addLocation(): void {
				if (inputLocationName.value === '') {
					alert('Prosza nazwać lokalicję...');
					return;
				}
				if (inputFriendlyLocationName.value === '') {
					alert('Prosza nadać przyjazną nazwę lokalicji...');
					return;
				}
				if (inputLatitude.value === '') {
					alert('Prosza podać latitude lokalicji...');
					return;
				}
				if (inputLongitude.value === '') {
					alert('Prosza podać longitude lokalicji...');
					return;
				}

				if (locations.value[inputLocationID.value] !== undefined) {
					alert('Lokalizacja o takim ID już istnieje...');
				}

				locations.value[inputLocationID.value] = {
					name: inputLocationName.value,
					friendlyName: inputFriendlyLocationName.value,
					latitude: inputLatitude.value,
					longitude: inputLongitude.value,
				};
			}

			const router = useRouter();
			async function submit(): Promise<void> {
				await setLocations(locations.value);
				router.push('/sent');
			}

			return {
				addLocation,
				submit,
				locations,
				locationsLoaded,
				inputLocationName,
				inputLocationID,
				inputFriendlyLocationName,
				inputLatitude,
				inputLongitude,
			};
		},
	});
</script>

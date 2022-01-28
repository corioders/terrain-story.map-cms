<template>
	<p>Aby usunąć wprowadzone zmiany odświerz stronę, to działa tylko jeśli ich nie przesłałeś</p>
	<h1>Dodawanie lokalizacji:</h1>

	<h1 v-if="!locationsLoaded">Ladowanie</h1>
	<div v-else>
		<VInput v-model="inputLocationName" name="nazwa lokalilacji" type="text" />
		<VInput v-model="inputLocationID" name="id lokalicji (jak nie wiesz co tutaj dać to pisz do Wiktora!!)" type="text" />
		<VButton @click="addLocation">Dodej lokalilację</VButton>

		<VCard v-for="(location, locationID) in locations" :key="`location${locationID}-${location.name}`">
			Nazwa:
			<p>{{ location.name }}</p>
			ID:
			<p>{{ locationID }}</p>
		</VCard>

		<SubmitWrapper @submit="submit" />
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import SubmitWrapper from '@/components/SubmitWrapper.vue';

	import { getLocations, Locations, setLocations } from '@/firebase';
	import { VCard, VButton, VInput } from '@corioders/vueui';

	export default defineComponent({
		name: 'Home',
		components: {
			VCard,
			VButton,
			VInput,
			SubmitWrapper,
		},
		setup() {
			const inputLocationName = ref('');
			const inputLocationID = ref('');

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

				if (locations.value[inputLocationID.value] !== undefined) {
					alert('Lokalizacja o takim ID już istnieje...');
				}

				locations.value[inputLocationID.value] = {
					name: inputLocationName.value,
				};
			}

			const router = useRouter();
			async function submit(): Promise<void> {
				await setLocations(locations.value);
				router.push('/sent');
			}

			return { locations, addLocation, locationsLoaded, inputLocationName, inputLocationID, submit };
		},
	});
</script>

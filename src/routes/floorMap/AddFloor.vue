<template>
	<p>Aby usunąć wprowadzone zmiany odświerz stronę, to działa tylko jeśli ich nie przesłałeś</p>
	<h1>Dodawanie piętra:</h1>

	<h1 v-if="!locationsLoaded">Ladowanie</h1>
	<VFlex v-else gap="12px">
		<select id="locations" v-model="selectedLocation" name="locations">
			<option v-for="(location, locationID) in locations" :key="location.name" :value="locationID">{{ location.name }}</option>
		</select>

		<h1 v-if="selectedLocation === null">Obier lokalilację...</h1>
		<VFlex v-else gap="12px">
			<select id="games" v-model="selectedGame" name="games">
				<option v-for="game in gameDescriptors" :key="game.name" :value="game">{{ game.name }}</option>
			</select>

			<h1 v-if="selectedGame === null">Obier grę...</h1>
			<h1 v-else-if="!floorsLoaded">Ladowanie</h1>
			<VFlex v-else gap="12px">
				<VInput v-model="inputFloorName" name="nazwa piętra" type="text" />
				<VButton @click="addFloor">Dodej piętro</VButton>

				<h1 v-if="floors.length === 0">Ni ma żodnych wpisonych pięter, weź sam coś wpisz</h1>
				<VCard v-for="(floor, i) in floors" :key="`floor${i}-${floor.name}`">
					<VFlex direction="row" gap="12px">
						<VFlex align="flex-start">
							<p>{{ floor.name }}</p>
							<div v-for="puzzle in selectedGame.puzzleIDs" :key="`puzzle-${puzzle}`">
								<div>
									<input :id="`puzzle_${puzzle}_${floor.name}`" v-model="floor.puzzleIDs" type="checkbox" :value="puzzle" />
									<label :for="`puzzle_${puzzle}_${floor.name}`">{{ puzzle }}</label>
								</div>
							</div>
						</VFlex>
						<VFlex>
							<VButton @click="modifyFloor.up(floor)">^</VButton>
							<VButton @click="modifyFloor.remove(floor)">x</VButton>
							<VButton @click="modifyFloor.down(floor)">v</VButton>
						</VFlex>
					</VFlex>
				</VCard>

				<SubmitWrapper @submit="submit" />
			</VFlex>
		</VFlex>
	</VFlex>
</template>

<script lang="ts">
	import { defineComponent, ref, watch } from 'vue';
	import { useRouter } from 'vue-router';

	import SubmitWrapper from '@/components/SubmitWrapper.vue';

	import { GameDescriptor, gameDescriptors } from '@/assets/games';
	import { VFlex, VCard, VButton, VInput } from '@corioders/vueui';

	import { Floor, getFloors, getLocations, setFloors, Location, Locations } from './firebase';

	function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): void {
		let element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	}

	export default defineComponent({
		name: 'Home',
		components: {
			VFlex,
			VCard,
			VButton,
			VInput,
			SubmitWrapper,
		},
		setup() {
			const inputFloorName = ref('');

			const selectedGame = ref<GameDescriptor | null>(null);
			const selectedLocation = ref<string | null>(null);
			function areValidSelected(): boolean {
				if (selectedGame.value === null) {
					alert('Prosza obrać grę...');
					return false;
				}

				if (selectedLocation.value === null) {
					alert('Prosza obrać lokalilację...');
					return false;
				}

				return true;
			}

			const locations = ref<Locations>({});
			const locationsLoaded = ref<boolean>(false);
			getLocations().then((l) => {
				locations.value = l;
				locationsLoaded.value = true;
			});

			const floors = ref<Floor[]>([]);
			const floorsLoaded = ref<boolean>(false);
			const loadFloors = async (): Promise<void> => {
				inputFloorName.value = '';
				floorsLoaded.value = false;

				if (selectedGame.value === null || selectedLocation.value === null) return;

				floors.value = await getFloors(selectedLocation.value, selectedGame.value.name);
				floorsLoaded.value = true;
			};

			watch(selectedLocation, loadFloors);
			watch(selectedGame, loadFloors);

			function addFloor(): void {
				if (!areValidSelected()) return;
				if (inputFloorName.value === '') {
					alert('Prosza nazwać piętro...');
					return;
				}

				floors.value.unshift({ name: inputFloorName.value, puzzleIDs: [] });
				inputFloorName.value = '';
			}

			const modifyFloor = {
				up: (floor: Floor): void => {
					const fromIndex = floors.value.indexOf(floor);
					const toIndex = fromIndex - 1;
					if (toIndex < 0) {
						alert('Piętro je na samyj gorze');
						return;
					}
					arrayMove(floors.value, fromIndex, toIndex);
				},
				down: (floor: Floor): void => {
					const fromIndex = floors.value.indexOf(floor);
					const toIndex = fromIndex + 1;
					if (toIndex >= floors.value.length) {
						alert('Piętro je na samym spodku');
						return;
					}
					arrayMove(floors.value, fromIndex, toIndex);
				},
				remove: (floor: Floor): void => {
					floors.value.splice(floors.value.indexOf(floor), 1);
				},
			};

			const router = useRouter();
			async function submit(): Promise<void> {
				if (!areValidSelected()) return;
				if (selectedGame.value === null || selectedLocation.value === null) return;

				await setFloors(selectedLocation.value, selectedGame.value.name, floors.value);
				router.push('/sent');
			}

			return {
				floorsLoaded,
				floors,
				inputFloorName,
				addFloor,
				gameDescriptors,
				selectedGame,
				selectedLocation,
				locations,
				locationsLoaded,
				modifyFloor,
				submit,
			};
		},
	});
</script>

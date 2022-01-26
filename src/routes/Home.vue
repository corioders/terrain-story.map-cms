<template>
	<select id="games" v-model="selectedGame" name="games">
		<option v-for="game in games" :key="game.name" :value="game">{{ game.name }}</option>
	</select>

	<VInput v-model="floorName" name="nazwa piętra" type="text" />
	<VButton @click="addFloor">dodaj piętro</VButton>

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

	<VButton class="showPopupButton" @click="showSubmitPopup = !showSubmitPopup"> Prześlij </VButton>
	<section :class="{ showSubmitPopup }">
		<p>Czy na pewno chcesz przesłać dane?</p>
		<VFlex direction="row" gap="12px" justify="flex-end">
			<VButton style="background: red" @click="submit">Tak</VButton>
			<VButton @click="showSubmitPopup = false">Anuluj</VButton>
		</VFlex>
	</section>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import games, { Game } from '@/assets/games';
	import { Floor } from '@/firebase';
	import '@/firebase';
	import { VFlex, VCard, VButton, VInput } from '@corioders/vueui';

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
		},
		setup() {
			const floors = ref<Floor[]>([]);
			const floorName = ref('');
			const selectedGame = ref<Game | null>(null);

			const showSubmitPopup = ref<boolean>(false);

			function addFloor(): void {
				if (selectedGame.value === null) {
					alert('Proszę wybrać grę...');
					return;
				}

				floors.value.unshift({ name: floorName.value, puzzleIDs: [] });
				floorName.value = '';
			}

			const modifyFloor = {
				up: (floor: Floor): void => {
					const fromIndex = floors.value.indexOf(floor);
					const toIndex = fromIndex - 1;
					if (toIndex < 0) {
						alert('Piętro jest na samej górze');
						return;
					}
					arrayMove(floors.value, fromIndex, toIndex);
				},
				down: (floor: Floor): void => {
					const fromIndex = floors.value.indexOf(floor);
					const toIndex = fromIndex + 1;
					if (toIndex >= floors.value.length) {
						alert('Piętro jest na samym dole');
						return;
					}
					arrayMove(floors.value, fromIndex, toIndex);
				},
				remove: (floor: Floor): void => {
					floors.value.splice(floors.value.indexOf(floor), 1);
				},
			};

			const router = useRouter();
			function submit(): void {
				console.log(floors.value);
				router.push('/done');
			}

			return { floors, floorName, addFloor, games, selectedGame, submit, modifyFloor, showSubmitPopup };
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

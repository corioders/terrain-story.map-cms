<template>
	<select id="games" v-model="selectedGame" name="games">
		<option v-for="game in games" :key="game.name" :value="game">{{ game.name }}</option>
	</select>

	<input v-model="floorName" type="text" />
	<button @click="addFloor">dodaj piętro</button>

	<div v-for="(floor, i) in floors" :key="`floor${i}-${floor.name}`">
		<p>{{ floor.name }}</p>
		<div v-for="puzzle in selectedGame.puzzleIDs" :key="`puzzle-${puzzle}`">
			<input :id="`puzzle_${puzzle}_${floor.name}`" v-model="floor.puzzleIDs" type="checkbox" :value="puzzle" />
			<label :for="`puzzle_${puzzle}_${floor.name}`">{{ puzzle }}</label>
		</div>
	</div>
	<button @click="submit">prześlij</button>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import games, { Game } from '@/assets/games';

	interface Floor {
		name: string;
		puzzleIDs: string[];
	}

	export default defineComponent({
		name: 'Home',
		setup() {
			const floors = ref<Floor[]>([]);
			const floorName = ref('');
			function addFloor(): void {
				floors.value.unshift({ name: floorName.value, puzzleIDs: [] });
				floorName.value = '';
			}

			const selectedGame = ref<Game>({ name: '', puzzleIDs: [] });

			const router = useRouter();
			function submit(): void {
				console.log(floors.value);
				router.push('/done');
			}

			return { floors, floorName, addFloor, games, selectedGame, submit };
		},
	});
</script>

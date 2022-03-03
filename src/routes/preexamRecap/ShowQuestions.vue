<template>
	<VSpinner v-if="!loaded" />
	<VFlex v-else gap="12px">
		<VDropdown v-model="subject" :options="['polish', 'math', 'english']" />
		<VCard v-for="question in questions" :key="question.firebaseId">
			<VFlex gap="12px">
				<p>{{ question.descriptor.question }}</p>
				<VCard v-for="(option, i) in question.descriptor.options" :key="option" :style="question.descriptor.answerIndex === i ? 'color:green;' : ''">
					{{ option }}
				</VCard>
				<VButton @click="remove(question)">Usuń</VButton>
			</VFlex>
		</VCard>
	</VFlex>
</template>

<script lang="ts">
	import { defineComponent, ref, watch } from 'vue';

	import { VButton, VCard, VDropdown, VFlex, VSpinner } from '@corioders/vueui';

	import { fetchQuestions, removeQuestion, Question, Subject } from './firebase';

	export default defineComponent({
		name: 'ShowQuestions',
		components: {
			VButton,
			VCard,
			VDropdown,
			VFlex,
			VSpinner,
		},
		setup() {
			const questions = ref<Question[]>();
			const loaded = ref(false);
			const subject = ref<Subject>('polish');

			async function remove(question: Question): Promise<void> {
				await removeQuestion(question);
				await load();
			}

			async function load(): Promise<void> {
				loaded.value = false;
				questions.value = await fetchQuestions(subject.value);
				loaded.value = true;
			}
			load();
			watch(subject, load);
			return { questions, loaded, subject, remove };
		},
	});
</script>

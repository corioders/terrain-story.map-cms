<template>
	<VCard>
		<VFlex>
			<p>Wybierz przedmiot</p>
			<VDropdown v-model="question.subject" :options="['polish', 'math', 'english']" />
		</VFlex>
	</VCard>
	<VCard>
		<VFlex gap="12px">
			<VInput v-model="question.descriptor.question" name="Pytanie" />
			<VCard>
				<VFlex gap="12px">
					<VCard v-for="i in question.descriptor.options.length" :key="`AnswerOption${i - 1}`">
						<VFlex gap="12px">
							<VInput v-model="question.descriptor.options[i - 1]" name="Odpowiedź" />
							<VRadio name="answerIndex" :value="`${i - 1}`" @input="question.descriptor.answerIndex = parseInt($event.target.value)">
								{{ i - 1 === question.descriptor.answerIndex ? 'Dobra odpowiedź' : 'Zła odpowiedź' }}
							</VRadio>
							<VButton @click="question.descriptor.options.splice(i - 1, 1)">Usuń odpowiedź</VButton>
						</VFlex>
					</VCard>
					<VButton @click="addAnswer">Dodaj odpowiedź</VButton>
					<VFlex>
						<p>HTML (raczej nie dotykać)</p>
						<VDropdown v-model="isHtmlString" :options="['false', 'true']">isHtml</VDropdown>
						<VButton @click="submit">wyślij</VButton>
						<!-- <SubmitWrapper @click="submit" /> -->
					</VFlex>
				</VFlex>
			</VCard>
		</VFlex>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import SubmitWrapper from '@/components/SubmitWrapper.vue';

	import { VButton, VCard, VDropdown, VFlex, VInput, VRadio } from '@corioders/vueui';

	import { Question, submitQuestion } from './firebase';

	export default defineComponent({
		name: 'AddQuestion',
		components: {
			// SubmitWrapper,
			VButton,
			VCard,
			VDropdown,
			VFlex,
			VInput,
			VRadio,
		},
		setup() {
			const router = useRouter();
			const isHtmlString = ref<'false' | 'true'>('false');
			const question = ref<Question>({
				subject: 'polish',
				descriptor: {
					question: '',
					options: ['', ''],
					answerIndex: 0,
					isHtml: false,
				},
			});

			function addAnswer(): void {
				question.value.descriptor.options.push('');
			}

			async function submit(): Promise<void> {
				question.value.descriptor.isHtml = Boolean(isHtmlString.value);
				await submitQuestion(question.value);
				router.push('/sent');
			}

			return { question, isHtmlString, addAnswer, submit };
		},
	});
</script>

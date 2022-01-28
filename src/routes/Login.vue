<template>
	<VInput v-model="inputEmail" name="Email" type="text" />
	<VInput v-model="inputPassword" name="Hasło" type="password" />
	<button @click="login">Zaloguj</button>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import { authenticate } from '@/firebase';
	import { VInput } from '@corioders/vueui';

	export default defineComponent({
		components: {
			VInput,
		},
		setup() {
			const inputEmail = ref('');
			const inputPassword = ref('');

			const router = useRouter();
			async function login(): Promise<void> {
				await authenticate(inputEmail.value, inputPassword.value);
				router.replace('/');
			}

			return {
				inputEmail,
				inputPassword,
				login,
			};
		},
	});
</script>

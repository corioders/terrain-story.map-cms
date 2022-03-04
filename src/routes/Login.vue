<template>
	<VInput v-model="inputEmail" name="Email" type="text" />
	<VInput v-model="inputPassword" name="Hasło" type="password" />
	<VButton @click="login">Zaloguj</VButton>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	import { authenticate } from '@/firebase/auth';
	import { VInput, VButton } from '@corioders/vueui';

	export default defineComponent({
		components: {
			VInput,
			VButton,
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

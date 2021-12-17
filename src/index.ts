import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(createPinia()).use(router);
app.mount('#root');

if (module.hot) {
	module.hot.dispose(() => {
		app.unmount();
		console.clear();
	});
	module.hot.accept();
}

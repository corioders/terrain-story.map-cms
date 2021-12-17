import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import TestHello from '@/views/Test.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: TestHello,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

export default router;

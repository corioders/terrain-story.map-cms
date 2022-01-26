import { Component } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/routes/Home.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/done',
		name: 'Done',
		component: (): Promise<Component> => import('@/routes/Done.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

export default router;

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/routes/Home.vue';
import Login from '@/routes/Login.vue';
import Sent from '@/routes/Sent.vue';
import AddFloor from '@/routes/floorMap/AddFloor.vue';
import AddLocation from '@/routes/floorMap/AddLocation.vue';

import { isAuthenticated } from '@/firebase/auth';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/add-floor',
		name: 'AddFloor',
		component: AddFloor,
	},
	{
		path: '/add-location',
		name: 'AddLocation',
		component: AddLocation,
	},
	{
		path: '/sent',
		name: 'Sent',
		component: Sent,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

router.beforeEach(async (to, _from) => {
	const isAuth = await isAuthenticated();
	if (isAuth && to.name === 'Login') return { name: 'Home' };
	else if (!isAuth && to.name !== 'Login') return { name: 'Login' };

	return true;
});

export default router;

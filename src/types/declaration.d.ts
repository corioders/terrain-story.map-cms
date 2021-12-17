// =========================================================================
// webpack env variables
declare const __IS_PRODUCTION__: boolean;

// =========================================================================
// google analytics id
declare const GTAG_ID: string;

// =========================================================================
// module declarations, so typescript will allow import them
declare module '*.vue' {
	import { Component } from 'vue';
	const component: Component;
	export default component;
}

// declare assets modules
declare module '*.scss' {
	const data: string;
	export default data;
}
declare module '*.svg' {
	const data: string;
	export default data;
}
declare module '*.png' {
	const path: string;
	export default path;
}
declare module '*.jpg' {
	const data: string;
	export default data;
}
declare module '*.webp' {
	const data: string;
	export default data;
}
declare module '*.wav' {
	const data: string;
	export default data;
}
declare module '*.mp3' {
	const data: string;
	export default data;
}

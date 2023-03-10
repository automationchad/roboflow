// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'Motis Group | Automation and Business Process Consulting',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{
					name: 'description',
					content:
						'A dev shop assisting fast growing companies with process automation and software interoperability.',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
	publicRuntimeConfig: {
		SUPABASE_URL: process.env.SUPABASE_URL,
	},
	css: ['~/assets/css/main.css'],
	modules: ['@nuxtjs/supabase'],
	vite: {
		optimizeDeps: {
			exclude: ['date-fns'],
		},
	},
	// plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});

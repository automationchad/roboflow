// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	ssr: true, // enable server-side rendering
	target: 'server', // use Node.js server environment
	app: {
		head: {
			title: 'Motis Group | Automation and Business Process Consulting App',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{
					name: 'description',
					content:
						'A boutique dev shop assisting fast growing companies with process automation and software interoperability.',
				},
			],
			script: [
				{
					src: 'https://assets.calendly.com/assets/external/widget.js',
					defer: true,
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	publicRuntimeConfig: {
		SUPABASE_URL: process.env.SUPABASE_URL,
	},
	css: ['~/assets/css/main.css'],
	modules: [
		'@nuxtjs/supabase',
		'@nuxt/image-edge',
		'@nuxtjs/color-mode',
	],
	// plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});

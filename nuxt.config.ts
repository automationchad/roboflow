// https://nuxt.com/docs/api/configuration/nuxt-config
import stripeWebhookHandler from './server/api/stripe/events/index';

export default defineNuxtConfig({
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
	serverMiddleware: [
		{ path: '/api/stripe/events', handler: stripeWebhookHandler },
	],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});

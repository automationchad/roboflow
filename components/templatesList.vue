<script setup>
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const loading = ref(true);
	const username = ref('');
	const allAccess = ref(false);
	const templates = ref([]);
	let loggedIn = ref(false);
	if (user.value) {
		loggedIn.value = true;
		let { data } = await supabase
			.from('profiles')
			.select(
				`username,
    			workspaces (
      					all_access, templates)`
			)
			.eq('id', user.value.id)

			.single();

		if (data) {
			username.value = data.username;
			allAccess.value = data.workspaces.all_access;
			templates.value = data.workspaces.templates;
		}
		loading.value = false;
	}

	
</script>

<template>
	<div class="">
		<div class="overflow-hidden py-12 sm:py-16">
			<pagination
				v-model="currPage"
				:total="products.length"
				:max-records="maxRecords"
				:title="'Integration Templates'"
			/>
			<div
				class="my-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
			>
				<div
					v-for="(product, productIdx) in productsFiltered"
					:key="product.id"
					class="group relative before:absolute before:-inset-2.5 before:rounded-[20px]"
				>
					<div
						class="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10"
					>
						<img
							:src="product.images[0].url"
							:alt="product.images[0].alt"
							class="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
					<h4
						class="mt-4 overflow-hidden truncate text-ellipsis text-sm font-medium text-slate-900 group-hover:text-indigo-600 dark:text-white"
					>
						<a :href="'/components/' + product.id" class=""
							><span class="absolute -inset-2.5 z-10"></span
							><span class="relative">{{ product.name }}</span></a
						>
					</h4>
					<p class="relative mt-1.5 text-xs font-medium text-slate-500">
						4 components
					</p>
					<p
						v-if="!templates.includes(`${product.tray_project_id}`)"
						class="pointer-events-none absolute top-3 right-3 z-10 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-30 p-1 text-white"
					>
						<span class="sr-only"
							>PNG previews only, upgrade to get the HTML.</span
						><svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							class="h-6 w-6"
						>
							<path
								d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
								stroke="#fff"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</svg>
					</p>
				</div>
				<!-- <NuxtLink
          v-for="(product, productIdx) in productsFiltered"
          :key="product.uuid"
          :to="'/template/' + product.uuid"
          class="group relative cursor-pointer text-sm"
        >
          <div
            class="relative h-72 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
          >
            <img
              v-if="product.fields.coverImage"
              :src="product.fields.coverImage[0].url"
              :alt="product.fields.coverImage[0].filename + productIdx"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div
            class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
          >
            <div
              aria-hidden="true"
              class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
            <p
              class="relative rounded bg-black/20 px-3 font-sans text-lg font-semibold text-white backdrop-blur-sm"
            >
              {{
                product.fields.price === 0
                  ? "FREE"
                  : `$${product.fields.price.toLocaleString()}`
              }}
            </p>
          </div>

          <h3
            class="mt-4 overflow-hidden truncate text-ellipsis text-sm font-medium text-gray-900 dark:text-white"
          >
            {{ product.fields.name }}
          </h3>
          <div class="mt-1 space-x-1">
            <span
              v-for="connector in product.fields.connectors.split(',')"
              :key="connector"
              class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              >{{ connector }}</span
            >
          </div>
        </NuxtLink> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['products'],
		data() {
			return {
				currPage: 0,
				maxRecords: 3,
			};
		},
		methods: {
			abbreviatedNumber(number) {
				const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
				const tier = (Math.log10(Math.abs(number)) / 3) | 0;
				if (tier === 0) {
					return number;
				}
				const suffix = SI_SYMBOL[tier];
				const scale = 10 ** (tier * 3);
				const scaled = number / scale;
				const length = scaled.toFixed(1).toString();
				const precision = length > 2 ? 1 : 0;
				return scaled.toFixed(precision) + suffix;
			},
		},
		computed: {
			productsFiltered() {
				if (this.products.length > 0) {
					return this.products.slice(
						this.currPage * this.maxRecords,
						this.currPage * this.maxRecords + this.maxRecords >
							this.products.length
							? this.products.length
							: this.currPage * this.maxRecords + this.maxRecords
					);
				} else return [];
			},
		},
	};
</script>

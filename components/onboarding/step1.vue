<template>
	<form @submit.prevent="handleSave()">
		<div class="space-y-12">
			<div class="border-b border-white/10 pb-12">
				<h2 class="text-xl font-semibold leading-7 text-white">Welcome To Motis Group</h2>
				<p class="mt-1 text-sm leading-6 text-gray-400">
					First things first. What should you be named?
				</p>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-4">
						<label
							for="username"
							class="block text-sm font-medium leading-6 text-white"
							>Username</label
						>
						<div class="mt-2">
							<div
								class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
							>
								<span
									class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
									>workcation.com/</span
								>
								<input
									type="text"
									name="username"
									id="username"
									v-model="username"
									required
									autocomplete="username"
									class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="janesmith"
								/>
							</div>
						</div>
					</div>

					
				</div>
			</div>
		</div>
		<div class="mt-6 flex items-center justify-end gap-x-6">
			
			<button
				@click="handleSave"
				type="submit"
				class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Next
			</button>
		</div>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { defineProps, defineEmits } from 'vue';

    const user = useSupabaseUser();
    const supabase = useSupabaseClient();

    const { data: userData, error: userError} = await supabase.from('User').select('*').eq('id',user.value.id).limit(1).single();

    const about = ref(userData.about);
	const emit = defineEmits(['previous', 'next']);

	const username = ref('');

	const handlePrevious = () => {
		emit('previous');
	};

	const handleSave = () => {
		if (username.value === '') return;
		emit('next');
	};

	const props = defineProps({
		formData: Object,
		saveData: Function,
	});
</script>

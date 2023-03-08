<template>
	<div class="flex">
		<div
			v-if="activity.length <= 0"
			class="relative block w-full rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<span class="block text-sm font-semibold text-gray-900"
				>No comments yet</span
			>
		</div>

		<ul role="list" class="-mb-8 w-full overflow-y-auto pr-3" v-else>
			<li
				v-for="(activityItem, activityItemIdx) in activity"
				:key="activityItem.id"
			>
				<div class="relative pb-8">
					<span
						v-if="activityItemIdx !== activity.length - 1"
						class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
						aria-hidden="true"
					/>
					<div class="relative flex items-start space-x-3">
						<div class="relative">
							<img
								class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
								:src="activityItem.imageUrl"
								alt="Motis"
							/>

							<!-- <span
								class="absolute -bottom-0.5 -right-1 rounded-full bg-white px-0.5 py-px"
							>
								<ChatBubbleLeftEllipsisIcon
									class="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span> -->
						</div>
						<div class="min-w-0 flex-1">
							<div>
								<div class="text-sm">
									<a class="font-medium text-gray-900">{{
										activityItem.data.text.startsWith(`\{`)
											? activityItem.data.text
													.substring(
														activityItem.data.text.indexOf('\{') + 1,
														activityItem.data.text.lastIndexOf('\} ---')
													)
													.split('@')[0]
											: 'Motis Group'
									}}</a>
								</div>
								<div class="flex items-center justify-between">
									<p class="mt-0.5 text-sm text-gray-500">
										Commented
										{{
											formatDistanceStrict(
												new Date(activityItem.date),
												new Date(),
												{
													addSuffix: true,
												}
											)
										}}
									</p>
									<button
										@click="
											handleDeleteComment(
												activityItem.data.card.id,
												activityItem.id
											)
										"
										v-if="
											activityItem.data.text.startsWith(
												`\{${user.email}\} ---`
											) && calculateDistance(activityItem.date)
										"
									>
										<TrashIcon class="h-4 w-4 text-gray-400" />
									</button>
								</div>
							</div>
							<div class="mt-2 text-sm text-gray-700">
								<p>
									{{ activityItem.data.text.replace(regex, '') }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import {
		ChatBubbleLeftEllipsisIcon,
		TagIcon,
		UserCircleIcon,
	} from '@heroicons/vue/20/solid';

	import { TrashIcon } from '@heroicons/vue/24/outline';

	import { formatDistanceStrict } from 'date-fns';

	const props = defineProps(['card']);
	const { card } = toRefs(props);

	const test = true;

	const emit = defineEmits(['delete-comment']);

	const user = test ? { email: 'automation@motis.group' } : useSupabaseUser();

	const auth = `key=8ec73785de7fe1ccc3f8c83aa07f85bd&token=ATTA9da8c99ddba28fd8b218a814b05c0dc3b05c7be57eb004508cc37467b6a162e914BB2F03`;

	let activity = [];
	activity = await $fetch(
		`https://api.trello.com/1/cards/${card.value.id}/actions?filter=commentCard&${auth}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	)
		.then((response) => {
			return response;
		})
		.catch((err) => console.error(err));

	activity.forEach(
		(element) =>
			(element.imageUrl = element.data.text.startsWith(`\{`)
				? 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
				: 'https://www.motis.group/_nuxt/logo.7722150c.png')
	);

	const calculateDistance = (date) => {
		var x = new Date(date);
		var y = new Date();
		let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
		return seconds < 3600;
	};
	const regex = /\{[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\} ---/;

	const calculateMessage = (text) => {};

	const handleDeleteComment = async (card, comment) => {
		const result = await $fetch(
			`https://api.trello.com/1/cards/${card}/actions/${comment}/comments?${auth}`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => {
				return response;
			})

			.catch((err) => console.error(err));
		emit('delete-comment');
		return result;
	};
</script>

<!-- <script>
	export default {
		props: ['activity'],
	};
</script> -->

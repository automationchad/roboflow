<script setup>
	import { format } from 'date-fns';
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();

	const userAvatar = ref('');

	const { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Ticket(*,Comment(count))')
		.eq('id', route.params.user)
		.limit(1)
		.single();

	const getAvatarUrl = async (avatar) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from('avatars').list(`${avatar}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${avatar}`,
		});

		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('avatars')
				.getPublicUrl(`/${avatar}/${File.name}`);

			return publicUrl;
		} else return '';
	};

	userAvatar.value = await getAvatarUrl(route.params.user);
</script>

<template>
	<div>
		<div data-v-6d8b9779="" data-v-6273df6e="" class="px-4 py-12">
			<div data-v-6d8b9779="" class="grid grid-cols-12 items-start gap-10">
				<div
					data-v-27a96f09=""
					data-v-6d8b9779=""
					class="war-room-profile-hero relative col-span-3 overflow-hidden rounded-md border border-white/20 bg-black px-6 pb-6 pt-8"
				>
					<div
						data-v-27a96f09=""
						class="war-room-profile-hero__image absolute left-0 top-0 h-48 w-full overflow-hidden"
					>
						<img
							data-v-27a96f09=""
							srcset="
								https://static-prod.bravado.co/nuxt/img/matterhorn.53eface.png    1x,
								https://static-prod.bravado.co/nuxt/img/matterhorn@2x.5671dbe.png 2x
							"
							class="war-room-profile-hero__picture min-h-full w-full object-cover"
						/>
					</div>
					<!---->
					<div
						data-v-27a96f09=""
						class="war-room-profile-hero__user relative text-center"
					>
						<a
							data-v-2a888f68=""
							data-v-27a96f09=""
							target="_self"
							class="war-room-profile-hero__avatar avatar avatar--non-empty avatar--next-big"
							><!---->
							<img
								data-v-2a888f68=""
								:src="userAvatar"
								width="104"
								height="104"
								alt="Th"
								title="Th"
								class="avatar__img" />
							<div data-v-2a888f68="" class="avatar__img-ring"></div
						></a>
						<div
							data-v-27a96f09=""
							data-test="war_room_profile_username"
							class="war-room-profile-hero__username"
						>
							{{ User.firstName }} {{ User.lastName }}
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__position"
							class="war-room-profile-hero__position"
						>
							{{ User.companyName }}
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__info_location"
							class="war-room-profile-hero__info"
						>
							{{ User.country }}
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__info_experience"
							class="war-room-profile-hero__info"
						>
							10+ years in sales
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__info_joined"
							class="war-room-profile-hero__info"
						>
							Joined {{ format(new Date(User.createdOn), 'MMMM yyyy') }}
						</div>
					</div>
					<div data-v-27a96f09="" class="war-room-profile-hero__flag-issue">
						<button
							data-v-488290e8=""
							data-v-27a96f09=""
							data-test="war-room-profile-hero__flag-issue-btn"
							class="war-room-profile-hero__flag-issue-btn bravado-button-v3 bravado-button-v3--md bravado-button-v3--blank"
						>
							<span data-v-488290e8="" class="bravado-button-v3__content"
								><!---->
								<!---->
								<svg
									data-v-27a96f09=""
									data-v-488290e8=""
									width="100%"
									height="100%"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="war-room-profile-hero__flag-issue-icon"
								>
									<path
										data-v-27a96f09=""
										data-v-488290e8=""
										d="M9.33337 3.99996L8.85337 3.03329C8.74004 2.80663 8.50671 2.66663 8.25337 2.66663H4.00004C3.63337 2.66663 3.33337 2.96663 3.33337 3.33329V13.3333C3.33337 13.7 3.63337 14 4.00004 14C4.36671 14 4.66671 13.7 4.66671 13.3333V9.33329H8.00004L8.48004 10.3C8.59337 10.5266 8.82671 10.6666 9.07337 10.6666H12.6667C13.0334 10.6666 13.3334 10.3666 13.3334 9.99996V4.66663C13.3334 4.29996 13.0334 3.99996 12.6667 3.99996H9.33337ZM12 9.33329H9.33337L8.66671 7.99996H4.66671V3.99996H8.00004L8.66671 5.33329H12V9.33329Z"
										fill="currentColor"
									></path>
								</svg>
								<div
									data-v-36b23d8c=""
									data-v-27a96f09=""
									class="bravado-text--subhead"
									data-v-488290e8=""
								>
									Report
								</div>
								<!----></span
							>
						</button>
					</div>
					<!---->
				</div>
				<div data-v-6d8b9779="" class="col-span-9">
					<div
						data-v-25f4147c=""
						data-v-6d8b9779=""
						class="war-room-profile-section war-room-profile__section"
						data-test="war-room-profile__section_profile"
					>
						<div data-v-25f4147c="" class="war-room-profile-section__head">
							<div
								data-v-25f4147c=""
								data-test="title-text"
								class="war-room-profile-section__title"
							>
								About
							</div>
							<!---->
						</div>
						<div
							data-v-25f4147c=""
							class="war-room-profile-section__content war-room-profile-section__content--wrapped bg-white/5"
						>
							<div
								data-v-046fbd8c=""
								data-v-6d8b9779=""
								class="war-room-profile-about"
								data-v-25f4147c=""
							>
								<div
									data-v-36b23d8c=""
									data-v-046fbd8c=""
									data-test="war-room-profile-about__title"
									class="war-room-profile-about__title bravado-text--header5"
								>
									Results driven biz dev guy.
								</div>
								<div data-v-046fbd8c="">
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										class="war-room-profile-about__label bravado-text--subhead"
									>
										Products I've sold
									</div>
									<!---->
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										it asset management
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										software license management
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Business Instant Messaging Software
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										AI Sales Assistant Software
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Mechanical or Industrial Engineering
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Computer-Aided Engineering (CAE) Software
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Adobe Channel Partners
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Liazon
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__products_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										zoominfo
									</div>
								</div>
								<div data-v-046fbd8c="">
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										class="war-room-profile-about__label bravado-text--subhead"
									>
										Departments I've sold into
									</div>
									<!---->
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										IT / Security / DevOps
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										HR / Recruiting
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Finance
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Other
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Sales
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Engineering
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Operations
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__department_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Marketing
									</div>
								</div>
								<div data-v-046fbd8c="">
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										class="war-room-profile-about__label bravado-text--subhead"
									>
										Sales roles I've held
									</div>
									<!---->
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__roles_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										account executive
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__roles_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										director of business development
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__roles_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										sdr
									</div>
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										data-test="war-room-profile-about__roles_value"
										class="war-room-profile-about__value bravado-text--subhead"
									>
										Entrepreneur
									</div>
								</div>
								<div data-v-046fbd8c="">
									<div
										data-v-36b23d8c=""
										data-v-046fbd8c=""
										class="war-room-profile-about__label bravado-text--subhead"
									>
										Stages of companies I've sold for
									</div>
									<div data-v-046fbd8c="" class="war-room-profile-about__value">
										-
									</div>
								</div>
							</div>
						</div>
					</div>
					<!---->
					<div
						data-v-25f4147c=""
						data-v-6d8b9779=""
						class="war-room-profile-section war-room-profile__section mt-10"
						data-test="war-room-profile__section_badges "
					>
						<div data-v-25f4147c="" class="war-room-profile-section__head">
							<div
								data-v-25f4147c=""
								data-test="title-text"
								class="war-room-profile-section__title"
							>
								Badges
							</div>
							<NuxtLink
								data-v-488290e8=""
								data-v-25f4147c=""
								href="/war-room/profile/TheSalesQB/badges"
								class="bravado-button-v3 bravado-button-v3--sm bravado-button-v3--blank"
								:to="`${route.params.user}/badges`"
								><span data-v-488290e8="" class="bravado-button-v3__content">
									Show all badges
								</span></NuxtLink
							>
						</div>
						<div
							data-v-25f4147c=""
							class="war-room-profile-section__content war-room-profile-section__content--wrapped bg-white/5"
						>
							<div
								data-v-4bf48afe=""
								data-v-6d8b9779=""
								class="war-room-profile-badges"
								data-v-25f4147c=""
							>
								<div data-v-4bf48afe="" class="war-room-profile-badges__list">
									<div
										v-for="badge in User.badges"
										:key="badge.id"
										data-v-75e98699=""
										data-v-4bf48afe=""
										:class="[
											badge.id,
											'war-room-profile-badges__item war-room-achievement war-room-achievement--silver war-room-achievement--medium rounded-md px-2',
										]"
									>
										<div
											data-v-75e98699=""
											class="war-room-achievement__border-overlay"
										></div>
										<div
											data-v-75e98699=""
											class="war-room-achievement__container"
										>
											<div
												data-v-75e98699=""
												:class="[
													`${badge.id}-text`,
													'war-room-achievement__text text-base font-medium',
												]"
											>
												{{ badge.text }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-25f4147c=""
						data-v-6d8b9779=""
						class="war-room-profile-section war-room-profile__section mt-10"
						data-test="war-room-profile__section_about"
					>
						<div data-v-25f4147c="" class="war-room-profile-section__head">
							<div
								data-v-25f4147c=""
								data-test="title-text"
								class="war-room-profile-section__title"
							>
								Posts
							</div>
							<!---->
						</div>
						<div data-v-25f4147c="" class="war-room-profile-section__content">
							<div class="flex flex-col space-y-4" id="posts">
								<NuxtLink
									data-v-af541410=""
									data-v-09d28134=""
									v-for="ticket in User.Ticket"
									:key="ticket.id"
									:to="`/${ticket.accountId}/tickets/${ticket.id}`"
									class="war-room-post-preview-presenter war-room-profile-posts__preview bg-white/5"
								>
									<div
										data-v-af541410=""
										data-test="post-preview-rating"
										class="war-room-post-preview-presenter__rating"
									>
										<svg
											data-v-af541410=""
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											data-test="post_preview_vote_up"
											class="war-room-post-preview-presenter__rate"
										>
											<path
												data-v-af541410=""
												d="M11.8065 7.52664L8.47313 4.1933C8.40973 4.13261 8.33497 4.08503 8.25313 4.0533C8.09082 3.98663 7.90877 3.98663 7.74646 4.0533C7.66463 4.08503 7.58987 4.13261 7.52646 4.1933L4.19313 7.52664C4.13097 7.5888 4.08167 7.66259 4.04803 7.74381C4.01438 7.82502 3.99707 7.91207 3.99707 7.99997C3.99707 8.17751 4.0676 8.34777 4.19313 8.47331C4.31867 8.59884 4.48893 8.66937 4.66646 8.66937C4.844 8.66937 5.01426 8.59884 5.1398 8.47331L7.33313 6.2733V11.3333C7.33313 11.5101 7.40337 11.6797 7.52839 11.8047C7.65342 11.9297 7.82299 12 7.9998 12C8.17661 12 8.34618 11.9297 8.4712 11.8047C8.59623 11.6797 8.66646 11.5101 8.66646 11.3333V6.2733L10.8598 8.47331C10.9218 8.53579 10.9955 8.58539 11.0767 8.61923C11.158 8.65308 11.2451 8.6705 11.3331 8.6705C11.4211 8.6705 11.5083 8.65308 11.5895 8.61923C11.6708 8.58539 11.7445 8.53579 11.8065 8.47331C11.8689 8.41133 11.9185 8.3376 11.9524 8.25636C11.9862 8.17512 12.0037 8.08798 12.0037 7.99997C12.0037 7.91196 11.9862 7.82483 11.9524 7.74359C11.9185 7.66235 11.8689 7.58861 11.8065 7.52664Z"
												fill="currentColor"
											></path>
										</svg>
										12
										<svg
											data-v-af541410=""
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											data-test="post_preview_vote_down"
											class="war-room-post-preview-presenter__rate"
										>
											<path
												data-v-af541410=""
												d="M11.8065 7.52667C11.7445 7.46418 11.6708 7.41459 11.5895 7.38074C11.5083 7.34689 11.4211 7.32947 11.3331 7.32947C11.2451 7.32947 11.158 7.34689 11.0767 7.38074C10.9955 7.41459 10.9218 7.46418 10.8598 7.52667L8.66646 9.72667V4.66667C8.66646 4.48986 8.59623 4.32029 8.4712 4.19526C8.34618 4.07024 8.17661 4 7.9998 4C7.82299 4 7.65342 4.07024 7.52839 4.19526C7.40337 4.32029 7.33313 4.48986 7.33313 4.66667V9.72667L5.1398 7.52667C5.01426 7.40113 4.844 7.33061 4.66646 7.33061C4.48893 7.33061 4.31867 7.40113 4.19313 7.52667C4.0676 7.6522 3.99707 7.82247 3.99707 8C3.99707 8.17753 4.0676 8.3478 4.19313 8.47333L7.52646 11.8067C7.58987 11.8674 7.66463 11.9149 7.74646 11.9467C7.82626 11.9819 7.91255 12.0002 7.9998 12.0002C8.08704 12.0002 8.17333 11.9819 8.25313 11.9467C8.33497 11.9149 8.40973 11.8674 8.47313 11.8067L11.8065 8.47333C11.8689 8.41136 11.9185 8.33762 11.9524 8.25638C11.9862 8.17515 12.0037 8.08801 12.0037 8C12.0037 7.91199 11.9862 7.82486 11.9524 7.74362C11.9185 7.66238 11.8689 7.58864 11.8065 7.52667Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div
										data-v-af541410=""
										class="war-room-post-preview-presenter__info-container"
									>
										<!---->
										<div
											data-v-af541410=""
											class="war-room-post-preview-presenter__info-row"
										>
											<div
												data-v-af541410=""
												class="war-room-post-preview-presenter__info"
											>
												<a
													data-v-af541410=""
													href="/war-room/posts/epic-exit-strategy"
													class="war-room-post-preview-presenter__title"
													data-test="post_preview_title"
													><span
														data-v-af541410=""
														class="war-room-post-preview-presenter__new-post-icon"
													></span>
													<!---->
													<h2
														data-v-36b23d8c=""
														data-v-af541410=""
														class="war-room-post-preview-presenter__post-title bravado-text--headline-semibold"
													>
														{{ ticket.name }}
													</h2></a
												>
												<div
													data-v-af541410=""
													class="war-room-post-preview-presenter__tags"
												>
													<div
														data-v-4563c23e=""
														data-v-af541410=""
														class="war-room-post-preview-presenter__topic war-room-category-badge"
														data-test="post_preview_topic"
														style="background: rgb(188, 219, 223)"
													>
														<span
															data-v-4563c23e=""
															data-test="post_preview_category"
															class="war-room-category-badge__link capitalize"
															><!---->
															<span data-v-4563c23e="">{{
																ticket.type
															}}</span></span
														>
													</div>

													<div
														data-v-af541410=""
														class="war-room-post-preview-presenter__tag"
													>
														<svg
															data-v-af541410=""
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															class="war-room-post-preview-presenter__icon text-white"
														>
															<path
																data-v-af541410=""
																d="M7.99991 1.33331C7.12443 1.33331 6.25752 1.50575 5.44869 1.84078C4.63985 2.17581 3.90492 2.66688 3.28587 3.28593C2.03562 4.53618 1.33324 6.23187 1.33324 7.99998C1.32742 9.5394 1.86044 11.0323 2.83991 12.22L1.50658 13.5533C1.41407 13.6471 1.35141 13.7661 1.32649 13.8954C1.30158 14.0248 1.31552 14.1586 1.36658 14.28C1.42195 14.3999 1.51171 14.5007 1.62448 14.5696C1.73724 14.6384 1.86791 14.6722 1.99991 14.6666H7.99991C9.76802 14.6666 11.4637 13.9643 12.714 12.714C13.9642 11.4638 14.6666 9.76809 14.6666 7.99998C14.6666 6.23187 13.9642 4.53618 12.714 3.28593C11.4637 2.03569 9.76802 1.33331 7.99991 1.33331ZM7.99991 13.3333H3.60658L4.22658 12.7133C4.35074 12.5884 4.42044 12.4194 4.42044 12.2433C4.42044 12.0672 4.35074 11.8982 4.22658 11.7733C3.35363 10.9013 2.81003 9.75367 2.68837 8.52584C2.56672 7.29801 2.87454 6.06598 3.5594 5.03966C4.24425 4.01334 5.26377 3.25622 6.44425 2.89729C7.62474 2.53837 8.89315 2.59985 10.0334 3.07126C11.1736 3.54266 12.1151 4.39483 12.6975 5.48257C13.2799 6.57032 13.4672 7.82634 13.2273 9.03665C12.9875 10.247 12.3354 11.3367 11.3823 12.1201C10.4291 12.9036 9.23375 13.3323 7.99991 13.3333Z"
																fill="currentColor"
															></path>
														</svg>
														{{ ticket.Comment[0].count }}
														<!---->
													</div>
													<!---->
												</div>
											</div>
											<!---->
											<!---->
										</div>
										<div
											data-v-af541410=""
											class="war-room-post-preview-presenter__info-row"
										>
											<!---->
											<!---->
										</div>
									</div>
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.ai_shadow {
		box-shadow: inset 0px -5px 20px 0 rgba(150, 67, 255, 0.15);
		border: 1px solid rgba(201, 150, 255, 0.16);
	}
	:deep p a {
		color: #9382ff;
	}
	.mg_admin {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#f0f1f6 0deg,
			#a0b9cc 90deg,
			#dde5f0 180deg,
			#c5e6f9 234.26deg,
			#a7b5bb 270deg,
			#ecf1f4 1turn
		);
		border: solid 1px rgba(255, 255, 255, 0.3);
		color: #000000ab;
	}

	.badge-extra {
		font-size: 10px;
	}

	.mg_ai {
		color: transparent;
		background: #2a004f;
		border: 1px solid #aa00eda0;

		transition: 0.3s cubic-bezier(0.6, 0.6, 0, 1) opacity,
			0.3s cubic-bezier(0.6, 0.6, 0, 1) transform;
	}

	.mg_ai-text {
		animation: hue-rotate 3s ease-in-out infinite;
		background: linear-gradient(135deg, #aa00ed 0%, #2fe3fe 50%, #8900ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		background-size: 200% 100%;

		-webkit-text-fill-color: transparent;
	}

	.war-room-post-preview-presenter {
		padding: 10px 10px 10px 12px;

		box-shadow: 0px 0px 1px hsla(0, 0%, 100%, 0.35),
			0px 1px 2px hsla(0, 0%, 100%, 0.1);
		transition: box-shadow 0.3s ease-in-out;
		border-radius: 8px;
		display: flex;
		align-items: flex-start;
		position: relative;
	}

	.war-room-post-preview-presenter--pinned {
		background: var(--theme-color-highlight);
		border: 1px solid var(--universal-color-gold);
	}

	.war-room-post-preview-presenter__container {
		display: flex;
		align-items: flex-start;
		position: relative;
	}

	.war-room-post-preview-presenter__link {
		text-decoration: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.war-room-post-preview-presenter__rating {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		font-weight: 600;
		margin-right: 16px;
		flex-shrink: 0;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.war-room-post-preview-presenter__rating--upvoted {
		color: white;
	}

	.war-room-post-preview-presenter__rating--downvoted {
		color: red;
	}

	.war-room-post-preview-presenter__rate {
		cursor: pointer;
		color: white;
		opacity: 0.3;
		transition: opacity 0.2s;
	}

	.war-room-post-preview-presenter__rate--upvoted {
		color: white;
		opacity: 1;
	}

	.war-room-post-preview-presenter__rate--downvoted {
		color: red;
		opacity: 1;
	}

	.war-room-post-preview-presenter__rate:hover {
		opacity: 1;
	}

	.war-room-post-preview-presenter__info-row {
		display: flex;
	}

	.war-room-post-preview-presenter__members-label-row {
		margin-bottom: 8px;
	}

	.war-room-post-preview-presenter__info-container {
		flex: 1;
		width: calc(100% - 32px);
	}

	.war-room-post-preview-presenter__info {
		flex: 1;
	}

	.war-room-post-preview-presenter__new-post-icon {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: white;
		display: inline-block;
		margin-right: 8px;
		flex-shrink: 0;
		margin-top: 10px;
	}

	.war-room-post-preview-presenter__title {
		display: flex;
		color: white;
		text-decoration: none;
	}

	.war-room-post-preview-presenter__title--deal {
		flex-direction: column;
	}

	.war-room-post-preview-presenter__post-title {
		word-break: break-word;
	}

	.war-room-post-preview-presenter__tags {
		display: inline-flex;
		align-items: center;
		position: relative;
		z-index: 3;
		flex-wrap: wrap;
	}

	.war-room-post-preview-presenter__tag-text {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		font-weight: 600;
		color: white;
		opacity: 0.7;
	}

	.war-room-post-preview-presenter__tag {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		font-weight: 600;
		text-decoration: none;
		display: flex;
		align-items: center;
		margin-top: 8px;
		margin-right: 8px;
		padding: 2px 5px;
		color: white;
		border-radius: 4px;
		border: 1px solid var(--theme-color-border);
		cursor: pointer;
		transition: border 0.3s, color 0.3s;
	}

	.war-room-post-preview-presenter__tag:hover {
		color: var(--theme-sub_text-hover);
		border: 1px solid var(--theme-border-hover);
	}

	.war-room-post-preview-presenter__topic {
		margin: 8px 8px 0 0;
	}

	.war-room-post-preview-presenter__icon {
		margin-right: 6px;
	}

	 .war-room-post-preview-presenter__menu {
		line-height: 0;
		color: var(--theme-color-sub-text);
		margin: 5px 0 0 10px;
		position: relative;
		z-index: 2;
	}

	 .war-room-post-preview-presenter__menu:hover {
		color: var(--theme-sub_text-hover);
	}

	.war-room-post-preview-presenter__pinned-icon {
		margin-right: 3px;
		vertical-align: middle;
		color: var(--universal-color-gold);
	}

	.war-room-post-preview-presenter__new-comments {
		font-size: 9px;
		line-height: 1.33;
		color: white;
		margin-left: 6px;
		padding: 0 4px;
		line-height: 16px;
		background: white;
		border-radius: 4px;
	}

	.war-room-post-preview-presenter__deal-header {
		display: flex;
		align-items: center;
		position: relative;
		z-index: 3;
	}

	.war-room-post-preview-presenter__deal-content {
		margin-top: 8px;
		display: flex;
	}

	.war-room-post-preview-presenter__deal-story {
		display: grid;
		grid-template-areas: 'avatar title' 'preview preview';
		grid-template-columns: 22px 1fr;
		grid-column-gap: 4px;
		grid-row-gap: 10px;
		align-items: flex-start;
	}

	.war-room-post-preview-presenter__deal-story-preview {
		grid-area: preview;
	}

	.war-room-post-preview-presenter__avatar-wrapper {
		padding-top: 2px;
	}

	.war-room-post-preview-presenter__deal-avatar {
		margin-right: 4px;
	}

	.war-room-post-preview-presenter__poll {
		margin-top: 10px;
		margin-left: -32px;
		position: relative;
		z-index: 2;
		overflow: hidden;
	}

	@media only screen and (min-width: 768px) {
		.war-room-post-preview-presenter__poll {
			margin-left: 0;
		}
	}

	.war-room-post-preview-presenter__poll--not-logged {
		pointer-events: none;
	}

	.war-room-post-preview-presenter__commenters {
		display: flex;
		padding-top: 10px;
		align-items: center;
	}

	.war-room-post-preview-presenter__commenter {
		border: 1px solid white;
	}

	.war-room-post-preview-presenter__commenter:not(
			:first-child
		) {
		margin-left: -5px;
	}

	.war-room-post-preview-presenter__extra-commenters-count {
		border-radius: 16px;
		border: 1px solid white;
		background: var(--theme-color-border);
		color: white;
		height: 18px;
		padding: 3px;
		margin-left: -5px;
		z-index: 1;
		position: relative;
		display: flex;
	}

	.war-room-category-badge-topic__cell[data-v-0d6073a6] {
		position: relative;
		display: inline-flex;
		height: 16px;
	}

	.war-room-category-badge-topic__tooltip[data-v-0d6073a6] {
		position: absolute;
		bottom: -3px;
		left: 50%;
		transform: translate(-50%, 100%);
		border-radius: 6px;
		background: var(--universal-color-gray-80);
		padding: 3px 6px 4px;
		opacity: 0;
		will-change: opacity;
		transition: opacity 0.1s ease-in-out;
	}

	.war-room-category-badge-topic__tooltip-arrow[data-v-0d6073a6] {
		position: absolute;
		top: 1px;
		left: 50%;
		transform: translate(-50%, -100%);
	}

	.war-room-category-badge-topic__tooltip-info[data-v-0d6073a6] {
		font-size: 11px;
		line-height: 1.273;
		font-weight: 600;
		color: white;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}

	.war-room-category-badge-topic__link[data-v-0d6073a6] {
		font-family: var(--font-family-emoji);
		font-size: 13px;
		text-decoration: none;
		line-height: 1.2;
	}

	.war-room-category-badge-topic__link:hover
		~ .war-room-category-badge-topic__tooltip[data-v-0d6073a6] {
		opacity: 1;
	}

	.war-room-category-badge-topic__topic-name[data-v-0d6073a6] {
		display: none;
		font-family: var(--font-family);
	}

	.svg-gradient {
		width: 24px;
		height: 24px;
		background: linear-gradient(to bottom, #7000ff, #00c2ff);
		-webkit-mask: url(#mask) center / contain no-repeat;
		mask: url(#mask) center / contain no-repeat;
	}

	@keyframes hue-rotate {
		0% {
			background-position: 0%;
		}
		100% {
			background-position: 200%;
		}
	}

	.member {
		background: linear-gradient(
			0.311turn,
			#cf9a8c,
			#eabcb1 24.38%,
			#f5c9c0 50%,
			#eabcb1 77.15%,
			#cf9a8c
		);
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
	}

	.mg_officer {
		background: linear-gradient(
			0.311turn,
			#e3bc5a,
			#e9d8ab 25%,
			#f4e9c4 50%,
			#e9d8ab 75%,
			#e3bc5a
		);
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
	}

	.partner {
		background: linear-gradient(
			0.311turn,
			#e3bc5a,
			#e9d8ab 25%,
			#f4e9c4 50%,
			#e9d8ab 75%,
			#e3bc5a
		);
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
	}
	.war-room-profile-section__content--wrapped[data-v-25f4147c] {
		padding: 24px;

		box-shadow: 0px 0px 1px hsla(0, 0%, 100%, 0.35),
			0px 1px 2px hsla(0, 0%, 100%, 0.1);
		border-radius: 8px;
	}

	.war-room-profile-section__content[data-v-25f4147c] {
		position: relative;
		margin-top: 8px;
	}

	@media only screen and (min-width: 768px) .war-room-profile-about[data-v-046fbd8c] {
		grid-template-columns: repeat(2, 1fr);
	}

	.war-room-profile-about[data-v-046fbd8c] {
		display: grid;
		grid-gap: 16px;
		grid-template-columns: 1fr;
	}

	.war-room-profile-badges__item[data-v-4bf48afe] {
		margin: 0 8px 8px 0;
	}

	@media only screen and (min-width: 768px) .war-room-profile-about__title[data-v-046fbd8c] {
		grid-column: 1/3;
	}

	.war-room-profile-about__title[data-v-046fbd8c] {
		color: white;
		word-break: break-word;
	}
	.bravado-text--header5[data-v-36b23d8c] {
		font-weight: 600;
		font-size: 20px;
		line-height: 1.4;
		letter-spacing: -0.3px;
	}
	.war-room-profile-hero__image[data-v-27a96f09]:after {
		content: '';
		position: absolute;
		background: linear-gradient(180deg, transparent, #000);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.war-room-profile-badges__list[data-v-4bf48afe] {
		display: flex;
		flex-wrap: wrap;
		margin: -8px -8px -16px;
	}

	.avatar[data-v-2a888f68] {
		position: relative;
		width: 64px;
		height: 64px;
		background-color: white;
		border-radius: 50%;
		flex-shrink: 0;
		overflow: hidden;
		color: var(--theme-color-sub-text);
		font-size: 12px;
		line-height: 1.33;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		text-transform: uppercase;
	}

	.avatar--next-big[data-v-2a888f68] {
		width: 104px;
		height: 104px;
		font-size: 33px;
		letter-spacing: -1px;
		line-height: 104px;
	}

	.avatar--non-empty[data-v-2a888f68] {
		background: none;
		border: 1px solid var(--universal-color-transparent-20);
	}

	.war-room-profile-hero__avatar[data-v-27a96f09] {
		display: inline-block;
		background: var(--universal-color-gray-80);
	}

	.avatar > img[data-v-2a888f68],
	.avatar__img[data-v-2a888f68] {
		max-width: none;
		position: relative;
		-o-object-fit: cover;
		object-fit: cover;
		width: 100%;
		min-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar__img-ring[data-v-2a888f68] {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		opacity: 0.1;
		border: 1px solid gray;
		pointer-events: none;
		border-radius: 50%;
	}

	.war-room-profile-hero__position[data-v-27a96f09],
	.war-room-profile-hero__username[data-v-27a96f09] {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: white;
	}

	.war-room-profile-hero__username[data-v-27a96f09] {
		font-size: 17px;
		line-height: 1.4117;
		font-weight: 600;
		margin-top: 24px;
	}

	.war-room-profile-hero__position[data-v-27a96f09] {
		font-size: 15px;
		line-height: 1.6;
		font-weight: 400;
		font-weight: 600;
		margin-top: 8px;
	}

	.war-room-profile-hero__position[data-v-27a96f09],
	.war-room-profile-hero__username[data-v-27a96f09] {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: white;
	}

	.war-room-profile-hero__info[data-v-27a96f09] {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		margin-top: 8px;
		color: gray;
	}

	.war-room-profile-hero__info[data-v-27a96f09] {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		margin-top: 8px;
		color: gray;
	}

	.war-room-profile-hero__info[data-v-27a96f09] {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
		margin-top: 8px;
		color: gray;
	}

	.war-room-profile-hero__flag-issue[data-v-27a96f09] {
		text-align: center;
		margin-top: 12px;
	}

	.bravado-button-v3--md[data-v-488290e8]:not(.bravado-button-v3--icon) {
		padding: 12px 16px;
	}

	.war-room-profile-hero__flag-issue-btn[data-v-27a96f09] {
		color: gray;
	}
	.bravado-button-v3--blank[data-v-488290e8] {
		background-color: transparent;
		color: gray;
	}
	.bravado-button-v3--md[data-v-488290e8] {
		font-size: 15px;
		line-height: 1.6;
		font-weight: 400;
		font-weight: 600;
		padding: 12px;
	}
	.bravado-button-v3[data-v-488290e8] {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: none;
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition-timing-function: ease-in-out;
		transition-duration: 0.2s;
		transition-property: color, background-color, border-color, box-shadow;
		padding: 0;
		box-sizing: border-box;
		border-radius: 12px;
	}

	.bravado-button-v3__content[data-v-488290e8] {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
	}

	.war-room-profile-hero__flag-issue-icon[data-v-27a96f09] {
		margin-right: 6px;
		width: 17px;
		height: 17px;
	}

	.bravado-text--subhead-semibold[data-v-36b23d8c],
	.bravado-text--subhead[data-v-36b23d8c] {
		font-size: 13px;
		line-height: 1.5384;
		font-weight: 400;
	}

	@media only screen and (min-width: 768px) .war-room-profile__section[data-v-6d8b9779] {
		margin-top: 0;
	}

	.war-room-profile-section__head[data-v-25f4147c] {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.war-room-profile-section__title[data-v-25f4147c] {
		font-size: 15px;
		line-height: 1.6;
		font-weight: 400;
		font-weight: 600;
		color: white;
	}
</style>

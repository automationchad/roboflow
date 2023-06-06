<style scoped>
	

	

	.war-room-profile-section__title {
		font-size: 15px;
		line-height: 1.6;
		font-weight: 400;
		font-weight: 600;
		color: gray;
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

	.avatar[data-v-2a888f68] {
		position: relative;
		width: 64px;
		height: 64px;
		background-color: var(--theme-color-over-card);
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

</style>

<template>
	<div>
		<div data-v-6d8b9779="" data-v-6273df6e="" class="px-24 py-12">
			<div data-v-6d8b9779="" class="grid grid-cols-12 items-start">
				<div
					data-v-27a96f09=""
					data-v-6d8b9779=""
					class="war-room-profile-hero relative col-span-2 overflow-hidden rounded-md border border-white/20 bg-black px-6 pb-6 pt-8"
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
								src="https://res.cloudinary.com/bravado/image/fetch/f_auto,q_auto:best,c_fill,e_sharpen:100,w_104,h_104/https://static-production.bravado.co/users/war_room_avatars/000/048/043/original/PB_Cell.jpg%3F1644525969"
								width="104"
								height="104"
								alt="Th"
								srcset="
									https://res.cloudinary.com/bravado/image/fetch/f_auto,q_auto:best,c_fill,e_sharpen:100,w_104,h_104,dpr_1.0/https://static-production.bravado.co/users/war_room_avatars/000/048/043/original/PB_Cell.jpg%3F1644525969 1x,
									https://res.cloudinary.com/bravado/image/fetch/f_auto,q_auto:best,c_fill,e_sharpen:100,w_104,h_104,dpr_2.0/https://static-production.bravado.co/users/war_room_avatars/000/048/043/original/PB_Cell.jpg%3F1644525969 2x
								"
								title="Th"
								class="avatar__img" />
							<div data-v-2a888f68="" class="avatar__img-ring"></div
						></a>
						<div
							data-v-27a96f09=""
							data-test="war_room_profile_username"
							class="war-room-profile-hero__username"
						>
							TheSalesQB
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__position"
							class="war-room-profile-hero__position"
						>
							The Sales QB
						</div>
						<div
							data-v-27a96f09=""
							data-test="war-room-profile-hero__info_location"
							class="war-room-profile-hero__info"
						>
							New York, NY, United States of America
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
							Joined September 2020
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
				<div data-v-6d8b9779="col-span-9 bg-red-400">
					<div
						data-v-25f4147c=""
						data-v-6d8b9779=""
						class="war-room-profile-section war-room-profile__section "
						data-test="war-room-profile__section_profile"
					>
						<div data-v-25f4147c="" class="war-room-profile-section__head">
							<div
								data-v-25f4147c=""
								data-test="title-text"
								class="war-room-profile-section__title bg-red-500"
							>
								About
							</div>
							<!---->
						</div>
						<div
							data-v-25f4147c=""
							class="war-room-profile-section__content war-room-profile-section__content--wrapped"
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
						class="war-room-profile-section war-room-profile__section"
						data-test="war-room-profile__section_badges"
					>
						<div data-v-25f4147c="" class="war-room-profile-section__head">
							<div
								data-v-25f4147c=""
								data-test="title-text"
								class="war-room-profile-section__title"
							>
								Badges
							</div>
							<a
								data-v-488290e8=""
								data-v-25f4147c=""
								href="/war-room/profile/TheSalesQB/badges"
								class="bravado-button-v3 bravado-button-v3--sm bravado-button-v3--blank"
								to="/war-room/profile/TheSalesQB/badges"
								><span data-v-488290e8="" class="bravado-button-v3__content"
									><!---->
									<!---->
									<!---->
									Show all badges
									<!----></span
								></a
							>
						</div>
						<div
							data-v-25f4147c=""
							class="war-room-profile-section__content war-room-profile-section__content--wrapped"
						>
							<div
								data-v-4bf48afe=""
								data-v-6d8b9779=""
								class="war-room-profile-badges"
								data-v-25f4147c=""
							>
								<div data-v-4bf48afe="" class="war-room-profile-badges__list">
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--silver war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Catalyst
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--silver war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Valued Contributor
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--silver war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Opinionated
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--silver war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Executive
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Good Citizen
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Member
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Personal Narrative
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Contributor
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Fire Starter
											</div>
										</div>
									</div>
									<div
										data-v-75e98699=""
										data-v-4bf48afe=""
										class="war-room-profile-badges__item war-room-achievement war-room-achievement--bronze war-room-achievement--medium"
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
												class="war-room-achievement__text"
											>
												Old School Bravo
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
						class="war-room-profile-section war-room-profile__section"
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
							<div class="" id="posts"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

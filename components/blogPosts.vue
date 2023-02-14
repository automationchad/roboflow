<script setup>
import { format } from "date-fns";
</script>
<template>
  <div class="">
    <div
      class="mx-auto max-w-7xl overflow-hidden py-16 px-12 sm:py-24 sm:px-8 lg:px-12"
    >
      <header class="py-16 sm:text-center">
        <h1
          class="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl"
        >
          Latest Updates
        </h1>
        <p class="text-lg text-slate-700 dark:text-slate-400">
          All the latest API integration news, straight from the&nbsp;team.
        </p>
        <section class="mt-3 max-w-sm sm:mx-auto sm:px-4">
          <h2 class="sr-only">Sign up for our newsletter</h2>
          <form
            action="https://app.convertkit.com/forms/3181837/subscriptions"
            method="post"
            class="-mx-2 flex flex-wrap"
          >
            <div class="mt-3 grow-[9999] basis-64 px-2">
              <div class="group relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-slate-400"
                >
                  <path
                    d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"
                  ></path>
                  <path d="m6 7 6 5 6-5"></path></svg
                ><input
                  type="email"
                  name="email_address"
                  required=""
                  autocomplete="email"
                  aria-label="Email address"
                  class="block w-full appearance-none rounded-md border border-transparent bg-white py-2 pl-12 pr-3 leading-5 text-slate-900 shadow ring-1 ring-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-700/20 dark:text-white dark:ring-slate-200/20 dark:focus:ring-sky-500 sm:text-sm"
                  placeholder="Subscribe via email"
                />
                <div
                  data-lastpass-icon-root="true"
                  style="
                    position: relative !important;
                    height: 0px !important;
                    width: 0px !important;
                    float: left !important;
                  "
                ></div>
              </div>
            </div>
            <div class="mt-3 flex grow px-2">
              <button
                type="submit"
                class="flex-auto rounded-md border-y border-transparent bg-sky-500 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 dark:hover:bg-sky-400 dark:focus:ring-sky-700 dark:focus:ring-offset-slate-900"
              >
                Subscribe
              </button>
            </div>
          </form>
        </section>
      </header>
      <!-- <Pagination
        v-model="currPage"
        :total="posts.length"
        :max-records="maxRecords"
        :title="'Feed'"
        class="sticky mb-8"
      /> -->
      <div
        class="relative sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]"
      >
        <div
          class="absolute top-3 bottom-0 right-full mr-7 hidden w-px bg-slate-200 dark:bg-slate-800 sm:block md:mr-[3.25rem]"
        ></div>
        <div class="space-y-16">
          <article
            class="group relative"
            v-for="post in postsFiltered"
            :key="post.sys.id"
          >
            <div
              class="absolute -inset-y-2.5 -inset-x-4 group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6"
            ></div>
            <svg
              viewBox="0 0 9 9"
              class="absolute right-full top-2 mr-6 hidden h-[calc(0.5rem+1px)] w-[calc(0.5rem+1px)] overflow-visible text-slate-200 dark:text-slate-600 sm:block md:mr-12"
            >
              <circle
                cx="4.5"
                cy="4.5"
                r="4.5"
                stroke="currentColor"
                class="fill-white dark:fill-slate-900"
                stroke-width="2"
              ></circle>
            </svg>
            <div class="relative">
              <h3
                class="pt-8 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 lg:pt-0"
              >
                {{ post.fields.title }}
              </h3>
              <div
                class="dark:prose-dark prose prose-slate mt-2 mb-4 line-clamp-2 prose-a:relative prose-a:z-10"
              >
                <p>
                  {{ post.fields.summary }}
                </p>
              </div>
              <dl
                class="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]"
              >
                <dt class="sr-only">Date</dt>
                <dd
                  class="whitespace-nowrap text-sm leading-6 dark:text-slate-400"
                >
                  <time :datetime="new Date(post.fields.createdDate)">{{
                    format(new Date(post.fields.createdDate), "MMMM dd, yyyy")
                  }}</time>
                </dd>
              </dl>
            </div>
            <NuxtLink
              class="flex items-center text-sm font-medium text-sky-500"
              :to="'/posts/' + post.sys.id"
              ><span
                class="absolute -inset-y-2.5 -inset-x-4 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6"
              ></span
              ><span class="relative"
                >Read more<span class="sr-only"
                  >,
                  <!-- -->Protocol: A beautiful starting point for your next API
                  documentation site</span
                ></span
              ><svg
                class="relative mt-px ml-2.5 overflow-visible text-sky-300 dark:text-sky-700"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path></svg
            ></NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currPage: 0,
      maxRecords: 100,
    };
  },
  props: ["posts"],
  computed: {
    postsFiltered() {
      if (this.posts.length > 0) {
        return this.posts.slice(
          this.currPage * this.maxRecords,
          this.currPage * this.maxRecords + this.maxRecords > this.posts.length
            ? this.posts.length
            : this.currPage * this.maxRecords + this.maxRecords
        );
      } else return [];
    },
  },
};
</script>

<style scoped>
.link {
  position: relative;
}
.link:before {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;

  visibility: hidden;
  transition: all 0.3s ease-in-out;
}

.link:hover:before {
  visibility: visible;
  width: 100%;
}
</style>

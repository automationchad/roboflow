<template>
  <div class="rounded-md bg-blue-50 p-4 dark:bg-blue-900">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon
          class="h-5 w-5 text-blue-400 dark:text-blue-300"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm text-blue-700 dark:text-blue-200">
          Don't see a template listed? Collaborate with us to build one for you.
        </p>
        <p class="mt-3 text-sm md:mt-0 md:ml-6">
          <a
            :href="link"
            class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600 dark:text-blue-200"
          >
            Details
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from "@heroicons/vue/20/solid";
</script>

<script>
export default {
  props: ["link"],
};
</script>

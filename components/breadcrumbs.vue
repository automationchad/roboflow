<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <a href="/" class="text-slate-400 hover:text-slate-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon
            class="h-5 w-5 flex-shrink-0 text-slate-400"
            aria-hidden="true"
          />
          <a
            :href="page.href"
            class="ml-4 text-sm font-medium text-slate-500 hover:text-slate-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}</a
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";

</script>

<script>
export default {
  props: ["product"],
  data() {
    return {
      pages: [
        { name: "Templates", href: "/templates", current: false },
        {
          name: this.product.fields.name,
          href: `/product/${this.product.uuid}`,
          current: true,
        },
      ],
    };
  },
};
</script>

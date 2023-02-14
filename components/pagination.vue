<template>
  <nav
    class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800  py-3"
    aria-label="Pagination"
  >
    <div class="">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white">{{ title }}</h2>
    </div>
    <div class="flex items-center">
      <div class="mr-4 hidden sm:block">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Showing
          {{ " " }}
          <span class="font-medium">{{ modelValue * maxRecords + 1 }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{
            modelValue * maxRecords + maxRecords > total
              ? total
              : modelValue * maxRecords + maxRecords
          }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ total }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end">
        <button
          :disabled="modelValue === 0"
          @click="previousPage()"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          :disabled="
            (modelValue * maxRecords + maxRecords > total
              ? total
              : modelValue * maxRecords + maxRecords) >= total
          "
          @click="nextPage()"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["total", "modelValue", "maxRecords", "title"],
  emits: ['update:modelValue'],
  methods: {
    nextPage() {
      let page = this.modelValue;
      page += 1;
      this.$emit("update:modelValue", page);
    },
    previousPage() {
      let page = this.modelValue;
      page -= 1;
      this.$emit("update:modelValue", page);
    },
  },
};
</script>

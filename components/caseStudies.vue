<template>
  <div class="py-16">
    <ul
      role="list"
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      <li
        v-for="customer in customers
          .filter((o) => o.status !== 'Development')
          .sort((a, b) => new Date(b.completed) - new Date(a.completed))"
        :key="customer.rec_id"
        class="relative snap-center"
      >
        <button
          @click="openCaseStudy(customer.rec_id)"
          class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          <img
            v-if="customer.image"
            id="image"
            :src="customer.image[0].url"
            alt=""
            class="mover z-1 pointer-events-none absolute h-full w-full object-cover object-top transition-opacity group-hover:opacity-95"
          />

          <button type="button" class="absolute inset-0 focus:outline-none">
            <span class="sr-only"
              >View details for {{ customer["Company"] }}</span
            >
          </button>
        </button>
        <div
          class="mt-2 flex cursor-pointer items-center justify-start text-sm text-black"
          @click="openCaseStudy(customer.rec_id)"
        >
          <div class="text-black dark:text-white">
            <p>{{ customer["Company"] }}</p>
            <p class="text-gray-500 text-xs">{{ customer["handle"] }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <case-study-modal :open="open" :customer="customer" />
</template>

<style scoped>
.arr {
  background: linear-gradient(
    0.311turn,
    #e3bc5a,
    #e9d8ab 25%,
    #f4e9c4 50%,
    #e9d8ab 75%,
    #e3bc5a
  );
}
</style>

<script setup>
import {
  EyeIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/vue/20/solid";
</script>

<script>
export default {
  props: ["customers"],
  data() {
    return {
      open: false,
      customer: this.customers[0],
      refresh: false,
      viewers: this.customers
        .filter((o) => o.status !== "Development")
        .reduce((a, c) => a + (c["Viewers"] ?? 0), 0),
      arr: this.customers
        .filter((o) => o.status !== "Development")
        .reduce((a, c) => a + (c["ARR"] ?? 0), 0),
      cr: Math.round(
        (this.customers
          .filter((o) => o.status !== "Development")
          .reduce((a, c) => a + (c["CR"] ?? 0), 0) /
          this.customers.filter((o) => o.status !== "Development").length) *
          100
      ),
    };
  },

  methods: {
    openCaseStudy(id) {
      
      this.customer = this.customers.find((o) => o.rec_id === id);
      setTimeout(() => {
        this.open = true;
      }, 100);
    },
    refreshData() {
      
      this.refresh = true;
      setTimeout(() => {
        this.refresh = false;
      }, 1000);
    },
    abbreviatedNumber(number) {
      const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
      const tier = (Math.log10(Math.abs(number)) / 3) | 0;
      if (tier === 0) {
        return number;
      }
      const suffix = SI_SYMBOL[tier];
      const scale = 10 ** (tier * 3);
      const scaled = number / scale;
      const length = scaled.toFixed(1).toString();
      const precision = length > 3 ? 0 : 1;
      return scaled.toFixed(precision) + suffix;
    },
  },
};
</script>

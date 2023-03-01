<script setup>
import moment from "moment";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  SparklesIcon,
  ChevronDownIcon,
  QueueListIcon,
} from "@heroicons/vue/24/outline";
import { differenceInDays } from "date-fns";
</script>
<template>
  <div>
    <div class="flex items-center space-x-4">
      <a
        href="/consulting"
        class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white/0 py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25"
      >
        <SparklesIcon v-if="spotsLeft.spots > 0" class="h-4 w-4 mr-1" />
        <QueueListIcon v-else class="h-4 w-4" />
        <div>
          {{ spotsLeft.spots > 0 ? "Work with us →" : "Join waitlist" }}
        </div>
      </a>
      <div>
        <p
          class="text-xs text-rose-600 dark:text-rose-800 bg-red-100 border-rose-600 border rounded-lg px-2 shadow-sm"
          v-if="spotsLeft.spots > 0"
        >
          {{ spotsLeft.spots }} spot{{ spotsLeft.spots > 1 ? "s" : "" }}
          left for
          {{ moment(new Date()).format("MMM") }}
        </p>
        <p class="text-xs text-rose-400 dark:text-rose-600" v-else>
          Fully booked until
          {{
            moment(new Date())
              .add(spotsLeft.remaining_days, "days")
              .format("MMM Do")
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["requests"],
  data() {
    return {
      maxSpots: 6,
    };
  },
  computed: {
    spotsLeft() {
      var arrNum = Math.abs(this.maxSpots - this.requests.length);
      let remaining_days;
      if (this.maxSpots <= this.requests.length) {
        remaining_days = differenceInDays(
          new Date(this.requests[arrNum].fields.est_finish_date),
          new Date()
        );
      } else remaining_days = 0;
      return {
        spots:
          this.requests.length >= this.maxSpots
            ? 0
            : this.maxSpots - this.requests.length,
        remaining_days,
      };
    },
  },
};
</script>

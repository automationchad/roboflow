<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        class="text-lg font-medium text-gray-900"
                      >
                        Project
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                          @click="open = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Main -->
                  <div class="z-1">
                    <div class="pb-1 sm:pb-6">
                      <div>
                        <div class="relative h-40 sm:h-56 overflow-y-auto">
                          <img v-if="customer.image"
                            class="absolute h-auto w-full"
                            :src="customer.image[0].url"
                            alt=""
                          />
                        </div>
                        <div
                          class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6"
                        >
                          <div class="sm:flex-1">
                            <div class="flex items-center justify-between">
                              <div class="flex flex-col items-start">
                                <h3
                                  class="text-xl font-bold text-gray-900 sm:text-2xl"
                                >
                                  {{ customer.Company }}
                                </h3>
                                <p class="text-sm text-gray-500">
                                  {{ customer.handle }}
                                </p>
                              </div>

                              <div class="ml-3 inline-flex sm:ml-0">
                                <Menu
                                  as="div"
                                  class="relative inline-block text-left"
                                >
                                  <MenuButton
                                    class="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span class="sr-only"
                                      >Open options menu</span
                                    >
                                    <EllipsisVerticalIcon
                                      class="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </MenuButton>
                                  <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                  >
                                    <MenuItems
                                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                          <a
                                            :href="customer.website"
                                            target="_blank"
                                            :class="[
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'block px-4 py-2 text-sm',
                                            ]"
                                            >View website</a
                                          >
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                          <a
                                            :href="customer.handleUrl"
                                            target="_blank"
                                            :class="[
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'block px-4 py-2 text-sm',
                                            ]"
                                            >View Twitter</a
                                          >
                                        </MenuItem>
                                      </div>
                                    </MenuItems>
                                  </transition>
                                </Menu>
                              </div>
                            </div>
                            <div
                              class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
                        <div class="relative pt-[68%]" v-if="customer.vimeoId">
                          <iframe
                            v-if="customer.vimeoId"
                            :src="`https://player.vimeo.com/video/${customer.vimeoId}?h=3d9753ac71&autoplay=0&loop=1&title=0&byline=0&portrait=0`"
                            class="absolute top-0 left-0 h-full w-full"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </div>

                        <div class="mt-4 border-t border-gray-200 pt-6">
                          <blockquote>
                            <div>
                              <p class="text-base text-gray-500">
                                <span class="text-xl text-gray-400"
                                  >&ldquo;</span
                                >{{ customer.quote
                                }}<span class="text-xl text-gray-400"
                                  >&rdquo;</span
                                >
                              </p>
                            </div>
                            <footer class="mt-3">
                              <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                  <img
                                    class="h-8 w-8 rounded-full"
                                    :src="customer.customerPhoto[0].url"
                                    alt=""
                                  />
                                </div>
                                <div
                                  class="text-base font-medium text-gray-700"
                                >
                                  {{ customer.customerName }},
                                  {{ customer.customerTitle }}
                                </div>
                              </div>
                            </footer>
                          </blockquote>
                        </div>
                        <div>
                          <dt
                            class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                          >
                            Results
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <div class="flex items-center">
                              <!-- <div
                                class="flex items-center space-x-1 text-xs text-gray-800"
                              >
                                <div class="views rounded px-1 font-medium">
                                  {{
                                    abbreviatedNumber(customer.Viewers) + " "
                                  }}
                                </div>
                                <span>views</span>
                              </div> -->
                              <!-- <div class="text-slate-400">&nbsp;•&nbsp;</div> -->
                              <div
                                :class="['rounded px-1 text-xs', arrStyle]"
                                style=""
                              >
                                <span class="font-medium"
                                  >${{ abbreviatedNumber(customer.ARR) }}</span
                                >
                                ARR
                              </div>
                              <div class="text-slate-400">&nbsp;•&nbsp;</div>
                              <div
                                class="rounded bg-lime-100 px-1 text-xs text-lime-700"
                              >
                                ↑ {{ customer.CR * 100 }}% CR
                              </div>
                            </div>
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                          >
                            Bio
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <p>
                              {{ customer.description }}
                            </p>
                          </dd>
                        </div>

                        <div>
                          <dt
                            class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                          >
                            Website
                          </dt>
                          <dd class="mt-1 text-sm  sm:col-span-2">
                            <span v-if="customer.website === 'Internal tool'" class="text-gray-400">Internal tool</span>
                            <a v-else :href="customer.website" target="_blank" class="text-sky-700">{{
                              customer.website
                            }}</a>
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
                          >
                            Completed
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time datetime="1988-06-23">{{
                              moment(customer.completed).fromNow()
                            }}</time>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.super {
  color: white;
  background: linear-gradient(
    330deg,
    rgb(255, 25, 125),
    rgb(45, 13, 255),
    rgb(0, 255, 179)
  );
}

.arr0 {
  background: conic-gradient(
    from 171.52deg at 50% 50%,
    #f0f1f6 0deg,
    #a0b9cc 90deg,
    #dde5f0 180deg,
    #c5e6f9 234.26deg,
    #a7b5bb 270deg,
    #ecf1f4 1turn
  );
  color: #434343;
}
.arr1 {
  background: conic-gradient(
    from 171.52deg at 50% 50%,
    #ecd9b0 0deg,
    #d3bd94 28.18deg,
    #e3bc69 90deg,
    #f5ebc8 204.51deg,
    #dfb969 240.9deg,
    #e4bb56 270deg,
    #ecd9b0 1turn
  );
  color: #937744;
}

.arr2 {
  background: conic-gradient(
    from 170.45deg at 50% 67.05%,
    #eaeceb 0deg,
    #afafaf 90deg,
    #d9dee3 180deg,
    #c5c5cb 234.26deg,
    #bcbebf 270deg,
    #dfe8ee 1turn
  );
  color: #222;
}
.arr3 {
  background: conic-gradient(
    from 170.43deg at 50% 67.42%,
    #e7cfb5 0deg,
    #d3b394 28.18deg,
    #dba872 90deg,
    #f5e4c8 204.51deg,
    #d6a672 240.9deg,
    #dba35f 270deg,
    #e7cfb5 1turn
  );
  color: #654527;
}
</style>

<script setup>
import { ref } from "vue";
import moment from "moment";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
</script>

<script>
export default {
  props: ["customer", "open"],
  methods: {
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
  computed: {
    arrStyle() {
      if (this.customer.ARR > 200000) return "super";
      else if (this.customer.ARR > 100000) return "arr0";
      else if (this.customer.ARR > 50000) return "arr1";
      else if (this.customer.ARR > 30000) return "arr2";
      else return "arr3";
    },
  },
};
</script>

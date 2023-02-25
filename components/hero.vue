<script setup>
import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyBl2UOzLvshshLp" }).base(
  "appkU7PnQUq7lePwf"
);
let requests = [];

const table = base("sprints");

const getSprints = async () => {
  const records = await table
    .select({
      view: "viwjRdvlzpCwm0OuK",
      sort: [{ field: "est_finish_date", direction: "asc" }],
    })
    .firstPage();
  requests = records.map((o) => {
    return { uuid: o.id, fields: o.fields };
  });
};

await getSprints();
</script>

<template>
  <div>
    <div class="mt-24 relative">
    
      <div class="grid grid-cols-3 gap-16">
        <div class="col-span-1 rounded-lg bg-black/70 p-6 backdrop-blur">
          <TemplateIcon class="mb-2" />
          <h2 class="text-lg font-semibold tracking-normal text-white">
            Work with us
          </h2>
          <p class="text-xs text-slate-300 dark:text-slate-400">
            Automation builds from $5,000
          </p>
          <p class="mt-3 text-sm text-slate-200 dark:text-slate-300">
            Collaborate with our team to automate your business processes.
          </p>
          <ButtonGroup class="mt-3" :requests="requests" />
        </div>
        <div class="col-span-1 rounded-lg bg-black/70 p-6 backdrop-blur">
          <CodeIcon class="mb-2" />
          <h2 class="text-lg font-semibold tracking-normal text-white">
            Steal our secrets
          </h2>
          <p class="text-xs text-slate-300 dark:text-slate-400">
            Access to automation templates from $149
          </p>
          <p class="mt-3 text-sm text-slate-200 dark:text-slate-300">
            Get the workflows we used to build a $25M/yr SaaS business.
          </p>
          <div class="mt-3 flex items-center">
            <a
              class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/90"
              href="/components"
              ><span
                >Explore templates
                <span aria-hidden="true" class="hidden text-black/25 sm:inline"
                  >→</span
                ></span
              ></a
            >
          </div>
        </div>
        <div
          v-if="false"
          class="col-span-1 rounded-lg bg-black/70 p-6 backdrop-blur"
        >
          <ScaleIcon class="mb-2" />
          <h2 class="text-lg text-white">Meet fellow builders</h2>
          <p class="text-xs text-slate-400">Membership from $149/year</p>
          <p class="mt-3 text-sm text-slate-300">
            Build a network of peers without the distraction of social media.
          </p>
          <div class="mt-3 flex items-center">
            <a
              href="/audit"
              class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/90"
              style=""
              >Join <span
                aria-hidden="true"
                class="hidden text-black/25 sm:inline"
                > →</span
              ></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

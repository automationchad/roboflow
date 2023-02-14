<script setup>
import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyBl2UOzLvshshLp" }).base(
  "appkU7PnQUq7lePwf"
);
let customers = [];

const table = base("case_studies");

const getRecords = async () => {
  const records = await table.select().firstPage();
  customers = records.map((o) => o.fields);
};
const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  // More files...
];

await getRecords();


</script>

<template>
  <main class="col-span-4 overflow-auto">
    <div class="h-screen">
      <div
        class="mx-auto max-w-7xl overflow-hidden py-16 px-12 sm:py-24 sm:px-8 lg:px-12"
      >
        <div class="flex items-center">
          <h2 class="text-lg font-medium text-gray-900">
            Results
          </h2>
        </div>
        <CaseStudies :customers="customers" />
      </div>
    </div>
  </main>
</template>

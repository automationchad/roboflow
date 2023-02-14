<template>
  <main class="col-span-4 overflow-auto dark:bg-[#0A101E]">
    <BlogPosts :posts="posts" />
  </main>
</template>

<script setup>
const { data: posts } = await useFetch("/api/posts");
</script>



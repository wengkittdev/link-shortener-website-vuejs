<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const sourceUrl = ref('')
const targetUrl = ref('')

async function shortenUrl() {
  if (sourceUrl.value != '') {
    const response = await axios.post(
      'https://api.tinyurl.com/create?api_token=5n1PxQcO7TKWfzC8QDQcbBRvzGiADZPZfy8r6FPLl572Ebsi4QDeb9guihAJ',
      {
        url: sourceUrl.value
      }
    )

    targetUrl.value = response.data.data.tiny_url
  }
}
</script>

<template>
  <div class="h-96 w-full max-w-2xl rounded-md">
    <div class="h-full flex flex-col justify-center items-center gap-4">
      <p class="text-2xl">URL Shortener</p>
      <div class="flex flex-row justify-center items-center">
        <div>
          <input
            type="text"
            v-model="sourceUrl"
            placeholder="Source Url"
            class="p-2 rounded-md placeholder:text-gray-600 bg-white bg-opacity-40 border-purple-900 border-2 border-solid focus:outline-none"
          />
        </div>
        <span class="px-4">
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </span>
        <div>
          <input
            class="p-2 rounded-md placeholder:text-gray-600 bg-white bg-opacity-40 border-purple-900 border-2 border-solid focus:outline-none"
            v-model="targetUrl"
            type="text"
            placeholder="Target Url"
            :disabled="true"
          />
          <span class="pl-1"><font-awesome-icon :icon="['fas', 'copy']" /></span>
        </div>
      </div>

      <div class="mt-2">
        <button @click="shortenUrl" class="rounded-lg bg-violet-950 text-white p-2">
          Shorten !
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

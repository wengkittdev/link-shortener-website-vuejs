<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const sourceUrl = ref('')
const targetUrl = ref('')
const isLoading = ref(false)
const isInvalidUrl = ref(false)

async function shortenUrl() {
  if (isValidUrl()) {
    return
  }

  isLoading.value = true
  const response = await axios.post(
    `https://api.tinyurl.com/create?api_token=${import.meta.env.VITE_TINY_URL_API_KEY}`,
    {
      url: sourceUrl.value
    }
  )

  targetUrl.value = response.data.data.tiny_url
  isLoading.value = false
}

function isValidUrl() {
  try {
    new URL(sourceUrl.value)
    isInvalidUrl.value = false
  } catch {
    isInvalidUrl.value = true
  }
  return isInvalidUrl.value
}

function clearSourceUrl() {
  sourceUrl.value = ''
}
</script>

<template>
  <div class="h-96 w-full max-w-2xl rounded-md">
    <div class="h-full flex flex-col justify-center items-center gap-4">
      <p class="text-2xl">URL Shortener</p>
      <div class="flex flex-row justify-center items-center">
        <div class="flex flex-col">
          <input
            type="text"
            v-model="sourceUrl"
            placeholder="Source Url"
            class="p-2 w-[225px] rounded-md placeholder:text-gray-600 bg-white bg-opacity-40 border-purple-900 border-2 border-solid focus:outline-none"
          />
          <span class="text-black" v-if="isInvalidUrl">Please enter a valid URL</span>
        </div>
        <span class="px-4">
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </span>
        <div>
          <input
            class="p-2 w-[225px] rounded-md placeholder:text-gray-600 bg-white bg-opacity-40 border-purple-900 border-2 border-solid focus:outline-none"
            v-model="targetUrl"
            type="text"
            placeholder="Target Url"
            :disabled="true"
          />
          <span class="pl-1"><font-awesome-icon :icon="['fas', 'copy']" /></span>
        </div>
      </div>

      <div class="mt-2 flex flex-row gap-3">
        <button
          @click="shortenUrl"
          :disabled="isLoading"
          class="rounded-lg bg-violet-950 text-white p-2 w-[90px]"
        >
          Shorten<span class="ml-2" v-if="isLoading"
            ><font-awesome-icon :icon="['fas', 'spinner']" spin
          /></span>
        </button>
        <button
          @click="clearSourceUrl"
          v-if="sourceUrl"
          class="rounded-lg bg-violet-950 text-white p-2 w-[90px]"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

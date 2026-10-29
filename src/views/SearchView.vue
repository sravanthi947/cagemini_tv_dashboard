
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useShowsStore } from '../stores/shows'
import ShowCard from '../components/ShowCard.vue'

const store = useShowsStore()
const searchQuery = ref('')

let searchTimeout: ReturnType<typeof setTimeout> | undefined

watch(searchQuery, (query) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!query.trim()) {
    store.search('')
    return
  }

  searchTimeout = setTimeout(() => {
    store.search(query)
  }, 400)
})
</script>

<template>
  <main class="search-page">
    <section class="search-heading">
      <p class="eyebrow">FIND YOUR NEXT FAVOURITE</p>
      <h1>Search <span>shows.</span></h1>
      <p class="description">
        Search thousands of TV shows and discover something worth watching.
      </p>

      <label for="show-search">TV show name</label>
      <input
        id="show-search"
        v-model="searchQuery"
        type="search"
        placeholder="Try Friends, Sherlock, The Office..."
        autocomplete="off"
      />
    </section>

    <section class="results-section" aria-live="polite">
      <p v-if="store.isSearching" class="message" role="status">
        Searching for shows...
      </p>

      <p v-else-if="store.searchError" class="error-message" role="alert">
        {{ store.searchError }}
      </p>

      <div v-else-if="searchQuery.trim() && store.searchResults.length">
        <h2>Search results</h2>
        <div class="results-grid">
          <ShowCard
            v-for="result in store.searchResults"
            :key="result.show.id"
            :show="result.show"
          />
        </div>
      </div>

      <p
        v-else-if="searchQuery.trim() && !store.isSearching"
        class="message"
      >
        No shows found. Try a different name.
      </p>

      <p v-else class="message">
        Start typing to find your next show.
      </p>
    </section>
  </main>
</template>

<style scoped>
.search-page {
  width: min(1200px, 90%);
  margin: 0 auto;
  min-height: 70vh;
  color: #f5f5f7;
}

.search-heading {
  max-width: 680px;
  padding: 55px 0 35px;
}

.eyebrow {
  color: #c6f36b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.8px;
}

h1 {
  margin: 16px 0;
  font-size: clamp(40px, 6vw, 60px);
  letter-spacing: -2px;
}

h1 span {
  color: #c6f36b;
}

.description {
  margin-bottom: 28px;
  color: #aaa;
  font-size: 14px;
  line-height: 1.7;
}

label {
  display: block;
  margin-bottom: 9px;
  font-size: 13px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #393943;
  border-radius: 8px;
  background: #1b1b24;
  color: #fff;
}

input:focus {
  border-color: #c6f36b;
}

.results-section {
  padding-bottom: 60px;
}

.results-section h2 {
  margin-bottom: 22px;
  font-size: 22px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 26px 18px;
}

.results-grid > * {
  width: 100%;
  min-width: 0;
}

.message {
  padding: 35px 0;
  color: #aaa;
  text-align: center;
}

.error-message {
  padding: 20px;
  border: 1px solid #744047;
  border-radius: 8px;
  color: #ffb7bb;
}

@media (max-width: 600px) {
  .search-heading {
    padding-top: 38px;
  }

  .results-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 14px;
  }
}
</style>

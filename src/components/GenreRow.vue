
<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import type { TvShow } from '../types/tvmaze'
import ShowCard from './ShowCard.vue'

defineProps<{
  genre: string
  shows: TvShow[]
}>()

const row = ref<HTMLElement | null>(null)

function scrollRow(direction: number) {
  if (!row.value) return

  row.value.scrollBy({
    left: direction * row.value.clientWidth * 0.8,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section
    class="genre-section"
    :aria-label="`${genre} shows sorted by rating`"
  >
    <div class="genre-header">
      <div>
        <h2>{{ genre }}</h2>
        <p>Explore top-rated {{genre.toLowerCase()}} shows</p>
      </div>

      <div class="genre-controls">
        <button
          type="button"
          :aria-label="`Scroll ${genre} shows left`"
          @click="scrollRow(-1)"
        >
          <FontAwesomeIcon :icon="faChevronLeft" aria-hidden="true" />
        </button>

        <button
          type="button"
          :aria-label="`Scroll ${genre} shows right`"
          @click="scrollRow(1)"
        >
          <FontAwesomeIcon :icon="faChevronRight" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div
      ref="row"
      class="show-row"
      tabindex="0"
      :aria-label="`${genre} TV shows`"
    >
      <ShowCard
        v-for="show in shows"
        :key="show.id"
        :show="show"
      />
    </div>
  </section>
</template>

<style scoped>
.genre-section {
  margin-bottom: 36px;
}

.genre-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.genre-header h2 {
  margin: 0 0 6px;
  font-size: 22px;
}

.genre-header p {
  margin: 0;
  color: #aaa;
  font-size: 13px;
}

.genre-controls {
  display: flex;
  gap: 8px;
}

.genre-controls button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid #444;
  border-radius: 50%;
  background: #252530;
  color: white;
  cursor: pointer;
}

.show-row {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 2px 14px;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;
}

.show-row > * {
  scroll-snap-align: start;
}

@media (max-width: 600px) {
  .genre-header h2 {
    font-size: 19px;
  }

  .genre-section {
    margin-bottom: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .show-row {
    scroll-behavior: auto;
  }
}
</style>

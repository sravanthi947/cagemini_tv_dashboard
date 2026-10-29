
<script setup lang="ts">
import type { TvShow } from '../types/tvmaze'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  show: TvShow
}>()
</script>

<template>
  <RouterLink
    :to="`/shows/${show.id}`"
    class="show-card"
    :aria-label="`View details for ${show.name}`"
  >
    <div class="poster-container">
      <img
        v-if="show.image?.medium"
        :src="show.image.medium"
        :alt="`${show.name} poster`"
        loading="lazy"
      />

      <div v-else class="poster-placeholder">
        No poster available
      </div>

      <span class="rating">
         <FontAwesomeIcon :icon="faStar" aria-hidden="true" /> {{ show.rating?.average ?? 'N/A' }}
      </span>
    </div>

    <h3>{{ show.name }}</h3>

    <p>
      {{ show.premiered?.slice(0, 4) || 'Year unavailable' }}
    </p>
  </RouterLink>
</template>

<style scoped>
.show-card {
  display: block;
  flex: 0 0 160px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.poster-container {
  position: relative;
  height: 225px;
  overflow: hidden;
  border-radius: 10px;
  background: #252530;
}

.poster-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.show-card:hover .poster-container img {
  transform: scale(1.05);
}

.poster-placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  padding: 12px;
  color: #aaa;
  font-size: 12px;
  text-align: center;
}

.rating {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 5px 7px;
  border-radius: 5px;
  background: #17171d;
  color: #c6f36b;
  font-size: 12px;
  font-weight: 700;
}

.show-card h3 {
  overflow: hidden;
  margin: 10px 0 4px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.show-card p {
  margin: 0;
  color: #aaa;
  font-size: 12px;
}

@media (max-width: 600px) {
  .show-card {
    flex-basis: 135px;
  }

  .poster-container {
    height: 195px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .poster-container img {
    transition: none;
  }
}
.rating svg {
  margin-right: 3px;
  color: #c6f36b;
}
</style>

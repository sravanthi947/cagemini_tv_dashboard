
<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import GenreRow from '../components/GenreRow.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const store = useShowsStore()

onMounted(() => {
  store.loadShows()
})
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <p class="eyebrow">YOUR NEXT BINGE STARTS HERE</p>

      <h1>
        Stories worth<br />
        <span>staying in for.</span>
      </h1>

      <p class="hero-description">
        Explore TV shows by genre, discover top-rated stories,
        and find your next favourite.
      </p>

      <RouterLink to="/search" class="explore-button">
        Explore shows <span aria-hidden="true">↗</span>
      </RouterLink>
    </section>

    <section class="browse-section" aria-label="Browse shows by genre">
      <div class="browse-heading">
        <div>
          <p class="eyebrow">CURATED BY GENRE</p>
          <h2>Find your kind of story</h2>
        </div>

        <span class="sorted-label">
          <FontAwesomeIcon :icon="faStar" aria-hidden="true" /> Sorted by rating
        </span>
      </div>

      <div
        v-if="store.isLoading"
        class="status-message"
        role="status"
        aria-live="polite"
      >
        Loading TV shows...
      </div>

      <div
        v-else-if="store.error"
        class="error-message"
        role="alert"
      >
        <p>{{ store.error }}</p>
        <button type="button" @click="store.loadShows(true)">
          Try again
        </button>
      </div>

      <div v-else-if="store.genres.length">
        <GenreRow
          v-for="group in store.genres"
          :key="group.genre"
          :genre="group.genre"
          :shows="group.shows"
        />
      </div>

      <div v-else class="status-message">
        No TV shows are available.
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  width: min(1200px, 90%);
  margin: 0 auto;
  color: #f5f5f7;
}

.hero {
  padding: 65px 0 55px;
  border-bottom: 1px solid #292a34;
}

.eyebrow {
  color: #c6f36b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.8px;
}

.hero h1 {
  margin: 20px 0;
  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.05;
  letter-spacing: -2px;
}

.hero h1 span {
  color: #c6f36b;
}

.hero-description {
  max-width: 470px;
  color: #aaa;
  font-size: 15px;
  line-height: 1.8;
}

.explore-button {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  padding: 13px 18px;
  border-radius: 8px;
  background: #c6f36b;
  color: #171a12;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.explore-button:hover {
  background: #d7ff8b;
}

.browse-section {
  padding: 35px 0 65px;
}

.browse-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 30px;
}

.browse-heading .eyebrow {
  margin-bottom: 8px;
}

.browse-heading h2 {
  margin: 0;
  font-size: clamp(23px, 3vw, 30px);
}

.sorted-label {
  color: #c6f36b;
  font-size: 12px;
  white-space: nowrap;
}

.status-message {
  padding: 45px 10px;
  color: #aaa;
  text-align: center;
}

.error-message {
  padding: 24px;
  border: 1px solid #744047;
  border-radius: 10px;
  color: #ffb7bb;
}

.error-message button {
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  background: #c6f36b;
  cursor: pointer;
}

@media (max-width: 600px) {
  .hero {
    padding: 45px 0 35px;
  }

  .browse-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}

</style>

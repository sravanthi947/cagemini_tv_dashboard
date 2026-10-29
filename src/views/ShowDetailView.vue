
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faStar,
  faArrowLeft,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { useShowsStore } from '../stores/shows'

const route = useRoute()
const router = useRouter()
const store = useShowsStore()

function loadShow() {
  const id = Number(route.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    router.replace('/')
    return
  }

  store.loadShow(id)
}

onMounted(loadShow)

watch(() => route.params.id, loadShow)
</script>

<template>
  <main class="detail-page">
    <RouterLink to="/" class="back-link">
      <FontAwesomeIcon :icon="faArrowLeft" aria-hidden="true" />
      Back to discover
    </RouterLink>

    <p v-if="store.isLoadingDetail" class="message" role="status">
      Loading show details...
    </p>

    <div v-else-if="store.detailError" class="error-message" role="alert">
      <p>{{ store.detailError }}</p>
      <button type="button" @click="loadShow">Try again</button>
    </div>

    <article v-else-if="store.selectedShow" class="show-detail">
      <div class="poster">
        <img
          v-if="store.selectedShow.image?.original || store.selectedShow.image?.medium"
          :src="store.selectedShow.image.original || store.selectedShow.image.medium"
          :alt="`${store.selectedShow.name} poster`"
        />
        <div v-else class="poster-placeholder">No poster available</div>
      </div>

      <div class="show-info">
        <p class="eyebrow">TV SHOW DETAILS</p>
        <h1>{{ store.selectedShow.name }}</h1>

        <div class="metadata">
          <span v-if="store.selectedShow.premiered">
            {{ store.selectedShow.premiered.slice(0, 4) }}
          </span>
          <span v-if="store.selectedShow.status">
            {{ store.selectedShow.status }}
          </span>
          <span v-if="store.selectedShow.runtime">
            {{ store.selectedShow.runtime }} min
          </span>
          <span v-if="store.selectedShow.rating?.average" class="rating">
            <FontAwesomeIcon :icon="faStar" aria-hidden="true" />
            {{ store.selectedShow.rating.average }}/10
          </span>
        </div>

        <div v-if="store.selectedShow.genres.length" class="genres">
          <span v-for="genre in store.selectedShow.genres" :key="genre">
            {{ genre }}
          </span>
        </div>

        <h2>About the show</h2>
        <div
          v-if="store.selectedShow.summary"
          class="summary"
          v-html="store.selectedShow.summary"
        ></div>
        <p v-else class="muted">No summary is available for this show.</p>

        <p v-if="store.selectedShow.language" class="language">
          <strong>Language:</strong> {{ store.selectedShow.language }}
        </p>

        <p v-if="store.selectedShow.network?.name" class="language">
          <strong>Network:</strong> {{ store.selectedShow.network.name }}
        </p>

        <p v-else-if="store.selectedShow.webChannel?.name" class="language">
          <strong>Streaming service:</strong> {{ store.selectedShow.webChannel.name }}
        </p>

        <a
          v-if="store.selectedShow.officialSite"
          :href="store.selectedShow.officialSite"
          target="_blank"
          rel="noopener noreferrer"
          class="official-link"
        >
          Official website
          <FontAwesomeIcon
            :icon="faArrowUpRightFromSquare"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  </main>
</template>

<style scoped>
.detail-page {
  width: min(1100px, 90%);
  min-height: 70vh;
  margin: 0 auto;
  padding: 30px 0 65px;
  color: #f5f5f7;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 35px;
  color: #aaa;
  font-size: 13px;
  text-decoration: none;
}

.back-link:hover {
  color: #c6f36b;
}

.show-detail {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
  align-items: start;
  gap: 45px;
}

.poster {
  overflow: hidden;
  border-radius: 12px;
  background: #252530;
}

.poster img {
  display: block;
  width: 100%;
  height: auto;
}

.poster-placeholder {
  display: grid;
  min-height: 300px;
  place-items: center;
  color: #aaa;
}

.eyebrow {
  color: #c6f36b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.8px;
}

.show-info h1 {
  margin: 12px 0 18px;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #bbb;
  font-size: 13px;
}

.rating {
  color: #c6f36b;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 22px 0 30px;
}

.genres span {
  padding: 7px 11px;
  border: 1px solid #393943;
  border-radius: 20px;
  color: #ddd;
  font-size: 12px;
}

.show-info h2 {
  margin: 0 0 12px;
  font-size: 19px;
}

.summary {
  color: #bbb;
  font-size: 14px;
  line-height: 1.8;
}

.summary :deep(p) {
  margin-top: 0;
}

.muted,
.language {
  color: #aaa;
  font-size: 13px;
  line-height: 1.7;
}

.official-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 15px;
  padding: 12px 16px;
  border-radius: 7px;
  background: #c6f36b;
  color: #171a12;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.message {
  padding: 50px 0;
  color: #aaa;
  text-align: center;
}

.error-message {
  padding: 22px;
  border: 1px solid #744047;
  border-radius: 8px;
  color: #ffb7bb;
}

.error-message button {
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  background: #c6f36b;
  cursor: pointer;
}

@media (max-width: 700px) {
  .show-detail {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .poster {
    width: min(280px, 100%);
  }
}
</style>

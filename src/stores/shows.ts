
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getShowById,
  getShowIndex,
  searchShows,
} from '../services/tvmaze'
import { groupShowsByGenre } from '../utils/shows'
import type {
  TvSearchResult,
  TvShow,
} from '../types/tvmaze'

export const useShowsStore = defineStore('shows', () => {
  // Application data
  const shows = ref<TvShow[]>([])
  const searchResults = ref<TvSearchResult[]>([])
  const selectedShow = ref<TvShow | null>(null)

  // Loading states
  const isLoading = ref(false)
  const isSearching = ref(false)
  const isLoadingDetail = ref(false)

  // Error states
  const error = ref<string | null>(null)
  const searchError = ref<string | null>(null)
  const detailError = ref<string | null>(null)

  const hasLoaded = ref(false)

  // Derived data
  const genres = computed(() =>
    groupShowsByGenre(shows.value)
  )

  async function loadShows(force = false) {
    if (hasLoaded.value && !force) return

    isLoading.value = true
    error.value = null

    try {
      shows.value = await getShowIndex()
      hasLoaded.value = true
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Unable to load TV shows.'
    } finally {
      isLoading.value = false
    }
  }

  async function search(query: string) {
    if (!query.trim()) {
      searchResults.value = []
      searchError.value = null
      isSearching.value = false
      return
    }

    isSearching.value = true
    searchError.value = null

    try {
      searchResults.value = await searchShows(query)
    } catch (err) {
      searchError.value =
        err instanceof Error
          ? err.message
          : 'Unable to search TV shows.'
    } finally {
      isSearching.value = false
    }
  }

  async function loadShow(id: number) {
    selectedShow.value = null
    detailError.value = null
    isLoadingDetail.value = true

    try {
      selectedShow.value = await getShowById(id)
    } catch (err) {
      detailError.value =
        err instanceof Error
          ? err.message
          : 'Unable to load show details.'
    } finally {
      isLoadingDetail.value = false
    }
  }

  return {
    shows,
    searchResults,
    selectedShow,
    isLoading,
    isSearching,
    isLoadingDetail,
    error,
    searchError,
    detailError,
    hasLoaded,
    genres,
    loadShows,
    search,
    loadShow,
  }
})

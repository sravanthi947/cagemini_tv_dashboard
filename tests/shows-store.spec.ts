
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useShowsStore } from '../src/stores/shows'
import * as tvmaze from '../src/services/tvmaze'

vi.mock('../src/services/tvmaze', () => ({
  getShowIndex: vi.fn(),
  searchShows: vi.fn(),
  getShowById: vi.fn(),
}))

describe('Shows Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('loads shows successfully', async () => {
    vi.mocked(tvmaze.getShowIndex).mockResolvedValue([
      {
        id: 1,
        name: 'Friends',
        genres: ['Comedy'],
        rating: { average: 8.5 },
      },
    ])

    const store = useShowsStore()
    await store.loadShows()

    expect(store.shows).toHaveLength(1)
    expect(store.shows[0].name).toBe('Friends')
    expect(store.isLoading).toBe(false)
  })

  it('handles API errors', async () => {
    vi.mocked(tvmaze.getShowIndex).mockRejectedValue(
      new Error('Network error'),
    )

    const store = useShowsStore()
    await store.loadShows()

    expect(store.error).toBe('Network error')
    expect(store.isLoading).toBe(false)
  })

  it('searches for a show', async () => {
    vi.mocked(tvmaze.searchShows).mockResolvedValue([
      {
        score: 0.9,
        show: {
          id: 1,
          name: 'Friends',
          genres: ['Comedy'],
          rating: { average: 8.5 },
        },
      },
    ])

    const store = useShowsStore()
    await store.search('Friends')

    expect(store.searchResults).toHaveLength(1)
    expect(store.searchResults[0].show.name).toBe('Friends')
  })
})

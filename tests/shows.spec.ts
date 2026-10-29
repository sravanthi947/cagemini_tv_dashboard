
import { describe, it, expect } from 'vitest'
import { groupShowsByGenre, sortByRating } from '../src/utils/shows'
import type { TvShow } from '../src/types/tvmaze'

const sampleShows: TvShow[] = [
  {
    id: 1,
    name: 'Show A',
    genres: ['Drama', 'Action'],
    rating: { average: 7.5 },
  },
  {
    id: 2,
    name: 'Show B',
    genres: ['Drama'],
    rating: { average: 9.0 },
  },
  {
    id: 3,
    name: 'Show C',
    genres: ['Action'],
    rating: { average: 8.0 },
  },
]

describe('sortByRating', () => {
  it('sorts shows from highest to lowest rating', () => {
    const result = sortByRating(sampleShows)

    expect(result.map((show) => show.name)).toEqual([
      'Show B',
      'Show C',
      'Show A',
    ])
  })

  it('does not modify the original array', () => {
    const original = [...sampleShows]

    sortByRating(sampleShows)

    expect(sampleShows).toEqual(original)
  })
})

describe('groupShowsByGenre', () => {
  it('groups shows by genre and sorts each group by rating', () => {
    const result = groupShowsByGenre(sampleShows)

    expect(result.map((group) => group.genre)).toEqual([
      'Action',
      'Drama',
    ])

    const drama = result.find((group) => group.genre === 'Drama')

    expect(drama?.shows.map((show) => show.name)).toEqual([
      'Show B',
      'Show A',
    ])
  })

  it('includes a show in each of its genres', () => {
    const result = groupShowsByGenre(sampleShows)

    const action = result.find((group) => group.genre === 'Action')

    expect(action?.shows.map((show) => show.name)).toEqual([
      'Show C',
      'Show A',
    ])
  })

  it('returns an empty array when there are no shows', () => {
    expect(groupShowsByGenre([])).toEqual([])
  })
})

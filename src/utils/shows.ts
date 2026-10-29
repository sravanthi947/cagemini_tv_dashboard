
import type { TvShow } from '../types/tvmaze'

export function getRating(show: TvShow): number {
  return show.rating?.average ?? 0
}

export function sortByRating(shows: TvShow[]): TvShow[] {
  return [...shows].sort((a, b) => {
    return getRating(b) - getRating(a)
  })
}

export function groupShowsByGenre(
  shows: TvShow[]
): { genre: string; shows: TvShow[] }[] {
  const genreMap = new Map<string, TvShow[]>()

  for (const show of shows) {
    for (const genre of show.genres ?? []) {
      const existingShows = genreMap.get(genre) ?? []

      existingShows.push(show)
      genreMap.set(genre, existingShows)
    }
  }

  return Array.from(genreMap.entries())
    .map(([genre, genreShows]) => ({
      genre,
      shows: sortByRating(genreShows),
    }))
    .sort((a, b) => a.genre.localeCompare(b.genre))
}

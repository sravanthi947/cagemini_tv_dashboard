
import type { TvShow, TvSearchResult } from '../types/tvmaze'

const API_BASE_URL =
  import.meta.env.VITE_TVMAZE_BASE_URL   || 'https://api.tvmaze.com'

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`
    )
  }

  return response.json() as Promise<T>
}

export function getShowIndex(): Promise<TvShow[]> {
  return request<TvShow[]>(
    `${API_BASE_URL}/shows?page=0`
  )
}

export function searchShows(
  query: string
): Promise<TvSearchResult[]> {
  return request<TvSearchResult[]>(
    `${API_BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`
  )
}

export function getShowById(id: number): Promise<TvShow> {
  return request<TvShow>(
    `${API_BASE_URL}/shows/${id}`
  )
}

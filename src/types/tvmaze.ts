
export interface TvShow {
  id: number
  name: string
  type?: string
  language?: string | null
  genres: string[]
  status?: string
  premiered?: string | null
  ended?: string | null
  officialSite?: string | null
  summary?: string | null

  image?: {
    medium: string
    original: string
  } | null

  rating?: {
    average: number | null
  }

  runtime?: number | null
  averageRuntime?: number | null

  schedule?: {
    time: string
    days: string[]
  }

  network?: {
    name: string
  } | null

  webChannel?: {
    name: string
  } | null
}

export interface TvSearchResult {
  score: number
  show: TvShow
}

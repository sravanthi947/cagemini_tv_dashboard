
# Screenly — TV Show Discovery Dashboard

## Overview

Screenly is a responsive TV show discovery application built using Vue 3 and TypeScript. It allows users to explore TV shows by genre, discover highly rated shows, search for shows by name, and view detailed information about individual shows.

The application integrates with the public TVMaze API and focuses on reusable components, maintainable code, accessibility, and a responsive user experience.

## Features

- **Browse by Genre:** Displays TV shows grouped by genre.
- **Rating-Based Sorting:** Sorts shows within each genre by rating, from highest to lowest.
- **Search TV Shows:** Searches for TV shows by name using the TVMaze search API.
- **Debounced Search:** Reduces unnecessary API requests by waiting briefly after the user stops typing.
- **Show Details:** Displays available information, including posters, ratings, genres, summaries, premiere dates, status, language, and official websites.
- **Loading States:** Provides feedback while API requests are in progress.
- **Error Handling:** Displays meaningful messages when API requests fail.
- **Responsive Design:** Adapts the interface to desktop and mobile screen sizes.
- **Accessibility:** Uses semantic HTML, form labels, keyboard-focus indicators, and accessible status messages.
- **Reusable Components:** Uses shared components for show cards and genre rows.

## Technology Stack

- Vue 3 — Composition API and Single-File Components
- TypeScript — Static typing
- Vite — Development server and build tooling
- Pinia — State management
- Vue Router — Client-side navigation
- Font Awesome — Icons
- HTML and CSS — Structure and styling
- TVMaze API — TV show data


## Prerequisites

The following tools are required to run the application:

- Node.js: v24.22.1
- npm: 11.19.1

Verify your installed versions:

```bash
node --version
npm --version
```

## Getting Started

### 1. Install Dependencies

Clone or download the repository, open the project directory in a terminal, and run:

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

### 3. Build for Production

```bash
npm run build
```

### 4. Preview the Production Build

```bash
npm run preview
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Browse TV shows grouped by genre |
| `/search` | Search for TV shows by name |
| `/shows/:id` | View details for a selected TV show |


## TVMaze API Integration

The application uses the public TVMaze API to retrieve show information.

| Endpoint | Purpose |
|---|---|
| `https://api.tvmaze.com/shows?page=0` | Retrieves the show index |
| `https://api.tvmaze.com/search/shows?q=Friends` | Searches for shows by name |
| `https://api.tvmaze.com/shows/1` | Retrieves details for a specific show |

API requests are centralized in the service layer. The application handles unsuccessful HTTP responses and displays loading and error states where appropriate.

API responses may contain missing or optional fields, so the UI provides fallbacks when information such as ratings, posters, or summaries is unavailable.



## Architecture and Design Decisions

### Vue 3 Composition API

The Composition API organizes component logic into readable, maintainable sections and supports reuse of logic when needed.

### TypeScript

TypeScript interfaces define the expected structure of TVMaze show and search-result data, helping improve code clarity and catch type-related errors.

### Pinia State Management

Pinia centralizes shared application state, including:

- TV show data
- Search results
- Selected show details
- Loading indicators
- API error messages

This keeps data handling consistent across the application's views.

### API Service Layer

API calls are separated from UI components in `services/tvmaze.ts`. This makes API logic easier to maintain and test independently.

### Reusable Components

- `ShowCard.vue` displays an individual show's poster, name, premiere year, and rating.
- `GenreRow.vue` displays a horizontally scrollable collection of shows for a genre.

Reusable components reduce duplicated UI code and improve maintainability.

### Utility Functions

Genre grouping and rating-based sorting are handled by utility functions rather than being embedded in view components.

### Vue Router

Vue Router provides navigation between the home page, search page, and show-detail page without requiring a full page reload.

### Component-Scoped CSS

Component-specific styles are scoped to their respective Vue components to reduce unintended styling conflicts. Global CSS is reserved for shared defaults.

## Project Structure

```text
src/
├── components/
│   ├── GenreRow.vue
│   └── ShowCard.vue
├── router/
│   └── index.ts
├── services/
│   └── tvmaze.ts
├── stores/
│   └── shows.ts
├── types/
│   └── tvmaze.ts
├── utils/
│   └── shows.ts
├── views/
│   ├── HomeView.vue
│   ├── SearchView.vue
│   └── ShowDetailView.vue
├── App.vue
├── main.ts
└── style.css
```

## Testing

Unit tests will be added to validate the application's business logic, components, and state management.

Planned test coverage includes:

- **Utility functions:** Genre grouping and rating-based sorting.
- **Components:** Show card rendering, missing-data fallbacks, and navigation links.
- **Pinia store:** Successful API responses, loading states, and API error handling.
- **Search functionality:** Search results, empty queries, and unsuccessful requests.
- **Show details:** Successful loading of show information and handling of missing or unavailable data.

After a test framework is configured, run the test suite using the script defined in `package.json`.

The project should be verified with a production build and browser testing before submission.

## Future Improvements

- Add automated unit tests and component tests.
- Improve handling of overlapping search requests.
- Add filtering and sorting options.
- Improve invalid-route and not-found handling.
- Add pagination or additional loading strategies if needed.

## Credits

TV show data is provided by [TVMaze](https://www.tvmaze.com/).



<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faClapperboard,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <div class="app">
    <header class="site-header">
      <RouterLink to="/" class="brand" aria-label="Screenly home">
        <span class="brand-mark">
          <FontAwesomeIcon :icon="faClapperboard" aria-hidden="true" />
        </span>
        <span>screenly</span>
      </RouterLink>

      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink to="/" class="nav-link">
          Discover
        </RouterLink>

        <RouterLink to="/search" class="nav-link search-link">
          <FontAwesomeIcon :icon="faMagnifyingGlass" aria-hidden="true" />
          Search shows
        </RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <span class="footer-brand">screenly</span>
      <span>Discover your next favourite show.</span>
      <span>Show data provided by TVMaze</span>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 5%;
  border-bottom: 1px solid #292a34;
  background: #101116;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: sans-serif;
  font-size: 23px;
  font-weight: 700;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 9px;
  background: #c6f36b;
  color: #171a12;
  font-size: 16px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #aaa;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #c6f36b;
}

.nav-link:focus-visible,
.brand:focus-visible {
  outline: 2px solid #c6f36b;
  outline-offset: 4px;
}

.site-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
  padding: 24px 5%;
  border-top: 1px solid #292a34;
  color: #999;
  font-size: 12px;
}

.footer-brand {
  color: #f5f5f7;
  font-size: 17px;
  font-weight: 700;
}

.site-footer span:last-child {
  margin-left: auto;
}

@media (max-width: 600px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }

  .main-nav {
    gap: 20px;
  }

  .site-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .site-footer span:last-child {
    margin-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}
</style>

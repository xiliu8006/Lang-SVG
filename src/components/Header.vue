<script setup>
const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'Method', href: '#method' },
  { label: 'Results', href: '#results' },
  { label: 'BibTeX', href: '#bibtex' },
]
const paperUrl = `${import.meta.env.BASE_URL}Lang-SVG.pdf`
</script>

<template>
  <header class="project-header">
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="Lang-SVG, back to top">Lang-SVG</a>
      <nav class="header-actions" aria-label="Page navigation">
        <a v-for="item in navigation" :key="item.label" class="pill" :href="item.href">
          {{ item.label }}
        </a>
        <a class="pill pill-solid" :href="paperUrl" target="_blank" rel="noopener">
          Read paper <span aria-hidden="true">→</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.project-header {
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  min-height: 96px;
  padding: 16px clamp(20px, 3.5vw, 72px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-sizing: border-box;
}

.brand {
  color: var(--ink);
  font-size: clamp(23px, 2vw, 32px);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-decoration: none;
  white-space: nowrap;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border: 2px solid #25292b;
  border-radius: 999px;
  color: var(--ink);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease;
}

.pill:hover,
.pill:focus-visible,
.pill-solid {
  background: var(--ink);
  color: #fff;
}

.pill-solid:hover {
  background: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 800px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
  .header-actions { justify-content: flex-start; gap: 8px; }
  .pill { min-height: 38px; padding: 0 13px; font-size: 14px; }
}
</style>

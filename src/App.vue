<script setup>
import Header from './components/Header.vue'
import Title from './components/sections/Title.vue'
import Abstract from './components/sections/Abstract.vue'
import Method from './components/sections/Method.vue'
import Results from './components/sections/Results.vue'
import Tagging from './components/sections/Tagging.vue'
import MoreResults from './components/sections/MoreResults.vue'
import BibTeX from './components/sections/BibTeX.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-page" id="top">
    <Header />
    <main>
      <section id="overview">
        <Title />
        <Abstract />
      </section>
      <section id="method">
        <Method />
      </section>
      <section id="results">
        <Results />
        <Tagging />
        <MoreResults />
      </section>
      <section id="bibtex">
        <BibTeX />
      </section>
    </main>
    <Footer />
    <el-backtop :right="32" :bottom="64" class="app-backtop" />
  </div>
</template>

<style>
.app-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(180deg, #fffefd 0%, #faf9f7 45%, #f8f7f5 100%);
}

#overview,
#method,
#results,
#bibtex {
  scroll-margin-top: 16px;
}

.app-backtop {
  width: 42px !important;
  height: 42px !important;
  color: var(--accent) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid var(--line);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
}
</style>

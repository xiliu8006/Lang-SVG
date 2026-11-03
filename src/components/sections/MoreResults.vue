<script setup>
import { ref } from 'vue'

const base = import.meta.env.BASE_URL
const open = ref([])

const panels = [
  {
    key: 'cmp',
    title: 'More comparisons',
    img: 'images/more_comparison.jpg',
    caption: 'SVGs produced by DiffVG, LIVE, LIVSS, and Lang-SVG under the same point budget. Our SVGs better align with the target images and preserve more coherent visual structures.',
  },
  {
    key: 'cmp64',
    title: 'More comparisons under a lower point budget',
    img: 'images/more_comparison_64.jpg',
    caption: 'Under a lower point budget, Lang-SVG still produces SVGs with better visual fidelity and more coherent structure.',
  },
  {
    key: 'tag',
    title: 'More semantic SVG tagging results',
    img: 'images/more_tagging.jpg',
    caption: 'Additional semantic tags predicted for SVG components by our tree-guided semantic assignment.',
  },
]
</script>

<template>
  <div class="section">
    <div class="sub-heading"><h3>More results</h3><span /></div>
    <el-collapse v-model="open" class="more">
      <el-collapse-item v-for="p in panels" :key="p.key" :name="p.key" :title="p.title">
        <figure class="figure-card">
          <img v-if="open.includes(p.key)" :src="base + p.img" :alt="p.title" loading="lazy" />
          <figcaption>{{ p.caption }}</figcaption>
        </figure>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.section {
  padding-top: 8px;
}

.more {
  border: none;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
  --el-collapse-header-height: 56px;
  --el-collapse-header-font-size: 17px;
}

.more :deep(.el-collapse-item__header) {
  font-family: var(--font);
  font-weight: 650;
  color: var(--ink);
}
</style>

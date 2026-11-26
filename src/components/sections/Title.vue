<script setup>
import { Document, Link, VideoPlay } from '@element-plus/icons-vue'


const authors = [
  { name: 'Xi Liu', aff: '1', homepage: 'https://xiliu8006.github.io/' },
  { name: 'Chaoyi Zhou', aff: '1' },
  { name: 'Run Wang', aff: '1' },
  { name: 'Jiaang Li', aff: '2' },
  { name: 'Feng Luo', aff: '1' },
  { name: 'Junxiang Huang', aff: '3' },
  { name: 'Siyu Huang', aff: '1*' },
]

const affiliations = [
  { flag: '1', name: 'Clemson University' },
  { flag: '2', name: 'University of Copenhagen' },
  { flag: '3', name: 'eBay' },
]

const buttons = [
  { name: 'Paper (arXiv)', link: 'https://arxiv.org/abs/2611.15941', icon: Document, disabled: false },
  { name: 'Video', link: '#video', icon: VideoPlay, disabled: false },
  { name: 'Code', link: 'https://github.com/xiliu8006/Lang-SVG', icon: Link, disabled: false },
]
</script>

<template>
  <div class="title-section">
    <div class="title-content">
      <div class="venue">NeurIPS 2026</div>
      <h1 class="paper-heading">
        <span class="project-name">Lang-SVG:</span>
        Hierarchical Image Vectorization with Language Priors
      </h1>

      <div class="author-list">
        <component
          :is="a.homepage ? 'a' : 'span'"
          v-for="a in authors"
          :key="a.name"
          class="author"
          :href="a.homepage"
          :target="a.homepage ? '_blank' : undefined"
          :rel="a.homepage ? 'noopener' : undefined"
        >
          {{ a.name }}<sup>{{ a.aff }}</sup>
        </component>
      </div>

      <div class="aff-list">
        <span v-for="f in affiliations" :key="f.flag"><sup>{{ f.flag }}</sup>{{ f.name }}</span>
      </div>
      <div class="corresponding">*Corresponding author</div>

      <div class="button-row">
        <template v-for="b in buttons" :key="b.name">
          <a
            v-if="!b.disabled"
            :href="b.link"
            :target="b.link.startsWith('#') ? undefined : '_blank'"
            rel="noopener"
          >
            <el-button class="guide-btn" color="#1d2327" size="large" round>
              <el-icon :size="18"><component :is="b.icon" /></el-icon>
              <span class="btn-text">{{ b.name }}</span>
            </el-button>
          </a>
          <el-button v-else class="guide-btn" color="#1d2327" size="large" round disabled>
            <el-icon :size="18"><component :is="b.icon" /></el-icon>
            <span class="btn-text">{{ b.name }}</span>
            <span class="soon">soon</span>
          </el-button>
        </template>
      </div>

      <p class="tldr">
        Lang-SVG turns a natural image into a <b>tree of SVG primitives</b>, where every node
        carries a <b>language tag</b> and a parent–child relation, so the vector graphic follows the
        object → part → subpart structure people actually perceive.
      </p>
    </div>
  </div>
</template>

<style scoped>
.title-section {
  background: var(--paper);
  padding: 40px 22px 44px;
}

.title-content {
  max-width: 1180px;
  margin: 0 auto;
  text-align: center;
}

.venue {
  display: inline-block;
  margin-bottom: 18px;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.paper-heading {
  max-width: 1080px;
  margin: 0 auto;
  font-size: clamp(30px, 3.6vw, 56px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.project-name {
  color: var(--accent);
  font-weight: 800;
}

.author-list {
  margin: 30px auto 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 26px;
}

.author {
  color: var(--ink);
  font-size: clamp(18px, 1.7vw, 24px);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 2px;
}

a.author:hover {
  color: var(--accent);
  border-color: var(--accent);
}

sup {
  margin-left: 1px;
  font-size: 0.62em;
  color: var(--muted);
}

.aff-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 26px;
  color: #555;
  font-size: clamp(16px, 1.5vw, 20px);
}

.corresponding {
  margin: 10px 0 26px;
  color: var(--muted);
  font-size: 14px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.button-row a {
  text-decoration: none;
}

.guide-btn {
  height: 52px;
  min-width: 128px;
  padding: 0 22px;
  border-radius: 12px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

a .guide-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.13);
}

.guide-btn.is-disabled {
  background: #fff !important;
  border: 1px solid #dedede !important;
  color: #252a2d !important;
  opacity: 0.8;
}

.btn-text {
  margin-left: 7px;
  font-size: 18px;
  font-weight: 650;
}

.soon {
  margin-left: 8px;
  padding: 1px 7px;
  border-radius: 6px;
  background: #f0eee9;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.tldr {
  max-width: 1040px;
  margin: 46px auto 0;
  color: #202427;
  font-size: clamp(18px, 1.9vw, 26px);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.02em;
}

.tldr b {
  color: var(--accent);
  font-weight: 700;
}

@media (max-width: 480px) {
  .title-section { padding: 30px 16px; }
  .guide-btn { min-width: 100px; height: 44px; padding: 0 12px; }
  .btn-text { font-size: 14px; }
}
</style>

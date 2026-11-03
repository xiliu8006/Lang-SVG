<script setup>
const base = import.meta.env.BASE_URL

const highlights = [
  { value: '0.462 → 0.506', label: 'StructXLIP structural score on ADE20K (576 points)' },
  { value: '28.8 → 48.5', label: 'Average part recall of SVG regions vs. human part masks' },
  { value: '58.5% → 81.3%', label: 'MLLM primitive-label accuracy when given SVG tree context' },
]
</script>

<template>
  <div class="section">
    <figure class="figure-card">
      <img :src="`${base}images/teaser.jpg`" alt="Lang-SVG teaser: an image vectorized into a hierarchical, language-tagged SVG tree" />
      <figcaption>
        <b>Lang-SVG</b> vectorizes natural images into hierarchical object–part SVGs with language
        labels. Primitives are organized from background to fine-grained layers, and each object
        (e.g., <i>car</i>) branches into its parts (<i>window</i>, <i>door</i>, <i>tire</i>).
      </figcaption>
    </figure>

    <div class="stats">
      <div v-for="h in highlights" :key="h.value" class="stat">
        <div class="stat-value">{{ h.value }}</div>
        <div class="stat-label">{{ h.label }}</div>
      </div>
    </div>

    <div class="sub-heading"><h3>Abstract</h3><span /></div>
    <p class="body-text abstract">
      Image vectorization reconstructs raster images as compact scalable vector graphics (SVG),
      offering a route to representing natural scenes as structured, editable code. However, most
      existing vectorization methods optimize for pixel-level rendering fidelity, where the
      reconstructed SVGs often lack alignment with human-perceived object-part hierarchies, making
      semantic manipulation of the resulting code difficult. To address this, this work for the
      first time studies the problems of hierarchical image vectorization and SVG semantic
      labeling. We propose Lang-SVG, a tree-structured SVG representation that encodes SVG
      primitives with language tags and parent-child hierarchy. Lang-SVG novelly incorporates
      granularity-controllable segmentation priors and vision-language priors into the
      optimization-based vectorization pipeline. It introduces a Tree-Guided Pruning and Merging
      module to reduce redundant multi-granularity SVG primitives into coherent semantic
      structures, and an L1-SAM Prompter to recover missing regions. It also includes a new SVG
      semantic tagging method that integrates SVG tree context into multimodal large language
      models (MLLMs) to assign language tags to SVG primitives. We also propose a new evaluation
      protocol for image vectorization, measuring structural quality and semantic part alignment
      beyond reconstruction fidelity. Experiments demonstrate that Lang-SVG achieves
      state-of-the-art performance in both rendering and structural quality.
    </p>
  </div>
</template>

<style scoped>
.stats {
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat {
  padding: 20px 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  text-align: center;
}

.stat-value {
  color: var(--accent);
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.stat-label {
  margin-top: 6px;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.5;
}

.abstract {
  margin: 0;
  text-align: justify;
  hyphens: auto;
}

@media (max-width: 760px) {
  .stats { grid-template-columns: 1fr; }
}
</style>

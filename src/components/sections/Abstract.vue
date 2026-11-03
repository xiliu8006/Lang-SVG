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
        branches into its parts, e.g., <i>car</i> → <i>window</i>, <i>door</i>, <i>tire</i> and
        <i>road</i> → <i>lane divider</i>, <i>road texture</i>.
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
      providing a structured and editable code representation of images. However, most existing
      vectorization methods optimize for pixel-level rendering fidelity, often producing SVGs that
      lack alignment with human-perceived object-part hierarchies, making them difficult to
      manipulate. To address this, we propose Lang-SVG, which introduces an explicit tree structure
      to organize SVG primitives with semantic labels and parent-child relationships. Lang-SVG
      incorporates granularity-controllable and open-vocabulary segmentation priors to initialize
      object-part hierarchies and leverages multimodal large language models (MLLMs) with SVG tree
      context to assign semantic labels to unlabeled nodes. To reduce redundancy, we introduce
      depth-adaptive simplification to reduce shape complexity and Tree-Guided Pruning and Merging
      to eliminate redundant SVG nodes. An L1-SAM Prompter further recovers missing regions to
      improve reconstruction fidelity and structural completeness. Beyond reconstruction fidelity,
      we introduce a new evaluation protocol that measures structural quality and semantic part
      alignment. Experiments demonstrate that Lang-SVG achieves state-of-the-art performance in
      both rendering fidelity and structural quality.
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

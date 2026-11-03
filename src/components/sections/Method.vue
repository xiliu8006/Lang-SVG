<script setup>
const base = import.meta.env.BASE_URL

const steps = [
  {
    n: '01',
    title: 'SVG tree construction',
    text: 'An open-vocabulary or part-aware segmenter provides labeled masks as the initial tree nodes. Granularity-controllable models (e.g., Semantic-SAM) add coarse-to-fine masks with an unknown tag; each mask is inserted under the deepest node that spatially contains it.',
  },
  {
    n: '02',
    title: 'Depth-adaptive simplification',
    text: 'Masks are converted to Bézier regions with a tolerance that depends on tree depth: occluded nodes near the root get simpler polygons, leaves keep fine boundaries, so the control-point budget goes where it is visible.',
  },
  {
    n: '03',
    title: 'L1-SAM Prompter',
    text: 'Between structure and appearance optimization, clusters of the ℓ1 reconstruction residual are turned into box and point prompts for SAM, recovering coherent missing regions instead of fitting high-frequency texture noise.',
  },
  {
    n: '04',
    title: 'Tree-guided pruning & merging',
    text: 'Unlabeled children whose SVG color matches their parent are pruned, and similar overlapping nodes in the same semantic branch are merged. Semantically tagged nodes are always preserved.',
  },
  {
    n: '05',
    title: 'Tree-aware MLLM tagging',
    text: 'For each unknown node, an MLLM (Qwen3.5-27B) sees the full image, the target crop, parent / sibling / child tags and layout, and SVG color statistics, then predicts a closed-set or open-vocabulary tag.',
  },
]
</script>

<template>
  <div class="section">
    <div class="section-kicker" aria-hidden="true"><i /><i /><i /><i /></div>
    <h2 class="section-title">The Framework</h2>
    <p class="section-lead">
      Lang-SVG represents an image as a tree <i>T</i> = (<i>V</i>, <i>E</i>, <i>r</i>), where every
      node stores a semantic tag, a semantic mask, and the SVG primitives that render it. The tree
      is built from segmentation priors, refined by differentiable SVG optimization, and finally
      labeled with vision-language priors.
    </p>

    <figure class="figure-card framework">
      <img :src="`${base}images/framework.jpg`" alt="Overview of the Lang-SVG framework" />
      <figcaption>
        <b>Overview of Lang-SVG.</b> Given an input image, we initialize a hierarchical Lang-SVG
        tree from multi-granularity and open-vocabulary segmentation masks. The tree is iteratively
        refined through differentiable SVG optimization, L1-SAM prompting to recover missing
        regions, and Add &amp; Prune operations to add new leaves and prune redundant ones.
      </figcaption>
    </figure>

    <div class="steps">
      <article v-for="s in steps" :key="s.n" class="step">
        <div class="step-n">{{ s.n }}</div>
        <h4>{{ s.title }}</h4>
        <p>{{ s.text }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.framework {
  margin-top: 32px;
}

.steps {
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
}

.step {
  padding: 20px 18px 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.step-n {
  color: var(--gold);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.step h4 {
  margin: 6px 0 8px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.step p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 14.5px;
  line-height: 1.6;
}
</style>

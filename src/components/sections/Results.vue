<script setup>
import { ref } from 'vue'
import SliderGallery from './SliderGallery.vue'

const base = import.meta.env.BASE_URL

// ADE20K, "Same points" protocol (Table 1 of the paper).
// Each row: [SSIM, PSNR, LPIPS, S-XLIP, CLIP]
const budgets = {
  576: {
    label: '576 points / 64 curves',
    rows: [
      ['LIVE', 0.631, 21.28, 0.468, 0.420, 0.625],
      ['LIVSS', 0.598, 19.50, 0.490, 0.379, 0.609],
      ['DiffVG', 0.624, 21.81, 0.472, 0.290, 0.597],
      ['SGLIVE', 0.633, 21.38, 0.464, 0.462, 0.634],
      ['Lang-SVG (Ours)', 0.638, 21.88, 0.436, 0.506, 0.651],
    ],
  },
  1152: {
    label: '1152 points / 128 curves',
    rows: [
      ['LIVE', 0.680, 23.16, 0.394, 0.582, 0.692],
      ['LIVSS', 0.643, 21.48, 0.421, 0.531, 0.664],
      ['DiffVG', 0.667, 23.29, 0.407, 0.437, 0.658],
      ['SGLIVE', 0.681, 23.32, 0.385, 0.610, 0.694],
      ['Lang-SVG (Ours)', 0.694, 24.07, 0.360, 0.655, 0.717],
    ],
  },
  2304: {
    label: '2304 points / 256 curves',
    rows: [
      ['LIVE', 0.739, 25.45, 0.302, 0.748, 0.764],
      ['LIVSS', 0.707, 24.12, 0.336, 0.695, 0.734],
      ['DiffVG', 0.716, 24.83, 0.332, 0.629, 0.745],
      ['SGLIVE', 0.732, 25.04, 0.305, 0.731, 0.752],
      ['Lang-SVG (Ours)', 0.746, 25.90, 0.291, 0.775, 0.777],
    ],
  },
}

// Part-mask recall on ADE20K-Part234, Same points protocol (Table 2).
// Each row: [R@.3, R@.5, R@.7, R@.8, Avg.R]
const recall = {
  576: [
    ['LIVE', 42.4, 17.2, 5.2, 2.7, 16.9],
    ['DiffVG', 43.1, 13.0, 2.8, 0.7, 14.9],
    ['LIVSS', 49.9, 33.4, 19.7, 12.2, 28.8],
    ['SGLIVE', 42.8, 18.4, 6.2, 3.5, 17.7],
    ['Lang-SVG (Ours)', 75.1, 60.5, 37.2, 21.1, 48.5],
  ],
  1152: [
    ['LIVE', 51.3, 20.5, 4.7, 1.9, 19.6],
    ['DiffVG', 46.7, 13.6, 2.8, 0.8, 16.0],
    ['LIVSS', 65.4, 51.7, 30.7, 17.8, 41.4],
    ['SGLIVE', 50.5, 21.9, 6.2, 2.9, 20.4],
    ['Lang-SVG (Ours)', 85.1, 70.7, 44.0, 26.3, 56.5],
  ],
  2304: [
    ['LIVE', 56.9, 23.3, 6.8, 2.8, 22.4],
    ['DiffVG', 49.5, 12.6, 2.1, 0.7, 16.2],
    ['LIVSS', 79.3, 61.8, 35.4, 20.1, 49.1],
    ['SGLIVE', 57.4, 23.4, 5.6, 2.7, 22.3],
    ['Lang-SVG (Ours)', 94.3, 79.3, 51.3, 31.8, 64.2],
  ],
}

const fidelityCols = [
  { name: 'SSIM ↑', lower: false, digits: 3 },
  { name: 'PSNR ↑', lower: false, digits: 2 },
  { name: 'LPIPS ↓', lower: true, digits: 3 },
  { name: 'S-XLIP ↑', lower: false, digits: 3 },
  { name: 'CLIP ↑', lower: false, digits: 3 },
]
const recallCols = ['R@.3 ↑', 'R@.5 ↑', 'R@.7 ↑', 'R@.8 ↑', 'Avg.R ↑'].map((name) => ({
  name,
  lower: false,
  digits: 1,
}))

const active = ref('576')

// Rank of value within its column: 1 = best, 2 = second best, else 0.
const rankOf = (rows, col, value, lower) => {
  const sorted = [...new Set(rows.map((r) => r[col + 1]))].sort((a, b) => (lower ? a - b : b - a))
  const idx = sorted.indexOf(value)
  return idx === 0 ? 1 : idx === 1 ? 2 : 0
}
</script>

<template>
  <div class="section">
    <div class="section-kicker" aria-hidden="true"><i /><i /><i /><i /></div>
    <h2 class="section-title">Results</h2>
    <p class="section-lead">
      Compared with DiffVG, LIVE, LIVSS and SGLIVE under the same control-point budget, Lang-SVG
      reconstructs images with higher fidelity while its SVG regions follow object and part
      boundaries far more closely.
    </p>

    <SliderGallery />

    <div class="sub-heading"><h3>Image vectorization comparison</h3><span /></div>
    <figure class="figure-card">
      <img :src="`${base}images/comparison.jpg`" alt="Qualitative comparison with DiffVG, LIVE and LIVSS" loading="lazy" />
      <figcaption>
        <b>Image vectorization comparison.</b> Our SVGs better align with the ground-truth image in
        both reconstruction fidelity and semantic structure, preserving object-level regions and
        fine structural details.
      </figcaption>
    </figure>

    <div class="sub-heading"><h3>Quantitative evaluation on ADE20K</h3><span /></div>
    <div class="budget-switch" role="tablist" aria-label="Control-point budget">
      <button
        v-for="(b, key) in budgets"
        :key="key"
        role="tab"
        :aria-selected="active === key"
        :class="{ on: active === key }"
        @click="active = key"
      >
        {{ b.label }}
      </button>
    </div>

    <div class="table-grid">
      <div class="table-card">
        <h4>Reconstruction &amp; structural quality</h4>
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Method</th><th v-for="c in fidelityCols" :key="c.name">{{ c.name }}</th></tr>
            </thead>
            <tbody>
              <tr v-for="r in budgets[active].rows" :key="r[0]" :class="{ ours: r[0].startsWith('Lang') }">
                <td>{{ r[0] }}</td>
                <td
                  v-for="(c, i) in fidelityCols"
                  :key="c.name"
                  :class="'rank' + rankOf(budgets[active].rows, i, r[i + 1], c.lower)"
                >
                  {{ r[i + 1].toFixed(c.digits) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-card">
        <h4>Part-mask recall (ADE20K-Part234)</h4>
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Method</th><th v-for="c in recallCols" :key="c.name">{{ c.name }}</th></tr>
            </thead>
            <tbody>
              <tr v-for="r in recall[active]" :key="r[0]" :class="{ ours: r[0].startsWith('Lang') }">
                <td>{{ r[0] }}</td>
                <td
                  v-for="(c, i) in recallCols"
                  :key="c.name"
                  :class="'rank' + rankOf(recall[active], i, r[i + 1], false)"
                >
                  {{ r[i + 1].toFixed(1) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p class="table-note">
      Same-points protocol; best in blue, second best in beige. S-XLIP denotes StructXLIP, a
      CLIP-based model fine-tuned for structural understanding. R@t is the percentage of
      ground-truth part masks whose best-matching SVG region reaches IoU ≥ t. Full tables, including
      the same-paths protocol and COCO-AOKVQA, are in the paper.
    </p>

    <div class="sub-heading"><h3>Qualitative results</h3><span /></div>
    <figure class="figure-card">
      <img :src="`${base}images/qualitative.jpg`" alt="Qualitative results of Lang-SVG at different budgets" loading="lazy" />
      <figcaption>
        <b>Qualitative results.</b> Our hierarchical SVG representation preserves both visual
        fidelity and semantic structure across diverse scenes. Even under sparse budgets the
        components stay aligned with salient object parts, while higher budgets further recover fine
        details and textures. Insets show the input images.
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.budget-switch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 18px;
}

.budget-switch button {
  padding: 9px 18px;
  border: 1.5px solid #cfccc6;
  border-radius: 999px;
  background: #fff;
  color: var(--ink-soft);
  font: 600 15px var(--font);
  cursor: pointer;
  transition: all 0.15s ease;
}

.budget-switch button.on {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  gap: 16px;
}

.table-card {
  padding: 16px 16px 10px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  min-width: 0;
}

.table-card h4 {
  margin: 2px 0 10px;
  font-size: 16px;
  font-weight: 700;
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  font-variant-numeric: tabular-nums;
}

th,
td {
  padding: 8px 8px;
  text-align: center;
  white-space: nowrap;
}

th:first-child,
td:first-child {
  text-align: left;
}

thead th {
  border-bottom: 1.5px solid var(--ink);
  font-weight: 700;
}

tbody tr + tr td {
  border-top: 1px solid #f0eee9;
}

tr.ours td {
  font-weight: 700;
}

td.rank1 {
  background: var(--best);
}

td.rank2 {
  background: var(--second);
}

.table-note {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.6;
}

@media (max-width: 520px) {
  .table-grid { grid-template-columns: 1fr; }
  table { font-size: 13px; }
}
</style>

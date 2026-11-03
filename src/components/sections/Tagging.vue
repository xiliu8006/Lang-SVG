<script setup>
const base = import.meta.env.BASE_URL

// Masked-label prediction on ADE20K-Part nodes (Table 4 of the paper).
const cues = ['Full image', 'Crop image', 'Object / parent tags', 'Sibling / child tags', 'Geometry', 'Color']
const ablation = [
  { id: 'A0', on: [1, 1, 0, 0, 0, 0], acc: 58.5 },
  { id: 'A1', on: [1, 1, 1, 0, 0, 0], acc: 67.7 },
  { id: 'A2', on: [1, 1, 1, 1, 0, 0], acc: 68.9 },
  { id: 'A3', on: [1, 1, 1, 1, 1, 0], acc: 80.2 },
  { id: 'A4', on: [1, 1, 1, 1, 1, 1], acc: 81.3, ours: true },
  { id: 'A5', on: [1, 0, 1, 1, 1, 1], acc: 69.2, control: true },
  { id: 'A6', on: [0, 0, 1, 1, 1, 1], acc: 60.7, control: true },
]
</script>

<template>
  <div class="section">
    <div class="sub-heading"><h3>Semantic SVG tagging</h3><span /></div>
    <p class="body-text intro">
      As the tree is refined, many fine regions are not covered by the initial open-vocabulary
      labels. Lang-SVG asks an MLLM to name them, conditioned on the SVG tree: the parent tag sets
      the semantic scope, while sibling and child tags plus their layout disambiguate the target.
      Ambiguous nodes fall back to a <i>texture</i> / <i>unknown</i> tag instead of being forced
      into a wrong category.
    </p>

    <figure class="figure-card">
      <img :src="`${base}images/tagging.jpg`" alt="Semantic SVG tagging examples" loading="lazy" />
      <img class="second" :src="`${base}images/tagging_qwen.jpg`" alt="Semantic SVG tagging examples with Qwen3.5-27B" loading="lazy" />
      <figcaption>
        <b>Semantic SVG tagging.</b> Tree context and Qwen3.5-27B predict the unknown tags of SVG
        components; only components whose tags belong to the target object are rendered. The tail
        region is predicted as <i>“bird tail”</i>, while a smaller sub-region inside it is further
        recognized as the <i>“texture”</i> of the bird tail.
      </figcaption>
    </figure>

    <div class="table-card">
      <h4>Does the SVG tree help the MLLM? Masked-label accuracy on ADE20K-Part</h4>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th v-for="c in cues" :key="c">{{ c }}</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in ablation"
              :key="r.id"
              :class="{ ours: r.ours, control: r.control }"
            >
              <td>{{ r.id }}</td>
              <td v-for="(v, i) in r.on" :key="i">{{ v ? '✓' : '' }}</td>
              <td class="acc">
                <span class="bar" :style="{ width: `calc((100% - 90px) * ${r.acc / 100})` }" />
                <span class="acc-num">{{ r.acc.toFixed(1) }}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="note">
        Adding hierarchy (A1–A2) and especially the geometric layout of parent, sibling and child
        regions (A3) raises accuracy from 58.5% to 81.3%. Negative controls A5–A6 show that neither
        tree metadata alone nor pixels alone reach the full result.
      </p>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding-top: 8px;
}

.intro {
  margin: 0 0 22px;
}

.figure-card .second {
  margin-top: 12px;
}

.table-card {
  margin-top: 18px;
  padding: 18px 18px 8px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.table-card h4 {
  margin: 0 0 12px;
  font-size: 16.5px;
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
  padding: 8px 10px;
  text-align: center;
  white-space: nowrap;
}

thead th {
  border-bottom: 1.5px solid var(--ink);
  font-weight: 700;
  font-size: 13.5px;
}

tbody tr + tr td {
  border-top: 1px solid #f0eee9;
}

tr.ours td {
  background: var(--best);
  font-weight: 700;
}

tr.control td {
  color: var(--muted);
}

tbody tr:nth-child(6) td {
  border-top: 1.5px dashed #cfccc6;
}

td.acc {
  position: relative;
  min-width: 180px;
  text-align: left;
}

.bar {
  position: absolute;
  left: 10px;
  top: 50%;
  height: 10px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: linear-gradient(90deg, #8fb4d8, var(--accent));
  opacity: 0.85;
}

tr.control .bar {
  background: #cfccc6;
}

.acc-num {
  position: relative;
  float: right;
}

.note {
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.6;
}
</style>

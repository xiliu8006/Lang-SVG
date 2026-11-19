<script setup>
import { ElMessage } from 'element-plus'

const bibtex = `@inproceedings{liu2026langsvg,
  title     = {Lang-SVG: Hierarchical Image Vectorization with Language Priors},
  author    = {Liu, Xi and Zhou, Chaoyi and Wang, Run and Li, Jiaang and
               Luo, Feng and Huang, Junxiang and Huang, Siyu},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  year      = {2026},
  eprint    = {2611.15941},
  archivePrefix = {arXiv}
}`

const copy = async () => {
  try {
    await navigator.clipboard.writeText(bibtex)
    ElMessage({ message: 'BibTeX copied', type: 'success', duration: 1500 })
  } catch {
    ElMessage({ message: 'Copy failed — please select the text manually', type: 'warning' })
  }
}
</script>

<template>
  <div class="section">
    <div class="section-kicker" aria-hidden="true"><i /><i /><i /><i /></div>
    <h2 class="section-title">BibTeX</h2>
    <div class="bib-card">
      <button class="copy" type="button" @click="copy">Copy</button>
      <pre><code>{{ bibtex }}</code></pre>
    </div>

    <div class="sub-heading"><h3>Acknowledgments</h3><span /></div>
    <p class="body-text ack">
      This research was supported in part by the eBay eRUPT program and the SC NASA EPSCoR Research
      Grant Program (No. 21-117-RGP-CU-011). This research used in part resources on the Palmetto
      Cluster at Clemson University under NSF awards MRI 1228312, II NEW 1405767, MRI 1725573, and
      MRI 2018069. JL is supported by DNRF grant P1. The views expressed in this article do not
      necessarily represent the views of any funders.
    </p>
  </div>
</template>

<style scoped>
.bib-card {
  position: relative;
  max-width: 860px;
  margin: 24px auto 0;
  padding: 18px 20px;
  background: #f3f2ef;
  border: 1px solid var(--line);
  border-radius: 14px;
}

pre {
  margin: 0;
  overflow-x: auto;
  font-size: 14.5px;
  line-height: 1.6;
}

.copy {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 14px;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  background: #fff;
  font: 600 13px var(--font);
  cursor: pointer;
}

.copy:hover {
  background: var(--ink);
  color: #fff;
}

.ack {
  font-size: 15px;
  color: var(--muted);
}
</style>

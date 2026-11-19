<script setup>
import { computed, ref, watch } from 'vue'

const base = import.meta.env.BASE_URL

// ADE20K-Part234 validation photos and their Lang-SVG vectorizations at a 2304-point budget
// (files in public/slider/, see README). w / h: SVG canvas size; paths: number of SVG paths.
const cases = [
  { id: '00000648', w: 256, h: 256, paths: 340, psnr: 30.01 },
  { id: '00001127', w: 681, h: 512, paths: 306, psnr: 30.08 },
  { id: '00001574', w: 640, h: 480, paths: 312, psnr: 30.63 },
  { id: '00000084', w: 683, h: 512, paths: 327, psnr: 32.25 },
  { id: '00000077', w: 400, h: 600, paths: 332, psnr: 31.39 },
  { id: '00001102', w: 512, h: 683, paths: 331, psnr: 32.81 },
  { id: '00000482', w: 256, h: 256, paths: 346, psnr: 28.03 },
  { id: '00001486', w: 640, h: 480, paths: 332, psnr: 31.53 },
  { id: '00000470', w: 683, h: 512, paths: 308, psnr: 30.25 },
  { id: '00000487', w: 576, h: 432, paths: 327, psnr: 28.72 },
  { id: '00000884', w: 256, h: 256, paths: 358, psnr: 27.64 },
]

const idx = ref(0)
const pos = ref(50) // divider position, % from the left
const dragging = ref(false)
const stage = ref(null)

const cur = computed(() => cases[idx.value])
const photo = (c) => `${base}slider/${c.id}.jpg`
const svg = (c) => `${base}slider/${c.id}.svg`

// Fit the stage into 960 x 620 px while keeping the image's aspect ratio.
const stageStyle = computed(() => {
  const a = cur.value.w / cur.value.h
  return { aspectRatio: `${cur.value.w} / ${cur.value.h}`, width: `min(100%, 960px, ${Math.round(620 * a)}px)` }
})

watch(idx, () => { pos.value = 50 })

const setFromEvent = (e) => {
  const r = stage.value.getBoundingClientRect()
  pos.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
}
const down = (e) => {
  dragging.value = true
  stage.value.setPointerCapture(e.pointerId)
  setFromEvent(e)
}
const move = (e) => { if (dragging.value) setFromEvent(e) }
const up = () => { dragging.value = false }

const key = (e) => {
  const step = e.shiftKey ? 10 : 2
  if (e.key === 'ArrowLeft') pos.value = Math.max(0, pos.value - step)
  else if (e.key === 'ArrowRight') pos.value = Math.min(100, pos.value + step)
  else if (e.key === 'Home') pos.value = 0
  else if (e.key === 'End') pos.value = 100
  else return
  e.preventDefault()
}

const go = (d) => { idx.value = (idx.value + d + cases.length) % cases.length }
</script>

<template>
  <div class="slider-block">
    <div class="sub-heading"><h3>Photo vs. Lang-SVG</h3><span /></div>
    <p class="body-text intro">
      Drag the divider to compare an input photo (right) with its Lang-SVG vectorization (left), a
      2304-point SVG of about 300 tagged paths. The SVG side stays sharp at any zoom.
    </p>

    <div class="viewer">
      <button class="nav prev" type="button" aria-label="Previous example" @click="go(-1)">‹</button>

      <div
        ref="stage"
        class="stage"
        :class="{ dragging }"
        :style="stageStyle"
        @pointerdown="down"
        @pointermove="move"
        @pointerup="up"
        @pointercancel="up"
      >
        <img class="layer" :src="photo(cur)" :alt="`ADE20K photo ${cur.id}`" draggable="false" />
        <img
          class="layer"
          :src="svg(cur)"
          :alt="`Lang-SVG vectorization of ADE20K photo ${cur.id}`"
          draggable="false"
          :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }"
        />
        <span class="tag left" :style="{ opacity: pos > 12 ? 1 : 0 }">Lang-SVG (ours)</span>
        <span class="tag right" :style="{ opacity: pos < 88 ? 1 : 0 }">Input photo</span>
        <div class="divider" :style="{ left: `${pos}%` }">
          <div
            class="knob"
            role="slider"
            tabindex="0"
            aria-label="Divider between Lang-SVG and photo"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="Math.round(pos)"
            @keydown="key"
          >
            <span aria-hidden="true">‹ ›</span>
          </div>
        </div>
      </div>

      <button class="nav next" type="button" aria-label="Next example" @click="go(1)">›</button>
    </div>

    <div class="meta">
      ADE_val_{{ cur.id }} · {{ cur.paths }} paths · 2304 control points · PSNR {{ cur.psnr.toFixed(2) }} dB
    </div>

    <div class="thumbs" role="tablist" aria-label="Examples">
      <button
        v-for="(c, i) in cases"
        :key="c.id"
        type="button"
        role="tab"
        :aria-selected="i === idx"
        :class="{ on: i === idx }"
        @click="idx = i"
      >
        <img :src="photo(c)" :alt="`Example ${i + 1}`" loading="lazy" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.intro {
  margin: 0 0 20px;
}

.viewer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.stage {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #eceae6;
  min-width: 0;
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}

.tag {
  position: absolute;
  top: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(20, 22, 24, 0.68);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.tag.left { left: 12px; }
.tag.right { right: 12px; }

.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  margin-left: -1.5px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18);
  pointer-events: none;
}

.knob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 42px;
  height: 42px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: var(--ink);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.05em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  cursor: ew-resize;
  transition: transform 0.15s ease;
}

.knob:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.stage.dragging .knob {
  transform: translate(-50%, -50%) scale(1.1);
}

.nav {
  flex: none;
  width: 40px;
  height: 40px;
  border: 1.5px solid #cfccc6;
  border-radius: 50%;
  background: #fff;
  color: var(--ink);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.nav:hover {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}

.meta {
  margin-top: 10px;
  text-align: center;
  color: var(--muted);
  font-size: 13.5px;
  font-variant-numeric: tabular-nums;
}

.thumbs {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.thumbs button {
  width: 76px;
  height: 56px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  background: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s ease, border-color 0.15s ease;
}

.thumbs button:hover { opacity: 0.9; }

.thumbs button.on {
  border-color: var(--accent);
  opacity: 1;
}

.thumbs img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .nav { display: none; }
  .thumbs button { width: 58px; height: 44px; }
}
</style>

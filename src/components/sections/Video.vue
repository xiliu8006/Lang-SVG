<script setup>
const base = import.meta.env.BASE_URL
</script>

<template>
  <div class="section">
    <div class="section-kicker" aria-hidden="true"><i /><i /><i /><i /></div>
    <h2 class="section-title">Video</h2>
    <div class="video-card">
      <video
        controls
        playsinline
        preload="metadata"
        :poster="`${base}videos/langsvg_explainer_poster.jpg`"
      >
        <source :src="`${base}videos/langsvg_explainer.mp4`" type="video/mp4" />
        <track kind="captions" srclang="en" label="English" :src="`${base}videos/langsvg_explainer.vtt`" />
        Your browser does not support HTML5 video.
        <a :href="`${base}videos/langsvg_explainer.mp4`">Download the video</a>.
      </video>
    </div>
    <p class="video-note">A 5-minute walkthrough of Lang-SVG, narrated, with English captions.</p>
  </div>
</template>

<style scoped>
.video-card {
  margin-top: 24px;
  border-radius: 14px;
  overflow: hidden;
  background: #0b0b0c;
  border: 1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0b0b0c;
}

.video-note {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 13.5px;
  text-align: center;
}
</style>

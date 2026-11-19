# Lang-SVG project page

Project page for **Lang-SVG: Hierarchical Image Vectorization with Language Priors** (NeurIPS 2026).

Live site: https://xiliu8006.github.io/Lang-SVG/

## Develop

```bash
npm install
npm run dev      # local preview
npm run build    # static build in dist/
```

Pushing to `main` builds the site and deploys it with GitHub Actions
(`.github/workflows/deploy.yml`). In the repository settings, Pages must use
**Source: GitHub Actions**.

## Editing content

- Authors, buttons (Paper (arXiv) / Video / Code): `src/components/sections/Title.vue`
- Explainer video: `src/components/sections/Video.vue`, files in `public/videos/` (mp4, captions .vtt, poster)
- Photo vs. SVG slider: `src/components/sections/SliderGallery.vue`, files in `public/slider/`
  (ADE20K photos + Lang-SVG, 2304 points)
- Method summary: `src/components/sections/Method.vue`
- Result tables and figures: `src/components/sections/Results.vue`, `Tagging.vue`, `MoreResults.vue`
- Figures and paper PDF: `public/images/`, `public/Lang-SVG.pdf`

## License

The page layout is adapted from
[academic-project-page-template-vue](https://github.com/JunyaoHu/academic-project-page-template-vue)
and is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Paper content and figures © the Lang-SVG authors.

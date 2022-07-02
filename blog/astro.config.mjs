import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: import.meta.site,
  markdown: {
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      "remark-math"
    ],
    rehypePlugins: [
      "rehype-katex"
    ]
  }
});
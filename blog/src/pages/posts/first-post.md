---
title: "Hello Astro!"
description: "I'll post some pictures here to kick off this website."
pubDate: "Sat, 06 Nov 2021"
author: "CM-IV"
layout: "../../layouts/blogPost.astro"
draft: false
---

This is the first post on the website built with [Astro](https://astro.build). I recently discovered the static site generator a few days ago, and I have decided to ditch Gatsby for Astro instead. Astro tries to keep JavaScript off of the built website that is hosted and shown to the public internet. This keeps the website speed insanely quick with minimal JavaScript needed. You can also use your favorite JavaScript Framework in its development before deployment to speed up the process. I usually go with the [Preact](https://preactjs.com) web framework, however with this website I have decided to not use a framework at all.
Astro allows the developer to use TSX/JSX features natively without those other frameworks. It also helps that the fine people at [Snowpack](https://snowpack.dev) are the ones working on the project.

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/woods_7_1ezMKyk.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1637081404066" alt="The Ozark Mountains" />

I decided to go with Markdown to write the posts on this website, as the syntax is simpler than regular HTML.
The markdown posts displayed here are mapped through and then rendered into a preview component that lists cards out onto the page.
The sorted and reversed posts are then mapped to the card components onto the posts page.
You, the reader, can then click on any of the cards to read the post, which is also based on another component. The Markdown posts are fetched
from the post folder and then sorted according to the id frontmatter within the file. Below is the code that shows the markdown posts being mapped to the card component.

```javascript
<html lang="en">
  <Wrapper>
    <div class="box">
      <section class="hero">
        <header>
          <div class="hero-body">
            <p class="title">Latest News</p>
          </div>
        </header>
      </section>
    </div>

    {allPosts.map((p) => (
      <BlogPostPreview post={p} client:visible />
    ))}
  </Wrapper>
</html>
```

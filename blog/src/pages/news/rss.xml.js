import rss from "@astrojs/rss";

const allPosts = import.meta.globEager('../posts/*.md');

const posts = Object.values(allPosts);

posts.sort((a, b) => (a.frontmatter.id) - (b.frontmatter.id));

const sortedPosts = posts.reverse();

export const get = () => rss({
    title: "Occident Tech Software News",
    description: "Latest web development news",
    site: import.meta.env.PUBLIC_SITE,
    // stylesheet: '/rss/styles.xsl',
    items: sortedPosts.map(item => ({
        
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        link: item.url,
        pubDate: item.frontmatter.pubDate,
    }))
});
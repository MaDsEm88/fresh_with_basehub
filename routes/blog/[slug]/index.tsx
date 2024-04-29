import { basehub } from "@/.basehub/index.ts";
import { allPostsQuery, getMorePosts, postBySlugQuery } from "@/utils/queries.ts";
import { Head } from "$fresh/runtime.ts";
import Post from "@/islands/Blog/Post.tsx";
import MoreStories from "../../../islands/Blog/MoreBlogPosts.tsx";
import { Intro } from "@/islands/Blog/Intro.tsx";
import { Container } from "@/components/container.tsx";
import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (_req, ctx) => {
  const { slug } = ctx.params; // Destructure slug from ctx.params

  const { blog } = await basehub({
    next: { revalidate: 60 },
  }).query(postBySlugQuery(slug)); // Use slug to query post

  const [post] = blog.posts.items;

  // Assuming morePosts is fetched from somewhere, replace it with your actual logic

  return (
    <>
      <Head>
        <title>Changelog</title>
        <meta
          name="description"
          content="Discover a curated collection of ready-made packages for your Fresh projects — all in one place!"
        />
        <meta property="og:image" content="/images/freshnpm_image.webp" />
      </Head>
      <div className="overflow-hidden">
        <Container className="w-full items-center justify-center text-center max-w-auto">
          <section className="container mx-auto px-5">
            <Intro />
            <Post post={post} />
           
          </section>
        </Container>
      </div>
    </>
  );
});

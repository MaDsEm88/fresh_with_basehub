import { Head } from "$fresh/runtime.ts";
import { Intro } from "@/islands/Blog/Intro.tsx";
import { HeroPost } from "@/islands/Blog/Posts/Hero-Post.tsx";
import MoreStories from "../islands/Blog/MoreBlogPosts.tsx";
import { allPostsQuery } from "@/utils/queries.ts";
import { basehub } from "@/.basehub/index.ts";
import { Container } from "@/components/container.tsx";
import { defineRoute } from "$fresh/server.ts";


export default defineRoute(async (_req, ctx) => {
  const { blog } = await basehub({
    next: { revalidate: 60 },
  }).query(allPostsQuery());

  const heroPost = blog.posts.items[0];
  const morePosts = blog.posts.items.slice(1);



  return (
    <>
      <Head>
        <title>Blog</title>
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
          {heroPost && (
                <HeroPost
                  title={heroPost._title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date}
                  author={heroPost.author}
                  slug={heroPost._slug}
                  excerpt={heroPost.excerpt}
                />
              )}
              <MoreStories morePosts={morePosts} />

     
              </section>
        </Container>
      </div>
    </>
   );
  });



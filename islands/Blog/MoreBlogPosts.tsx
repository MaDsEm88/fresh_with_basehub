import { Post } from "@/utils/queries.ts";
import { PostPreview } from "./Post-Preview.tsx";

function MoreStories({ morePosts }: { morePosts: Post[] }) {
  return (
    <section>
      
      <div className="">
        {morePosts.map((post) => (
          <PostPreview
            key={post._slug}
            title={post._title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post._slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}

export default MoreStories;
import { useState, useEffect } from 'preact/hooks';
import { RichText } from "@/.basehub/react/index.ts";
import CoverImage from "@/islands/Blog/Cover-Image.tsx";
import CustomDate from "@/utils/date.tsx"; // Rename Date component to CustomDate
import { Post as TPost } from "@/utils/queries.ts";
import BodyImage from "./Body-Image.tsx";
import Avatar from "./Avatar.tsx";




export default function Post({ post }: { post: TPost }) { // Update prop name from `posts` to `post`


  return (
    <section className="w-full mt-[2rem] mx-auto justify-center md:max-w-[60vw]">

    <article>
          <div>
            <div className="flex items-center font-manrope_1 text-semibold gap-2 text-sm">
            {post.author && (
          <Avatar title={post.author._title} url={post.author.avatar.url} />
        )} -
                  <div className="text-[12px] underline italic mt-[0.2rem] text-black ">

            <CustomDate dateString={post.date} />
            </div>
            </div>
          </div>
         
      <h1 className="mb-4 font-manrope_1 font-bold text-left text-xl lg:text-2xl ">
        {post._title}
      </h1>

     
    

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={post._title} url={post.coverImage.url} />
      </div>

   
      <div className="w-full mt-[2rem] mx-auto justify-center md:max-w-[60vw]">
        <div className="prose dark:prose-invert hover:prose-a:text-orange-500">
        <RichText
                components={{
                  video: (props) => (
                    <video
                      className="mb-[1rem] shadow-lg rounded-[8px] shadow-black/20 dark:shadow-white/20"
                      autoPlay
                      onEnded={(e) => {
                        const videoElement = e.target as HTMLVideoElement;
                        if (videoElement) {
                          videoElement.currentTime = 0;
                          videoElement.play();
                        }
                      }}
                      {...props}
                    />
                  ),
                  img: (props) => <BodyImage {...props} />,
                  h1(props) {
                    return <h1 className="mb-[1rem] text-left font-manrope_1 opacity-90 text-[20px] md:text-[26px]" {...props} />;
                  },
                  h2(props) {
                    return <h2 className="mb-[1rem]  text-left  font-manrope_1 opacity-90 text-[18px] md:text-[24px]" {...props} />;
                  },
                  h3(props) {
                    return <h3 className="mb-[1rem]  text-left  font-manrope_1 opacity-90 text-[16px] md:text-[22px]" {...props} />;
                  },
                  p(props) {
                    return <p className="mb-[2rem]  text-left  font-manrope_1 opacity-60 text-[14px] md:text-[16px]" {...props} />;
                  },
                  a(props) {
                    return (
                      <a
                        className="manrope_1 font-bold underline decoration-[#ddd33f] dark:decoration-yellow-200 bg-gradient-to-br from-[#959161d0] dark:from-[#f5f1b5d0] via-[#8b894d] dark:via-[#fffde5d0] to-[#d2cf77] dark:to-[#f5f1b5fe] bg-clip-text text-transparent"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    );
                  },
                  ol(props) {
                    return <ol className="list-decimal ms-5" {...props} />;
                  },
                }}
              >

            {post.body.json.content}
          </RichText>
        </div>
      </div>
    </article>
    </section>
  );
}
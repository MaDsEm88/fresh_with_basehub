import { toast, Toaster } from "sonner";
import { useState } from "preact/hooks"; // Import useState hook
import Date from "../../../utils/date.tsx";
import CoverImage from "@/islands/Blog/Cover-Image.tsx";
import useCopyToClipboard from "@/utils/use-copy-to-clipboard.ts"; // Import the hook
import { TextGenerateEffect } from "@/islands/Ui/Text-generate-effect.tsx";
import Avatar from "@/islands/Blog/Avatar.tsx";

const words = `Share link copied to your clipboard.`;

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: { url: string };
  date: string;
  excerpt: string;
  author: { _title: string; avatar: { url: string } };
  slug: string;
}) {
  const { copied, error, copyToClipboard } = useCopyToClipboard(); // Initialize the hook
  const [copiedSlug, setCopiedSlug] = useState(false); // State to track if slug is copied

  const handleClickCopySlug = () => {
    const slugToCopy = `https://freshwithbasehub.deno.dev/${slug}`;
    copyToClipboard(slugToCopy);
    setCopiedSlug(true);
    toast.custom((t) => (
      <div className="relative md:right-[7rem] items-center gap-2 p-4 rounded-[8px] bg-[#eeeeee]  border-[1px] border-black/20 shadow-md shadow-orange-500/20">
        <TextGenerateEffect words={words} />
      </div>
    ));
    // Show toast message
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedSlug(false);
    }, 2000);
  };

  return (
    <section className="w-full mt-[2rem] mx-auto justify-center md:max-w-[60vw]">
      <div className="gap-4">
        <div className="mb-4 relative">
          <div>
            <div className="flex items-center font-manrope_1 text-semibold gap-2 text-sm">
              {author && (
                <Avatar title={author._title} url={author.avatar.url} />
              )} -
              <div className="text-[12px] underline italic mt-[0.2rem] text-black ">
                <Date dateString={date} />
              </div>
            </div>
          </div>
          <div className="justify-between flex items-center">
            <h3 className="mb-4 font-manrope_1 font-bold text-left text-xl lg:text-2xl ">
              {title}
            </h3>
            <button
              onClick={handleClickCopySlug}
              className="bg-black rounded-[8px] shadow-md shadow-black/20 px-2 py-1 font-manrope_1 font-semibold mb-[0.5rem] text-neutral-800  text-[12px] md:text-sm flex md:gap-2 items-center"
            >
              {/* Render SVG icons */}
              {copiedSlug
                ? (
                  // Checkmark SVG icon
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>check</title>
                    <g fill="none" className="nc-icon-wrapper">
                      <path
                        className="fill-white"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                      >
                      </path>
                    </g>
                  </svg>
                )
                : (
                  // Copy SVG icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <path
                      stroke="#efefef"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.9 19.142l-.708-.707c-2.121-2.121-2.121-4.95 0-7.071l2.829-2.828s0 0 0 0c2.121-2.122 4.95-2.122 7.07 0 2.122 2.12 2.122 4.95 0 7.07"
                    />
                    <path
                      stroke="#efefef"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.728 13.485l.707.707c2.121 2.122 2.121 4.95 0 7.072l-2.828 2.828s0 0 0 0c-2.122 2.121-4.95 2.121-7.071 0-2.122-2.121-2.122-4.95 0-7.071"
                    />
                    <title>url_copy</title>
                  </svg>
                )}
              {/* Render "Copied" or "Copy link" based on copied state */}
              <span className="hidden text-white/80 md:block">
                {copiedSlug ? "Copied" : "Copy link"}
              </span>
            </button>
          </div>
          <CoverImage title={title} slug={slug} url={coverImage.url} />
        </div>
      </div>
      <hr className="mt-[2rem] border-b-[1px] border-black/10 shadow-sm shadow-black/10 " />
      <Toaster position="bottom-right" expand={false} />{" "}
      {/* Include the Toaster component */}
    </section>
  );
}

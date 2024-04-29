import { clsx } from "clsx";

export default function CoverImage({
  title,
  url,
  slug,
}: {
  title: string;
  url: string;
  slug?: string;
}) {
  const image = (
    <img
      alt={`Cover Image for ${title}`}
      priority
      width={2000}
      height={1000}
      className={clsx("shadow-lg rounded-[8px] shadow-black/20 dark:shadow-white/20", {
        "hover:shadow-md shadow-black/20 dark:shadow-white/20 transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <a href={`/${slug}`} aria-label={title}>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}
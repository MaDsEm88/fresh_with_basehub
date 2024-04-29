interface Link {
  id: string;
  slug: string;
  label: string; // corrected typo from "lable" to "label"
}
export function PostLinks({ links }: { links: Link[] }) {
  return (
    <aside className="sticky h-screen min-w-[260px] pt-[150px] space-y-4 flex-col top-[65px] items-start hidden md:flex">
      {links.map((link) => {
        return (
          <button
          type="button"
          key={link.id}
          className="text-[14px]"
          onClick={() => {
            const element = document.getElementById(link.slug);
            element?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {link.label} {/* Corrected from 'lable' to 'label' */}
        </button>
        );
      })}
    </aside>
  );
}

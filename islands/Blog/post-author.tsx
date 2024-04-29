interface Author {
  _id: string;
  _title: string;
  avatar: {
    url: string;
    alt: string | null;
  };
  // Add other properties as needed
}

const getAuthorTagline = (id: string) =>
  ({
    "5c2176bb-e4f0-4026-a77a-3feaf95fc758": "Engineering", // Pontus
  }[id]);

  export function PostAuthor({ name, src, id }: { name: string; src: string; id: string }) {
    return (
      <div className="flex space-x-2 items-center">
        <img
          src={src}
          width={24}
          height={24}
          alt={name}
          className="rounded-full overflow-hidden"
        />
        <span className="font-medium text-xs">{name}</span>
        <span className="text-xs text-[#878787]">{getAuthorTagline(id)}</span>
      </div>
    );
  }
  
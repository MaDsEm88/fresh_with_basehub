
export default function Avatar({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex items-center">
      <div className="mr-2 w-8 h-8">
        <img
          alt={title}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={url}
        />
      </div>
      <div className="text-lg font-bold">{title}</div>
    </div>
  );
}

export default function BodyImage({
  ...props
}: {
  src: string;
  alt?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  caption?: string | undefined;
}) {
  return (
    <>
      <img
        {...props}
        alt={props.caption ?? "Image"}
        className="rounded-lg"
       
      />
      {props.caption && (
        <figcaption className="text-center">{props.caption}</figcaption>
      )}
    </>
  );
}
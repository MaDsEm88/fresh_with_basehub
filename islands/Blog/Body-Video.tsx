import {  ReactNode } from 'preact/compat';

export default function VideoImage({
  children,
  src,
  alt,
  width,
  height
}: {
  children: ReactNode;
  src: string;
  alt?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
}) {
  return (
    <>
      <video
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
      >
        {children}
      </video>
    </>
  );
}

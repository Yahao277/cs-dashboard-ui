import Image from "next/image";

type ThumbnailProps = {
  thumbnail?: string | null;
}


const Thumbnail = ({ thumbnail }: ThumbnailProps) => {
  return thumbnail && <Image
      width={100}
      height={100}
    src={thumbnail}
    alt="Thumbnail"
    sizes="100vw"
    style={{
      objectFit: "cover",
      objectPosition: "center",
    }}
  />
}

export default Thumbnail;
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  images: string[];
}

const MobileImageBanner: React.FC<Props> = ({ images }) => {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
        {images.map((src, idx) => (
          <div className="w-full " key={idx}>
            <Image
              src={src}
              alt={"banner-" + idx}
              priority
              height={350}
              width={500}
              layout="responsive"
              objectPosition="center"
              objectFit="cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default MobileImageBanner;

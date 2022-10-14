import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NextLink } from "../ui";

interface Props {}
const Banner = ({}: Props) => {
  return (
    <section className="rounded-2xl ">
      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
        <NextLink href="/celebration-cakes">
          <Image
            src="https://res.cloudinary.com/desihzeid/image/upload/v1665763981/CakeSpace/cbqxoe7pkpsdyzrfndi8.jpg"
            alt="banner-1"
            width={1200}
            height={600}
            priority
            layout="responsive"
            className="rounded-2xl"
          />
        </NextLink>

        <NextLink href="/pastries">
          <Image
            priority
            src="https://res.cloudinary.com/desihzeid/image/upload/v1665763982/CakeSpace/mme6jscvgh23iipazu5m.jpg"
            alt="banner-2"
            width={1200}
            height={600}
            layout="responsive"
            className="rounded-2xl"
          />
        </NextLink>
      </Carousel>
    </section>
  );
};
export default Banner;

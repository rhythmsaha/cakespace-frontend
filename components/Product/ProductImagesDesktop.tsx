import { useState } from "react";
import Image from "next/image";
import Service from "./Service";

interface Props {
  images: string[];
}

const ProductImageDesktop: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="flex gap-2">
      <div className="flex flex-col gap-4 ">
        {images.map((img, index) => (
          <span
            key={index}
            className={`relative w-16 aspect-square cursor-pointer rounded-lg overflow-hidden transition ${
              selectedImage === img && "border-2 border-indigo-500"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image src={img} alt={`thumb-${index}`} layout="responsive" height={100} width={100} />
          </span>
        ))}
      </div>

      <div className="relative flex-1 rounded-xl overflow-hidden">
        <Image
          src={selectedImage}
          alt="Product Image"
          layout="responsive"
          height={500}
          width={500}
          objectFit="cover"
          className=""
        />

        <p className="text-xs text-center p-4 text-gray-400">
          <span className="font-medium ">Note: </span>
          Design and icing of cake may vary from the image shown here since each chef has his/her own way of baking and
          designing a cake.
        </p>

        <div className="mt-4">
          <Service />
        </div>
      </div>
    </section>
  );
};
export default ProductImageDesktop;

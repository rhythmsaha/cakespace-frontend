import { useState } from "react";
import Image from "next/image";

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
      </div>
    </section>
  );
};
export default ProductImageDesktop;

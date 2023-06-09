/* eslint-disable react/jsx-key */
import Image from "next/image";
import styles from "../styles/Carousel.module.css";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function CarouselComponent() {
  const [items] = useState([
    <Image
      width={1300}
      height={150}
      src="https://source.unsplash.com/random/1300x150/?festival"
      alt="Imagem 1"
      className={styles.img_carousel}
    />,
    <Image
      width={1300}
      height={150}
      src="https://source.unsplash.com/random/1300x150/?drink"
      alt="Imagem 2"
    />,
    <Image
      width={1300}
      height={150}
      src="https://source.unsplash.com/random/1300x150/?beach"
      alt="Imagem 3"
    />,
    <Image
      width={1300}
      height={150}
      src="https://source.unsplash.com/random/800x150/?solar"
      alt="Imagem 4"
    />,
  ]);

  return (
    <div className={styles.carousel_component}>
      <Carousel
        dynamicHeight={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
      >
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Carousel>
    </div>
  );
}

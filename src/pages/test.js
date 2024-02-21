import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/imagesGDrive`
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Uploaded Images</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id}>{image.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;

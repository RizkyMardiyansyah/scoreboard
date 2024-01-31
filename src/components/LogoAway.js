import { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/team`)
      .then((response) => {
        setImageData(response.data[2]);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      {imageData && (
        <div className="image-item">
          <img src={imageData.logo} alt={imageData.title} />
          <p>{imageData.title}</p>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;

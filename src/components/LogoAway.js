import { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/team")
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

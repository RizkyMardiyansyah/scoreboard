import { useEffect, useState } from "react";
import axios from "axios";

const ImageComponent = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/team") // Replace with your API endpoint
      .then((response) => {
        setImageData(response.data[1]);
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

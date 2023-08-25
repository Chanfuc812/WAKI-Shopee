// Import thư viện React và useState
import React, { useState } from "react";
import { Box } from "zmp-ui";
import { galleryImages } from "./imagePaths";

// Định nghĩa component ImageCarousel
const ImageCarousel = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      (prevIndex + 1) % galleryImages.length
    );
  };

  return (
    <Box className="mt-5">
      <div className="main-image">
        <div className="image-container">
          <img
            src={galleryImages[selectedImageIndex]}
            alt={`Hình ảnh gallery ${selectedImageIndex + 1}`}
            className="w-full h-auto rounded-lg cursor-pointer"
          />
          <div className="buttons-container">
            <button className="prev-button" onClick={handlePrevImage}>
              &#8592;
            </button>
            <button className="next-button" onClick={handleNextImage}>
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ImageCarousel;

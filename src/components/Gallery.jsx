import React, { useState } from "react";
import { Images } from "../data";
import ImageContainer from "./ImageContainer";
import { InsertPhoto } from "@mui/icons-material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Gallery = () => {
  const [images, setImages] = useState(Images);
  // console.log(images);

  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(Images[0].id);

  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);

    if (featureImage && selectedImages.includes(featureImage)) {
      setFeatureImage(null);
    }
  };

  const toggleSelection = (imageId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        // Deselect if already selected
        return prevSelected.filter((id) => id !== imageId);
      } else {
        // Select if not selected, or toggle selection if already selected
        return [...prevSelected, imageId];
      }
    });
  };

  const handleSetFeatureImage = (imageId) => {
    setFeatureImage(imageId);
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    console.log(source, destination, type);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedImages = [...images];
      console.log(reorderedImages)

      const [removedImage] = reorderedImages.splice(source.index, 1);
      reorderedImages.splice(destination.index, 0, removedImage);
      console.log(reorderedImages)

      return setImages(reorderedImages);
    }
  };

  return (
    <>
      <div className="flex flex-col border-2 border-gray-300 m-10 p-2 rounded-md">
        <div className="flex flex-row border-b-2 justify-between">
          <div className="flex items-center p-4 m-2">
            <p>
              {selectedImages.length
                ? `${selectedImages.length} image selected`
                : "Gallery"}
            </p>
          </div>
          {selectedImages.length > 0 && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-5 py-2 rounded cursor-pointer m-2"
            >
              Delete
            </button>
          )}
        </div>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="image-container"
              >
                {images.map((image, index) => (
                  <ImageContainer
                    key={image.id}
                    dragId={image.id.toString()}
                    index={index}
                    image={image}
                    handleDelete={handleDelete}
                    toggleSelection={toggleSelection}
                    isSelected={selectedImages.includes(image.id)}
                    isFeature={featureImage === image.id}
                    handleSetFeatureImage={handleSetFeatureImage}
                  />
                ))}
                <div className="grid items-center justify-center p-8 relative overflow-hidden border-2 border-gray-300 rounded-lg">
                  <InsertPhoto />
                  Add Images
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Gallery;

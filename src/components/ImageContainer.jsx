import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const ImageContainer = ({
  index,
  dragId,
  image,
  handleDelete,
  toggleSelection,
  isSelected,
  isFeature,
  handleSetFeatureImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleSelection = () => {
    toggleSelection(image.id);
  };

  return (
    <div
      className={`relative overflow-hidden border-2 border-gray-300 rounded-lg ${
        isFeature ? "col-span-2 row-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Draggable draggableId={dragId} index={index} key={index}>
        {(provided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <img
              src={image.img}
              alt={`Image with id: ${image.id}`}
              className="w-full h-full object-cover filter brightness-100"
            />

            <div
              className={`absolute top-0 left-0 right-0 bottom-0 ${
                isSelected || isHovered ? "flex" : "hidden"
              } items-center justify-center ${
                isSelected
                  ? "bg-opacity-70 bg-gray-300"
                  : isHovered
                  ? "bg-opacity-80 bg-gray-700"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleToggleSelection}
                className={`absolute top-2 left-2 appearance-none w-6 h-6 border-2 rounded-md ${
                  isSelected
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-400"
                } cursor-pointer text-center line-height-6 text-xs`}
              />
              {isSelected && (
                <div className="absolute top-2 left-2 flex items-center justify-center text-white pl-1">
                  &#10003;
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default ImageContainer;

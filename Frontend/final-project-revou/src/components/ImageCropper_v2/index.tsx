import { useState, useEffect } from "react";

interface Props {
  src: string;
  size: [number, number];
}

const ImageCropper_v2 = ({ src, size }: Props) => {
  const [croppedSrc, setCroppedSrc] = useState<string | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    const cropImage = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        // Guard against null context
        return;
      }

      const aspectRatio = image.width / image.height;
      const newAspectRatio = size[0] / size[1];
      let newWidth, newHeight, startX, startY;

      if (aspectRatio > newAspectRatio) {
        // image is wider, need to crop width
        newWidth = image.height * newAspectRatio;
        newHeight = image.height;
        startX = (image.width - newWidth) / 2;
        startY = 0;
      } else {
        // image is taller, need to crop height
        newWidth = image.width;
        newHeight = image.width / newAspectRatio;
        startX = 0;
        startY = image.height - newHeight;
      }

      canvas.width = size[0];
      canvas.height = size[1];
      ctx.drawImage(
        image,
        startX,
        startY,
        newWidth,
        newHeight,
        0,
        0,
        size[0],
        size[1]
      );

      setCroppedSrc(canvas.toDataURL());
    };

    image.onload = cropImage;

    return () => {
      image.onload = null;
    };
  }, [src, size]);

  return (
    <div>
      {croppedSrc && (
        <img src={croppedSrc} alt="Cropped Image" className="rounded-xl" />
      )}
    </div>
  );
};

export default ImageCropper_v2;

// Usage:
// <ImageCropper src="your_image.jpg" size={[300, 300]} />

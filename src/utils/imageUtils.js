/**
 * Utility function to resize and compress user uploaded images
 * to a lightweight Base64 JPEG data URL suitable for localStorage storage.
 */
export const resizeImageFile = (file, maxWidth = 400, maxHeight = 400, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      reject(new Error("Please select a valid image file (JPEG, PNG, WEBP)."));
      return;
    }

    // Limit original file size to 10MB to avoid browser freezing
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error("Image size too large. Please select an image under 10MB."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Error reading selected file."));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Unable to decode image file."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not access 2D canvas context."));
          return;
        }

        // Draw image resized
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

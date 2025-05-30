export async function processImageToSquareBlob(imageFile, size = 300) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      const minSize = Math.min(img.width, img.height);
      const cropX = (img.width - minSize) / 2;
      const cropY = (img.height - minSize) / 2;

      ctx.drawImage(img, cropX, cropY, minSize, minSize, 0, 0, size, size);

      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Erro ao converter para Blob'));
          }
        },
        'image/webp',
        0.8,
      );
    };

    img.onerror = reject;

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
}

export const getAverageColor = (imageData) => {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return [r, g, b];
};

export const getImageData = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        resolve(imageData);
      };
  
      img.onerror = (err) => {
        reject(new Error('Failed to load image'));
      };
  
      img.src = imageUrl;
    });
  };
  

  getImageData('https://example.com/path/to/image.jpg')
    .then(imageData => {
      console.log(imageData); // Do something with the imageData
      getAverageColor(imageData)
    })
    .catch(error => {
      console.error(error);
    });
  

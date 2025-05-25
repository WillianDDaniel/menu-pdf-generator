export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.onerror = function (err) {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

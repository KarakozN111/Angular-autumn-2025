// Сжатие в Web Worker
/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  const { file, quality = 0.5, maxWidth = 500 } = data;

  try {
    const bitmap = await createImageBitmap(file);

    const scale = Math.min(maxWidth / bitmap.width, 1);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => postMessage({ base64: reader.result });
    reader.onerror = () => postMessage({ error: 'Failed to convert blob to base64' });
  } catch (err: any) {
    postMessage({ error: err.message || 'Failed to compress image' });
  }
});

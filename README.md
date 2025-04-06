---

# 👓 **AR Glasses**

A lightweight TypeScript library that overlays virtual glasses on detected faces using `face-api.js` and your device's camera.

---

## ✨ **Features**

- 🔍 **Real-time face detection** using your webcam
- 🕶️ **Overlay custom glasses images** (supports URLs or file uploads)
- 📦 **Easy to integrate** with any frontend app
- 💡 **Built with TypeScript** and compatible with modern bundlers
- 📁 **Automatic model handling** for `face-api.js` (no manual setup needed)

---

## 📦 **Installation**

### Using npm or Yarn

To get started, install the package via npm or yarn:

```bash
npm install ar-glasses
```

Or with Yarn:

```bash
yarn add ar-glasses
```

### Using a CDN

You can also use the library directly in the browser via a CDN. For example, using [jsDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/ar-glasses/dist/ar-glasses.umd.js"></script>
```

This will expose the library as a global variable `ARGlasses`.

---

## 🚀 **Usage**

### React Example

```tsx
import React, { useRef, useEffect, useState } from 'react';
import { startGlassesOverlay } from 'ar-glasses';

const ARGlasses = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glassesImage, setGlassesImage] = useState<string>('');

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current!.srcObject = stream;
      });
    }
  }, []);

  const handleStart = () => {
    if (videoRef.current && canvasRef.current && glassesImage) {
      startGlassesOverlay(videoRef.current, canvasRef.current, glassesImage);
    } else {
      alert('Please upload a glasses image first!');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setGlassesImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleStart}>Start</button>
      <video ref={videoRef} autoPlay muted playsInline width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default ARGlasses;
```

### Plain JavaScript Example (Using CDN)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>AR Glasses Example</title>
    <script src="https://cdn.jsdelivr.net/npm/ar-glasses/dist/ar-glasses.umd.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const video = document.getElementById('video');
        const canvas = document.getElementById('overlay');
        const uploadInput = document.getElementById('glasses-upload');
        const startButton = document.getElementById('start');

        let glassesImageDataURL = '';

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          video.srcObject = stream;
        });

        uploadInput.addEventListener('change', (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              glassesImageDataURL = reader.result;
            };
            reader.readAsDataURL(file);
          }
        });

        startButton.addEventListener('click', () => {
          if (glassesImageDataURL) {
            ARGlasses.startGlassesOverlay(video, canvas, glassesImageDataURL);
          } else {
            alert('Please upload a glasses image first!');
          }
        });
      });
    </script>
  </head>
  <body>
    <input type="file" id="glasses-upload" accept="image/*" />
    <button id="start">Start</button>
    <video id="video" autoplay muted playsinline width="640" height="480"></video>
    <canvas id="overlay" width="640" height="480"></canvas>
  </body>
</html>
```

---

## 📂 **Model Handling**

AR Glasses automatically handles model loading for `face-api.js`. No additional setup is required. Simply upload or link to your preferred glasses image and let the library do the rest!

---

## 🧠 **Powered By**

- [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- TypeScript
- HTML5 Canvas

---

## 📜 **License**

MIT License © 2025

---
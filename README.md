Here's your updated **`README.md`** content for the `ar-glasses` NPM package with models loaded internally (no need for user to pass `modelPath`):

---

```markdown
# 👓 ar-glasses

> A lightweight TypeScript library that overlays virtual glasses on detected faces using `face-api.js` and the device's camera.

---

## ✨ Features

- 🔍 Real-time face detection using webcam
- 🕶️ Overlay custom glasses images (URL or uploaded file)
- 📦 Easy to integrate with any frontend app
- 💡 Built with TypeScript and compatible with modern bundlers
- 📁 No manual setup for `face-api.js` models

---

## 📦 Installation

```bash
npm install ar-glasses
```

or with Yarn:

```bash
yarn add ar-glasses
```

---

## 🚀 Usage

### 1. Import the library

```ts
import startGlassesOverlay from 'ar-glasses';
```

### 2. HTML Setup

```html
<video id="video" autoplay muted playsinline></video>
<canvas id="overlay"></canvas>
```

### 3. JavaScript Example

```ts
const video = document.getElementById('video') as HTMLVideoElement;
const canvas = document.getElementById('overlay') as HTMLCanvasElement;
const glassesImage = 'https://yourdomain.com/glasses.png'; // Or a base64 image string

startGlassesOverlay(video, canvas, glassesImage);
```

---

## 📁 File Upload Example

To allow users to upload their own glasses:

```html
<input type="file" id="glasses-upload" accept="image/*" />
```

```ts
const input = document.getElementById('glasses-upload') as HTMLInputElement;

input.addEventListener('change', () => {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataURL = reader.result as string;
    startGlassesOverlay(video, canvas, dataURL);
  };
  reader.readAsDataURL(file);
});
```

---

## 📂 Model Handling

✅ You **don’t need to provide or load any face-api.js model paths**.  
All necessary models are bundled and loaded automatically.

---

## ⚙️ API

```ts
startGlassesOverlay(
  videoEl: HTMLVideoElement,
  canvasEl: HTMLCanvasElement,
  glassesImageURL: string
): void
```

---

## 🧪 Local Development with Vite

1. Create a basic Vite app:

```bash
npm create vite@latest ar-glasses-demo --template vanilla
cd ar-glasses-demo
npm install
```

2. Install the package:

```bash
npm install ar-glasses
```

3. Update `main.js`:

```ts
import startGlassesOverlay from 'ar-glasses';

const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const image = 'https://yourdomain.com/glasses.png';

startGlassesOverlay(video, canvas, image);
```

4. Run the dev server:

```bash
npm run dev
```

---

## 🧠 Powered By

- [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- TypeScript
- HTML5 Canvas

---

## 📜 License

MIT License © 2025
```

---

Let me know if you'd like me to generate this as a downloadable file or commit it to a specific repo structure!
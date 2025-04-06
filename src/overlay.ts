import * as faceapi from 'face-api.js';


export default async function startGlassesOverlay(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  glassesUrl: string,
) {
  // const MODEL_PATH = "./models";
  
  // Load models in parallel
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/refs/heads/master/tiny_face_detector/"),
    faceapi.nets.faceLandmark68Net.loadFromUri("https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/refs/heads/master/face_landmark_68/"),
  ]);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const glassesImage = new Image();
  glassesImage.src = glassesUrl;

  glassesImage.onload = () => {
    // Start the face detection loop
    const detectAndOverlay = async () => {
      // Detect faces and landmarks
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      resizedDetections.forEach(detection => {
        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        // Calculate the center point of both eyes
        const eyeCenterX = (leftEye[0].x + rightEye[3].x) / 2;
        const eyeCenterY = (leftEye[0].y + rightEye[3].y) / 2;

        // Calculate glasses size based on the distance between the eyes
        const glassesWidth = Math.abs(rightEye[3].x - leftEye[0].x) * 2;
        const glassesHeight = glassesWidth / 2;

        // Draw the glasses on the canvas
        ctx?.drawImage(
          glassesImage,
          eyeCenterX - glassesWidth / 2,
          eyeCenterY - glassesHeight / 2,
          glassesWidth,
          glassesHeight
        );
      });

      requestAnimationFrame(detectAndOverlay);
    };

    // Start the face detection loop
    detectAndOverlay();
  };
}

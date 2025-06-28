// Base URL of the trained model from Teachable Machine
const URL = "https://teachablemachine.withgoogle.com/models/ldxqCFDv_/";

// Global variables for model, webcam, canvas, etc.
let model, webcam, ctx, labelContainer, maxPredictions;
let loopRequest;
let isRunning = false;       // flag to control if the loop is running
let pushupCounter = 0;       // push-up counter
let lastPose = "up";         // last detected pose ("up" or "down")

// Initialize the model, webcam, and set up the canvas for display
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and its metadata (classes, etc.)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam (400x400 px, horizontal flip for mirror effect)
    const size = 400;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();    // request permission and setup webcam
    await webcam.play();     // start the webcam

    // If user paused during loading, stop webcam and exit
    if (!isRunning) {
        await webcam.stop();
        return;
    }

    // Setup canvas for drawing webcam feed and detected poses
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");

    // Setup label container for prediction classes
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ""; // clear previous labels
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    document.getElementById("loadingMessage").style.display = "none";

    // Start the prediction loop
    loopRequest = requestAnimationFrame(loop);
}

// Main loop: update webcam, predict pose, draw results
async function loop(timestamp) {
    if (!isRunning) return;  // stop loop if not running

    webcam.update();         // update webcam frame
    await predict();         // run pose prediction
    loopRequest = requestAnimationFrame(loop);
}

// Perform pose estimation and classification prediction
async function predict() {
    // Get pose and posenet output from the webcam image
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

    // Run classification on the posenet output
    const prediction = await model.predict(posenetOutput);

    // Update UI labels with prediction probabilities
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // Detect "up" and "down" pose transitions to count push-ups
    const probUp = prediction[0].probability;
    const probDown = prediction[1].probability;

    if (probDown > 0.95 && lastPose === "up") {
        lastPose = "down";
    }
    if (probUp > 0.95 && lastPose === "down") {
        pushupCounter++;
        playSound();
        document.getElementById("counter").innerText = pushupCounter;
        lastPose = "up";
    }

    // Draw pose keypoints and skeleton on the canvas
    drawPose(pose);
}

// Draw detected pose keypoints and skeleton on the canvas
function drawPose(pose) {
    if (!webcam.canvas) return;

    ctx.drawImage(webcam.canvas, 0, 0);

    if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
}

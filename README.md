# Push-Up Counter

## Overview
A web application that uses TensorFlow.js and Teachable Machine for real-time push-up counting via webcam. Detects "up" and "down" positions to accurately count repetitions with visual/sound feedback.

## 🛜 Available Here:
https://pdrzxzz.github.io/push-up-counter/

## Key Features
- 🎯 Real-time pose classification
- 📷 Webcam integration with pose visualization 
- 🔊 Sound feedback (toggle on/off)
- ⏯️ Start/Pause/Restart controls
- 📊 Confidence level display

## Tech Stack
| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Core            | HTML5, CSS3, JavaScript (ES6+)        |
| Machine Learning| TensorFlow.js, Teachable Machine Pose |
| UI              | FontAwesome icons                     |
| Audio           | Web Audio API                         |

## How It Works
1. User grants camera access
2. Pose model loads (Teachable Machine)
3. System detects transitions between:
   - ↑ "Up" position (arms extended)
   - ↓ "Down" position (chest near floor)
4. Valid transitions increment counter + play sound
5. UI updates with:
   - Live counter
   - Pose skeleton overlay
   - Confidence percentage

## Usage Instructions
| Action          | Result                          |
|-----------------|---------------------------------|
| ▶️ Start        | Begins counting                |
| ⏸️ Pause       | Freezes detection             |
| 🔄 Restart      | Resets counter                |
| 🔇 Sound Toggle| Mutes/unmutes feedback sounds |

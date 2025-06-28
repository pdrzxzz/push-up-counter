// Assume that the audio element and the button with icon exist

function toggleSound() {
    const audio = document.getElementById("plimSound");
    const soundIcon = document.getElementById("soundIcon");

    // Toggle mute
    audio.muted = !audio.muted;

    // Update the icon according to the state
    if (audio.muted) {
        soundIcon.classList.remove("fa-volume-up");
        soundIcon.classList.add("fa-volume-mute");
    } else {
        soundIcon.classList.remove("fa-volume-mute");
        soundIcon.classList.add("fa-volume-up");
    }

    // Save the state in sessionStorage
    sessionStorage.setItem("audioMuted", audio.muted);
}

// Function to apply the saved state when the page loads
function applySavedSoundState() {
    const audio = document.getElementById("plimSound");
    const soundIcon = document.getElementById("soundIcon");

    const muted = sessionStorage.getItem("audioMuted");

    if (muted !== null) {
        // Since sessionStorage saves strings, convert to boolean
        audio.muted = (muted === 'true');

        // Update the icon according to the saved state
        if (audio.muted) {
            soundIcon.classList.remove("fa-volume-up");
            soundIcon.classList.add("fa-volume-mute");
        } else {
            soundIcon.classList.remove("fa-volume-mute");
            soundIcon.classList.add("fa-volume-up");
        }
    }
}

// Call this function as soon as the script loads, to adjust the state when the page loads
applySavedSoundState();

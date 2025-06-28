async function toggleStartPause() {
    const btnText = document.getElementById("startPauseText");
    const icon = document.getElementById("startPauseIcon");

    if (!isRunning) {
        isRunning = true;
        document.getElementById("loadingMessage").style.display = "block";
        btnText.innerText = "Pause";
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        await init();
    } else {
        isRunning = false;
        document.getElementById("loadingMessage").style.display = "none";
        btnText.innerText = pushupCounter ? "Resume" : "Start";
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        cancelAnimationFrame(loopRequest);
        if (webcam && webcam.stop) await webcam.stop();
    }
}
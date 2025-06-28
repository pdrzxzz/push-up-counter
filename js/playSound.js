function playSound() {
  const audio = document.getElementById("plimSound");
  if (!audio.muted) audio.play();
}
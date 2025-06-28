let isMuted = false;

function toggleSound() {
  const icon = document.getElementById("soundIcon");
  const audio = document.getElementById("plimSound");

  isMuted = !isMuted;
  audio.muted = isMuted;

  // Alternar o ícone
  if (isMuted) {
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-mute");
  } else {
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-up");
  }
}

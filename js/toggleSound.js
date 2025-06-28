// Assume que existe o elemento audio e o botão com ícone

function toggleSound() {
    const audio = document.getElementById("plimSound");
    const soundIcon = document.getElementById("soundIcon");

    // Alterna o mute
    audio.muted = !audio.muted;

    // Atualiza o ícone conforme o estado
    if (audio.muted) {
        soundIcon.classList.remove("fa-volume-up");
        soundIcon.classList.add("fa-volume-mute");
    } else {
        soundIcon.classList.remove("fa-volume-mute");
        soundIcon.classList.add("fa-volume-up");
    }

    // Salva o estado no sessionStorage
    sessionStorage.setItem("audioMuted", audio.muted);
}

// Função para aplicar o estado salvo no carregamento da página
function applySavedSoundState() {
    const audio = document.getElementById("plimSound");
    const soundIcon = document.getElementById("soundIcon");

    const muted = sessionStorage.getItem("audioMuted");

    if (muted !== null) {
        // Como sessionStorage salva string, converte para boolean
        audio.muted = (muted === 'true');

        // Atualiza o ícone conforme o estado salvo
        if (audio.muted) {
            soundIcon.classList.remove("fa-volume-up");
            soundIcon.classList.add("fa-volume-mute");
        } else {
            soundIcon.classList.remove("fa-volume-mute");
            soundIcon.classList.add("fa-volume-up");
        }
    }
}

// Chama essa função assim que o script carregar, para ajustar o estado ao carregar a página
applySavedSoundState();

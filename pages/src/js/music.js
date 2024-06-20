document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseImage = document.getElementById("play-pause-image");
    const progress = document.getElementById("progress");
    const volume = document.getElementById("volume");
    const currentTime = document.getElementById("current-time");
    const duration = document.getElementById("duration");
    const volumeIcon = document.querySelector(".fa-volume-high");
    const prevTrackButton = document.getElementById("prev");
    const nextTrackButton = document.getElementById("next");

    let currentTrackIndex = 0;
    let tracks = [];

    // Função para carregar as músicas do arquivo JSON
    function loadTracks() {
        fetch("../src/js/musicas.json")
            .then(response => response.json())
            .then(data => {
                tracks = data;
                loadTrack(currentTrackIndex);
            })
            .catch(error => console.error("Erro ao carregar as músicas:", error));
    }

    // Função para carregar uma música específica
    function loadTrack(index) {
        const track = tracks[index];
        if (!track) {
            console.error("Índice de faixa inválido:", index);
            return;
        }
        audio.src = track.src;
        playPauseImage.src = track.poster;
        playPauseImage.alt = track.title;
        audio.load();
    }

    // Carregar as músicas ao carregar a página
    loadTracks();

    playPauseImage.addEventListener("click", function () {
        togglePlayPause();
    });

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseImage.classList.add("playing");
        } else {
            audio.pause();
            playPauseImage.classList.remove("playing");
        }
    }

    audio.addEventListener("play", function () {
        playPauseImage.classList.add("playing");
    });

    audio.addEventListener("pause", function () {
        playPauseImage.classList.remove("playing");
    });

    audio.addEventListener("timeupdate", function () {
        const value = (audio.currentTime / audio.duration) * 100;
        progress.value = value;

        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);

        currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    });

    progress.addEventListener("input", function () {
        const value = progress.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    volume.addEventListener("input", function () {
        audio.volume = volume.value;
        updateVolumeIcon();
    });

    volumeIcon.addEventListener("click", function () {
        toggleMute();
    });

    function toggleMute() {
        if (audio.volume === 0) {
            audio.volume = volume.value || 0.1;
        } else {
            audio.volume = 0;
        }
        updateVolumeIcon();
    }

    // Atualizar o ícone de volume conforme o estado atual
    function updateVolumeIcon() {
        if (audio.volume === 0) {
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-mute");
        } else {
            volumeIcon.classList.remove("fa-volume-mute");
            volumeIcon.classList.add("fa-volume-high");
        }
    }

    // Avançar para a próxima faixa
    nextTrackButton.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });

    // Voltar para a faixa anterior
    prevTrackButton.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });
});

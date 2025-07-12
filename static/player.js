document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
    // Pega todas as referências dos elementos HTML que vamos manipular.
    const videoElement = document.getElementById('video-player');
    const playlistLinks = document.querySelectorAll('#playlist li a');
    const loadingSpinner = document.getElementById('loading-spinner');
    // Elemento H1 que mostrará o título do episódio atual.
    const episodeTitleElement = document.getElementById('current-episode-title');

    // --- 2. VARIÁVEIS DE ESTADO ---
    // 'hls' vai guardar a instância do player HLS.js.
    let hls;
    // 'currentActiveLink' vai nos ajudar a saber qual episódio está marcado como "ativo".
    let currentActiveLink = null;

    // --- 3. FUNÇÃO PRINCIPAL: carregar o vídeo ---
    // Esta função centraliza toda a lógica de troca de vídeo.
    function loadVideo(url, linkElement) {
        // Mostra o ícone de carregamento.
        loadingSpinner.style.display = 'block';

        // ATUALIZAÇÃO: Pega o título do link clicado e o coloca no H1.
        // Verifica se 'linkElement' existe para evitar erros na primeira carga.
        if (linkElement) {
            // Busca o elemento com a classe '.episode-title' dentro do link 'a'
            const titleDiv = linkElement.querySelector('.episode-title');
            if (titleDiv) {
                // O .trim() remove espaços em branco extras do início e do fim.
                episodeTitleElement.textContent = titleDiv.textContent.trim();
            }
        }

        // Verifica se o navegador tem suporte ao HLS.js.
        if (Hls.isSupported()) {
            // Se já existe uma instância do HLS, destrói para liberar memória.
            if (hls) {
                hls.destroy();
            }
            // Cria uma nova instância.
            hls = new Hls();
            // Carrega a URL do vídeo .m3u8.
            hls.loadSource(url);
            // Anexa o player ao nosso elemento <video>.
            hls.attachMedia(videoElement);
            // Adiciona um evento que dispara quando o HLS.js terminar de carregar os metadados.
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play(); // Inicia a reprodução.
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // Fallback para navegadores com suporte nativo (iOS/Safari).
            videoElement.src = url;
            videoElement.play();
        }

        // Escuta pelo evento 'playing' para saber quando o vídeo realmente começou.
        videoElement.addEventListener('playing', () => {
            loadingSpinner.style.display = 'none'; // Esconde o ícone de carregamento.
        }, { once: true }); // { once: true } faz com que este evento só seja ouvido uma vez.

        // Atualiza o estilo visual do link ativo na playlist.
        if (linkElement) {
            updateActiveLink(linkElement);
        }
    }

    // --- 4. FUNÇÃO AUXILIAR: atualizar o link ativo ---
    // Gerencia qual item da lista tem a classe CSS 'active'.
    function updateActiveLink(newActiveLink) {
        // Se um link já estava ativo, remove a classe dele.
        if (currentActiveLink) {
            currentActiveLink.classList.remove('active');
        }
        // Adiciona a classe ao novo link que foi clicado.
        newActiveLink.classList.add('active');
        // Guarda a referência do novo link ativo.
        currentActiveLink = newActiveLink;
    }

    // --- 5. CONFIGURAÇÃO DOS EVENTOS DE CLIQUE ---
    // Passa por cada link da playlist.
    playlistLinks.forEach(link => {
        // Adiciona um "ouvinte" de evento de clique a cada um.
        link.addEventListener('click', (event) => {
            // Impede que o link recarregue a página.
            event.preventDefault();

            // Pega a URL do vídeo do atributo 'data-src'.
            const videoUrl = link.dataset.src;

            // Chama a função principal para carregar o vídeo, passando a URL e o próprio elemento do link.
            loadVideo(videoUrl, link);
        });
    });

    // --- 6. CARREGAMENTO INICIAL ---
    // Carrega o primeiro vídeo da lista automaticamente quando a página abre.
    if (playlistLinks.length > 0) {
        const firstEpisodeLink = playlistLinks[0];
        const firstVideoUrl = firstEpisodeLink.dataset.src;

        // Chama a função para carregar o primeiro vídeo.
        loadVideo(firstVideoUrl, firstEpisodeLink);
        // Começa pausado para não dar autoplay indesejado.
        videoElement.pause();
    }
});

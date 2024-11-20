// Função para pegar os dados do formulário e renderizar o convite
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pega os valores dos campos
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const texto = document.getElementById('text').value;
    const cor = document.getElementById('cor').value;
    const fundoInput = document.getElementById('fundo').files[0];
    
    // Pega as novas propriedades do texto (cor e fonte)
    const textColor = document.getElementById('text-color').value;
    const fontFamily = document.getElementById('font-family').value;

    // Preencher os campos do convite com os dados
    document.getElementById('evento-nome').textContent = nome;
    document.getElementById('evento-data').textContent = data;
    document.getElementById('evento-local').textContent = local;
    document.getElementById('evento-texto').textContent = texto;

    // Atualizar a cor de fundo do convite
    const convite = document.getElementById('convite');
    convite.style.backgroundColor = cor;

    // Atualizar a cor do texto do convite
    convite.style.color = textColor;
    
    // Atualizar a fonte do texto do convite
    convite.style.fontFamily = fontFamily;

    // Se o usuário escolher uma imagem de fundo, exibe-a
    if (fundoInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            convite.style.backgroundImage = `url(${e.target.result})`;
            convite.style.backgroundSize = 'cover';
            convite.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(fundoInput);
    } else {
        // Se não escolher uma imagem, garante que a imagem de fundo seja removida
        convite.style.backgroundImage = '';
    }

    // Exibir o convite na tela
    document.querySelector('.invite-section').style.display = 'block';
    document.getElementById('download-btn').style.display = 'block';
    document.getElementById('social-buttons').style.display = 'block';
});




// Função para carregar a fonte do Google Fonts dinamicamente
function loadGoogleFont(fontName) {
    const head = document.getElementsByTagName('head')[0];

    // Verifica se a fonte já foi carregada (para não carregar novamente)
    const existingLink = document.getElementById('google-font-link');
    if (existingLink) {
        existingLink.remove(); // Remove a fonte anterior, se houver
    }

    // Cria o link para carregar a fonte do Google Fonts
    const link = document.createElement('link');
    link.id = 'google-font-link';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;

    head.appendChild(link);
}

// Evento de atualização da fonte Google Fonts ao digitar
document.getElementById('google-font').addEventListener('input', function() {
    const fontName = this.value.trim();
    if (fontName) {
        loadGoogleFont(fontName); // Carregar a fonte do Google Fonts
        document.getElementById('convite').style.fontFamily = `'${fontName}', sans-serif`; // Aplica a fonte no convite
    }
});


// Função para pegar os dados do formulário e renderizar o convite
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pega os valores dos campos
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const texto = document.getElementById('text').value;
    const cor = document.getElementById('cor').value;
    const fundoInput = document.getElementById('fundo').files[0];

    // Pega as novas propriedades do texto (cor e fonte)
    const textColor = document.getElementById('text-color').value;
    const fontFamilySelect = document.getElementById('font-family').value;
    const googleFont = document.getElementById('google-font').value.trim();

    // Preencher os campos do convite com os dados
    document.getElementById('evento-nome').textContent = nome;
    document.getElementById('evento-data').textContent = data;
    document.getElementById('evento-local').textContent = local;
    document.getElementById('evento-texto').textContent = texto;

    // Atualizar a cor de fundo do convite
    const convite = document.getElementById('convite');
    convite.style.backgroundColor = cor;

    // Atualizar a cor do texto do convite
    convite.style.color = textColor;

    // Se a fonte do Google Fonts foi especificada, aplica-a
    if (googleFont) {
        loadGoogleFont(googleFont); // Carregar a fonte do Google Fonts
        convite.style.fontFamily = `'${googleFont}', sans-serif`; // Aplicar no convite
    } else {
        // Caso contrário, aplica a fonte escolhida no <select>
        convite.style.fontFamily = fontFamilySelect;
    }

    // Se o usuário escolher uma imagem de fundo, exibe-a
    if (fundoInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            convite.style.backgroundImage = `url(${e.target.result})`;
            convite.style.backgroundSize = 'cover';
            convite.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(fundoInput);
    } else {
        // Se não escolher uma imagem, garante que a imagem de fundo seja removida
        convite.style.backgroundImage = '';
    }

    // Exibir o convite na tela
    document.querySelector('.invite-section').style.display = 'block';
    document.getElementById('download-btn').style.display = 'block';
    document.getElementById('social-buttons').style.display = 'block';
});




// Função para baixar o convite como imagem (usando Canvas)
document.getElementById('download-btn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const convite = document.getElementById('convite');

    // Definir as dimensões do canvas
    canvas.width = convite.offsetWidth;
    canvas.height = convite.offsetHeight;

    // Desenhar o conteúdo do convite no canvas
    context.fillStyle = convite.style.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Se houver uma imagem de fundo, desenha a imagem no canvas
    const backgroundImage = convite.style.backgroundImage;
    if (backgroundImage) {
        const img = new Image();
        img.src = backgroundImage.replace('url("', '').replace('")', '');
        img.onload = function() {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Adiciona o texto sobre a imagem de fundo
            context.fillStyle = convite.style.color;
            context.font = '24px ' + convite.style.fontFamily;
            context.fillText(nome, 50, 50); // Exemplo de texto

            // Baixar a imagem gerada
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'convite.png';
            link.click();
        };
    }
});

// Funções de compartilhamento nas redes sociais
document.getElementById('share-facebook').addEventListener('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Convite para o evento "${document.getElementById('evento-nome').textContent}"`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
});

document.getElementById('share-instagram').addEventListener('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Convite para o evento "${document.getElementById('evento-nome').textContent}"`);
    window.open(`https://www.instagram.com/?url=${url}`, '_blank');
});

document.getElementById('share-whatsapp').addEventListener('click', function(e) {
    e.preventDefault();
    const text = encodeURIComponent(`Convite para o evento "${document.getElementById('evento-nome').textContent}"`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
});

// Mostrar o seletor de cor quando clicar na paleta de cores para a cor de fundo
document.getElementById('color-picker-btn-background').addEventListener('click', function() {
    const colorInput = document.getElementById('cor');
    colorInput.click(); // Isso abre o seletor de cor para o fundo
});

// Mostrar o seletor de cor quando clicar na paleta de cores para a cor do texto
document.getElementById('color-picker-btn-text').addEventListener('click', function() {
    const colorInput = document.getElementById('text-color');
    colorInput.click(); // Isso abre o seletor de cor para o texto
});

// Atualizar a cor de fundo ao selecionar uma cor
document.getElementById('cor').addEventListener('input', function() {
    const corSelecionada = this.value;
    const convite = document.getElementById('convite');
    convite.style.backgroundColor = corSelecionada;
});

// Atualizar a cor do texto ao selecionar uma cor
document.getElementById('text-color').addEventListener('input', function() {
    const textColorSelecionada = this.value;
    const convite = document.getElementById('convite');
    convite.style.color = textColorSelecionada;
});


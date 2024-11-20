// Função para atualizar a área de pré-visualização
function atualizarPreview() {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const texto = document.getElementById('text').value;
    const cor = document.getElementById('cor').value;
    const fundoInput = document.getElementById('fundo').files[0];
    
    // Novas propriedades para cor e fonte
    const textColor = document.getElementById('text-color').value;
    const fontFamilySelect = document.getElementById('font-family').value;
    const googleFont = document.getElementById('google-font').value.trim();

    // Atualiza o conteúdo da área de preview, sem mostrar o traço caso o valor esteja vazio
    document.getElementById('preview-nome').textContent = nome || '';
    document.getElementById('preview-data').textContent = data || '';
    document.getElementById('preview-local').textContent = local || '';
    document.getElementById('preview-texto').textContent = texto || '';
    
    // Atualiza a cor de fundo do preview
    const preview = document.getElementById('preview');
    preview.style.backgroundColor = cor;

    // Atualiza a cor do texto do preview
    preview.style.color = textColor;
    
    // Atualiza a fonte do texto do preview
    if (googleFont) {
        loadGoogleFont(googleFont); // Carrega a fonte do Google Fonts
        preview.style.fontFamily = `'${googleFont}', sans-serif`; // Aplica a fonte do Google Fonts
    } else {
        preview.style.fontFamily = fontFamilySelect; // Aplica a fonte escolhida no select
    }

    // Se o usuário escolheu uma imagem de fundo, exibe-a no preview
    if (fundoInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.style.backgroundImage = `url(${e.target.result})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(fundoInput);
    } else {
        // Se não escolher uma imagem, remove o fundo
        preview.style.backgroundImage = '';
    }
}

// Adiciona eventos de input para atualizar o preview em tempo real
document.getElementById('nome').addEventListener('input', atualizarPreview);
document.getElementById('data').addEventListener('input', atualizarPreview);
document.getElementById('local').addEventListener('input', atualizarPreview);
document.getElementById('text').addEventListener('input', atualizarPreview);
document.getElementById('cor').addEventListener('input', atualizarPreview);
document.getElementById('text-color').addEventListener('input', atualizarPreview);
document.getElementById('font-family').addEventListener('change', atualizarPreview);
document.getElementById('google-font').addEventListener('input', atualizarPreview); // Adiciona evento para o campo Google Fonts
document.getElementById('fundo').addEventListener('change', atualizarPreview);

// Chama a função para preencher o preview ao carregar a página (caso haja dados prévios)
window.addEventListener('load', atualizarPreview);

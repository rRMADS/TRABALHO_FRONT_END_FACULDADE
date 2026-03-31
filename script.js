// Array com todos os carros do site - cada objeto tem id, nome, tipo, imagem, specs e preco
const carros = [
    {
        id: 1,
        nome: 'BMW M3',
        tipo: 'sedan',
        imagem: 'bmw-m3.jpg',
        potencia: '503 cv',
        aceleracao: '3.9s',
        velocidade: '290 km/h',
        preco: 'R$ 650.000',
        descricao: 'Sedã de luxo de alta performance da BMW com motor 3.0L Twin-Turbo. Design agressivo e desempenho excepcional.',
        especificacoes: {
            'Motor': '3.0L Twin-Turbo 6 cilindros',
            'Potência': '503 cv',
            'Torque': '680 Nm',
            'Aceleração': '3.9s (0-100 km/h)',
            'Velocidade Máxima': '290 km/h',
            'Consumo': '9,2 km/l',
            'Câmbio': 'Automático 8 velocidades',
            'Tração': 'Integral',
            'Preço': 'R$ 650.000'
        }
    },
    {
        id: 2,
        nome: 'McLaren W1',
        tipo: 'supercar',
        imagem: 'mclaren-w1.jpg',
        potencia: '1.000+ cv',
        aceleracao: '2,7s',
        velocidade: '370+ km/h',
        preco: 'R$ 18.000.000',
        descricao: 'Hipercar com motor V8 hybrid que proporciona desempenho extremo. Limitado a apenas 399 unidades.',
        especificacoes: {
            'Motor': '4.0L V8 Twin-Turbo Hybrid',
            'Potência': '1.000+ cv',
            'Torque': '1.200+ Nm',
            'Aceleração': '2,7s (0-100 km/h)',
            'Velocidade Máxima': '370+ km/h',
            'Consumo': 'Híbrido eficiente',
            'Câmbio': 'Automático 8 velocidades',
            'Tração': 'Integral',
            'Preço': 'R$ 18.000.000',
            'Produção': 'Limitada a 399 unidades'
        }
    },
    {
        id: 3,
        nome: 'AMG G63',
        tipo: 'suv',
        imagem: 'amg-g63.jpg',
        potencia: '585 cv',
        aceleracao: '4,4s',
        velocidade: '240 km/h',
        preco: 'R$ 1.200.000',
        descricao: 'SUV de luxo Mercedes-AMG com motor V8 potente. Combina elegância com off-road capability.',
        especificacoes: {
            'Motor': '4.0L V8 Twin-Turbo',
            'Potência': '585 cv',
            'Torque': '850 Nm',
            'Aceleração': '4,4s (0-100 km/h)',
            'Velocidade Máxima': '240 km/h',
            'Consumo': '8,5 km/l',
            'Câmbio': 'Automático 9 velocidades',
            'Tração': '4WD',
            'Preço': 'R$ 1.200.000',
            'Capacidade Off-Road': 'Excelente'
        }
    },
    {
        id: 4,
        nome: 'Ferrari Puro Sangue',
        tipo: 'supercar',
        imagem: 'ferrari-puro-sangue.jpg',
        potencia: '725 cv',
        aceleracao: '2,85s',
        velocidade: '340 km/h',
        preco: 'R$ 4.500.000',
        descricao: 'Ícone italiano de velocidade com motor V12 aspirado. Pura essência da engenharia Ferrari.',
        especificacoes: {
            'Motor': '6.5L V12 Aspirado',
            'Potência': '725 cv',
            'Torque': '770 Nm',
            'Aceleração': '2,85s (0-100 km/h)',
            'Velocidade Máxima': '340 km/h',
            'Consumo': '8,0 km/l',
            'Câmbio': 'Automático 7 velocidades DCT',
            'Tração': 'Traseira',
            'Preço': 'R$ 4.500.000',
            'Som do Motor': 'Icônico'
        }
    }
];

// Carrega favoritos do localStorage (se nao tiver nada, comeca com array vazio)
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Guarda qual filtro esta ativo no momento
let filtroAtivo = 'all';

// Quando a pagina termina de carregar, inicializa tudo
document.addEventListener('DOMContentLoaded', () => {
    inicializarCarros();      // monta os cards no grid
    inicializarComparador();  // preenche os selects do comparador
    inicializarFavoritos();   // mostra os favoritos salvos
    inicializarFormulario();  // configura validacao do form
    inicializarMenu();        // configura menu hamburger
});

// Cria os cards de cada carro e coloca no grid
function inicializarCarros() {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = ''; // limpa antes de renderizar

    carros.forEach(carro => {
        // Usa <article> como tag semantica para cada card
        const carCard = document.createElement('article');
        carCard.className = 'car-card';
        carCard.setAttribute('data-tipo', carro.tipo);  // tipo usado pelo filtro
        carCard.setAttribute('data-id', carro.id);       // id usado pelos favoritos

        // Template literal com o HTML do card
        carCard.innerHTML = `
            <div class="car-image">${carro.imagem ? `<img src="${carro.imagem}" alt="${carro.nome}">` : `[${carro.nome}]`}</div>
            <div class="car-info">
                <h3 class="car-name">${carro.nome}</h3>
                <p class="car-tipo">${carro.tipo}</p>
                <div class="car-specs">
                    <div class="spec">
                        <div class="spec-label">Potência</div>
                        <div class="spec-value">${carro.potencia}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">0-100 km/h</div>
                        <div class="spec-value">${carro.aceleracao}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">V. Máxima</div>
                        <div class="spec-value">${carro.velocidade}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">Preço</div>
                        <div class="spec-value">${carro.preco}</div>
                    </div>
                </div>
                <div class="car-actions">
                    <button class="btn-small btn-info" onclick="mostrarDetalhes(${carro.id})">
                        Detalhes
                    </button>
                    <button class="btn-small btn-favorite ${favoritos.includes(carro.id) ? 'favorited' : ''}"
                            onclick="toggleFavorito(${carro.id})"
                            aria-label="Adicionar aos favoritos">
                        ${favoritos.includes(carro.id) ? 'FAVORITADO' : 'FAVORITAR'}
                    </button>
                </div>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });

    // Depois de montar todos os cards, aplica o filtro ativo
    aplicarFiltro();
}

// Abre o modal com as informacoes detalhadas do carro
function mostrarDetalhes(id) {
    // Busca o carro pelo id no array
    const carro = carros.find(c => c.id === id);
    if (!carro) return;

    // Preenche nome e descricao no modal
    document.getElementById('modalCarroNome').textContent = carro.nome;
    document.getElementById('modalCarroDescricao').textContent = carro.descricao;

    // Gera o HTML das specs usando Object.entries para percorrer o objeto
    const especificacoesHTML = Object.entries(carro.especificacoes)
        .map(([chave, valor]) => `
            <div class="spec-item">
                <strong>${chave}</strong>
                <span>${valor}</span>
            </div>
        `)
        .join('');

    document.getElementById('modalEspecificacoes').innerHTML = especificacoesHTML;

    // Salva o id do carro no modal para o botao de favoritar saber qual carro eh
    document.getElementById('detalhesModal').setAttribute('data-carro-id', id);

    // Mostra o modal e trava o scroll da pagina
    const modal = document.getElementById('detalhesModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fecha o modal e libera o scroll
function fecharModal() {
    const modal = document.getElementById('detalhesModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Favorita/desfavorita o carro que esta aberto no modal
function adicionarAoFavoritoModal() {
    // Pega o id do carro que ta no modal
    const carroId = parseInt(document.getElementById('detalhesModal').getAttribute('data-carro-id'));
    toggleFavorito(carroId);

    const carro = carros.find(c => c.id === carroId);
    const isFavorito = favoritos.includes(carroId);

    // Cria uma notificacao visual temporaria
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${isFavorito ? '#27ae60' : '#6b6b6b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-weight: 600;
    `;
    notificacao.textContent = isFavorito ? `${carro.nome} adicionado aos favoritos!` : `${carro.nome} removido dos favoritos!`;
    document.body.appendChild(notificacao);

    // Remove a notificacao depois de 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse';
        setTimeout(() => notificacao.remove(), 600);
    }, 3000);
}

// Fecha o modal se clicar fora dele (na area escura)
window.addEventListener('click', (event) => {
    const modal = document.getElementById('detalhesModal');
    if (event.target === modal) {
        fecharModal();
    }
});

// Fecha o modal com a tecla ESC
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('detalhesModal');
        if (modal.classList.contains('active')) {
            fecharModal();
        }
    }
});

// Adiciona ou remove um carro dos favoritos
function toggleFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index > -1) {
        favoritos.splice(index, 1); // ja esta nos favoritos, entao remove
    } else {
        favoritos.push(id); // nao esta, entao adiciona
    }

    // Salva no localStorage para persistir mesmo fechando o navegador
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    // Atualiza o texto e a classe dos botoes de favorito nos cards
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const cardId = parseInt(btn.closest('.car-card').getAttribute('data-id'));
        if (cardId === id) {
            btn.classList.toggle('favorited');
            btn.textContent = favoritos.includes(id) ? 'FAVORITADO' : 'FAVORITAR';
        }
    });

    // Atualiza a secao de favoritos
    inicializarFavoritos();
}

// Muda o filtro ativo e destaca o botao selecionado
function filtrarCarros(tipo) {
    filtroAtivo = tipo;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === tipo) {
            btn.classList.add('active');
        }
    });
    aplicarFiltro();
}

// Mostra ou esconde os cards conforme o filtro
function aplicarFiltro() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        if (filtroAtivo === 'all' || tipo === filtroAtivo) {
            card.classList.remove('hidden'); // mostra
        } else {
            card.classList.add('hidden');    // esconde
        }
    });
}

// Registra o evento de clique nos botoes de filtro
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtrarCarros(btn.getAttribute('data-filter'));
        });
    });
});

// Preenche os selects do comparador com os nomes dos carros
function inicializarComparador() {
    const select1 = document.getElementById('carro1');
    const select2 = document.getElementById('carro2');

    // Cria uma option para cada carro nos dois selects
    carros.forEach(carro => {
        const option1 = document.createElement('option');
        option1.value = carro.id;
        option1.textContent = carro.nome;
        select1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = carro.id;
        option2.textContent = carro.nome;
        select2.appendChild(option2);
    });

    // Atualiza a tabela sempre que mudar a selecao
    select1.addEventListener('change', atualizarComparador);
    select2.addEventListener('change', atualizarComparador);
}

// Monta a tabela comparando as specs dos dois carros escolhidos
function atualizarComparador() {
    const id1 = document.getElementById('carro1').value;
    const id2 = document.getElementById('carro2').value;

    // Se nenhum carro foi selecionado, limpa a tabela
    if (!id1 || !id2) {
        document.getElementById('comparadorTabela').innerHTML = '';
        return;
    }

    const carro1 = carros.find(c => c.id == id1);
    const carro2 = carros.find(c => c.id == id2);
    if (!carro1 || !carro2) return;

    // Set junta as chaves dos dois carros sem repetir
    const todasAsEspecificacoes = new Set([
        ...Object.keys(carro1.especificacoes),
        ...Object.keys(carro2.especificacoes)
    ]);

    // Monta o HTML da tabela
    let tabela = `
    <table class="tabela-comparacao">
        <thead>
            <tr>
                <th>Especificação</th>
                <th>${carro1.nome}</th>
                <th>${carro2.nome}</th>
            </tr>
        </thead>
        <tbody>
    `;

    // Uma linha para cada spec, mostra '-' se o carro nao tiver aquela spec
    todasAsEspecificacoes.forEach(spec => {
        const valor1 = carro1.especificacoes[spec] || '-';
        const valor2 = carro2.especificacoes[spec] || '-';
        tabela += `
            <tr>
                <td>${spec}</td>
                <td>${valor1}</td>
                <td>${valor2}</td>
            </tr>
        `;
    });

    tabela += '</tbody></table>';
    document.getElementById('comparadorTabela').innerHTML = tabela;
}

// Renderiza os carros favoritados na secao de favoritos
function inicializarFavoritos() {
    const container = document.getElementById('favoritosContainer');
    const btnLimpar = document.getElementById('limparFavoritos');

    // Se nao tem favoritos, mostra mensagem
    if (favoritos.length === 0) {
        container.innerHTML = `
            <div class="favoritos-empty">
                <p>Nenhum carro marcado como favorito</p>
                <p>Clique no botão FAVORITAR para adicionar seus carros favoritos!</p>
            </div>
        `;
        btnLimpar.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    btnLimpar.style.display = 'inline-block';

    // Cria um card para cada carro favoritado
    favoritos.forEach(id => {
        const carro = carros.find(c => c.id === id);
        if (carro) {
            const card = document.createElement('article');
            card.className = 'car-card';
            card.innerHTML = `
                <div class="car-image">${carro.imagem ? `<img src="${carro.imagem}" alt="${carro.nome}">` : `[${carro.nome}]`}</div>
                <div class="car-info">
                    <h3 class="car-name">${carro.nome}</h3>
                    <p class="car-tipo">${carro.tipo}</p>
                    <div class="car-specs">
                        <div class="spec">
                            <div class="spec-label">Potência</div>
                            <div class="spec-value">${carro.potencia}</div>
                        </div>
                        <div class="spec">
                            <div class="spec-label">0-100 km/h</div>
                            <div class="spec-value">${carro.aceleracao}</div>
                        </div>
                    </div>
                    <div class="car-actions">
                        <button class="btn-small btn-info" onclick="mostrarDetalhes(${carro.id})">
                            Detalhes
                        </button>
                        <button class="btn-small btn-favorite favorited" onclick="toggleFavorito(${carro.id})">
                            REMOVER
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

// Botao de limpar todos os favoritos - pede confirmacao antes
document.addEventListener('DOMContentLoaded', () => {
    const btnLimpar = document.getElementById('limparFavoritos');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (confirm('Deseja remover todos os carros dos favoritos?')) {
                favoritos = [];
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                inicializarFavoritos(); // atualiza a secao de favoritos
                inicializarCarros();    // atualiza os botoes nos cards
            }
        });
    }
});

// Configura a validacao do formulario de contato
function inicializarFormulario() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Intercepta o submit para validar antes de enviar
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // impede o envio padrao do form
        if (validarFormulario()) {
            // Se passou na validacao, mostra mensagem de sucesso
            const successMsg = document.createElement('div');
            successMsg.className = 'success-msg';
            successMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            form.appendChild(successMsg);

            form.reset(); // limpa os campos

            // Remove a mensagem de sucesso apos 4 segundos
            setTimeout(() => {
                successMsg.remove();
            }, 4000);
        }
    });
}

// Valida os campos do formulario e retorna true/false
function validarFormulario() {
    let isValido = true;
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    // Limpa erros anteriores
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Nome precisa ter no minimo 3 caracteres
    if (nome.value.trim().length < 3) {
        mostrarErro('nome', 'Nome deve ter pelo menos 3 caracteres');
        isValido = false;
    }

    // Regex para validar formato de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        mostrarErro('email', 'Email inválido');
        isValido = false;
    }

    // Mensagem precisa ter no minimo 10 caracteres
    if (mensagem.value.trim().length < 10) {
        mostrarErro('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
        isValido = false;
    }

    return isValido;
}

// Mostra a mensagem de erro embaixo do campo invalido
function mostrarErro(campo, mensagem) {
    const input = document.getElementById(campo);
    const grupo = input.closest('.form-group'); // pega o div pai do input
    // Monta o id do span de erro (ex: erroNome, erroEmail, erroMensagem)
    const msgErro = document.getElementById(`erro${campo.charAt(0).toUpperCase() + campo.slice(1)}`);

    grupo.classList.add('error'); // ativa o estilo de erro no CSS
    if (msgErro) {
        msgErro.textContent = mensagem;
    }
}

// Configura o menu hamburger para mobile
function inicializarMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        // Abre/fecha o menu ao clicar no hamburger
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Atualiza aria-expanded para acessibilidade
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// IntersectionObserver - anima os cards quando aparecem na tela (lazy loading visual)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                observer.unobserve(entry.target); // para de observar depois de animar
            }
        });
    }, {
        threshold: 0.1,                  // dispara quando 10% do elemento esta visivel
        rootMargin: '0px 0px -100px 0px' // margem para atrasar um pouco o disparo
    });

    // Observa todos os cards ao carregar a pagina
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.car-card').forEach(card => {
            observer.observe(card);
        });
    });
}

// Navegacao por teclado para acessibilidade
document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Setas navegam entre os cards visiveis
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const cards = document.querySelectorAll('.car-card:not(.hidden)');
        const focused = document.activeElement;

        if (cards.length > 0) {
            const currentIndex = Array.from(cards).indexOf(focused);
            if (currentIndex !== -1) {
                const nextIndex = e.key === 'ArrowRight'
                    ? (currentIndex + 1) % cards.length              // avanca (circular)
                    : (currentIndex - 1 + cards.length) % cards.length; // recua (circular)
                cards[nextIndex].focus();
            }
        }
    }
});

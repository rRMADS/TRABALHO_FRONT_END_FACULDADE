// ==================== BASE DE DADOS DOS CARROS ====================
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

// ==================== ESTADO DA APLICAÇÃO ====================
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let filtroAtivo = 'all';

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    inicializarCarros();
    inicializarComparador();
    inicializarFavoritos();
    inicializarFormulario();
    inicializarMenu();
});

// ==================== FUNÇÃO: INICIALIZAR CARROS ====================
function inicializarCarros() {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';

    carros.forEach(carro => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-tipo', carro.tipo);
        carCard.setAttribute('data-id', carro.id);
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

    aplicarFiltro();
}

// ==================== FUNÇÃO: MOSTRAR DETALHES DO CARRO ====================
function mostrarDetalhes(id) {
    const carro = carros.find(c => c.id === id);
    if (!carro) return;

    // Preencher modal com informações
    document.getElementById('modalCarroNome').textContent = carro.nome;
    document.getElementById('modalCarroDescricao').textContent = carro.descricao;

    // Preencher especificações
    const especificacoesHTML = Object.entries(carro.especificacoes)
        .map(([chave, valor]) => `
            <div class="spec-item">
                <strong>${chave}</strong>
                <span>${valor}</span>
            </div>
        `)
        .join('');

    document.getElementById('modalEspecificacoes').innerHTML = especificacoesHTML;

    // Armazenar ID do carro atual no modal para usar na ação
    document.getElementById('detalhesModal').setAttribute('data-carro-id', id);

    // Mostrar modal com animação
    const modal = document.getElementById('detalhesModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquear scroll do fundo
}

// ==================== FUNÇÃO: FECHAR MODAL ====================
function fecharModal() {
    const modal = document.getElementById('detalhesModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// ==================== FUNÇÃO: ADICIONAR AO FAVORITO PELO MODAL ====================
function adicionarAoFavoritoModal() {
    const carroId = parseInt(document.getElementById('detalhesModal').getAttribute('data-carro-id'));
    toggleFavorito(carroId);
    
    // Mensagem de feedback
    const modal = document.getElementById('detalhesModal');
    const carro = carros.find(c => c.id === carroId);
    const isFavorito = favoritos.includes(carroId);
    
    // Criar notificação temporária
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
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse';
        setTimeout(() => notificacao.remove(), 600);
    }, 3000);
}

// ==================== FECHAR MODAL CLICANDO FORA ====================
window.addEventListener('click', (event) => {
    const modal = document.getElementById('detalhesModal');
    if (event.target === modal) {
        fecharModal();
    }
});

// ==================== FECHAR MODAL COM TECLA ESC ====================
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('detalhesModal');
        if (modal.classList.contains('active')) {
            fecharModal();
        }
    }
});

// ==================== FUNÇÃO: TOGGLE FAVORITO ====================
function toggleFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
    // Atualizar botões
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const cardId = parseInt(btn.closest('.car-card').getAttribute('data-id'));
        if (cardId === id) {
            btn.classList.toggle('favorited');
            btn.textContent = favoritos.includes(id) ? 'FAVORITADO' : 'FAVORITAR';
        }
    });

    // Atualizar favoritos
    inicializarFavoritos();
}

// ==================== FUNÇÃO: FILTRAR CARROS ====================
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

function aplicarFiltro() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        if (filtroAtivo === 'all' || tipo === filtroAtivo) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Adicionar event listeners aos filtros
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtrarCarros(btn.getAttribute('data-filter'));
        });
    });
});

// ==================== FUNÇÃO: INICIALIZAR COMPARADOR ====================
function inicializarComparador() {
    const select1 = document.getElementById('carro1');
    const select2 = document.getElementById('carro2');

    // Preencher selects
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

    // Event listeners
    select1.addEventListener('change', atualizarComparador);
    select2.addEventListener('change', atualizarComparador);
}

function atualizarComparador() {
    const id1 = document.getElementById('carro1').value;
    const id2 = document.getElementById('carro2').value;

    if (!id1 || !id2) {
        document.getElementById('comparadorTabela').innerHTML = '';
        return;
    }

    const carro1 = carros.find(c => c.id == id1);
    const carro2 = carros.find(c => c.id == id2);

    if (!carro1 || !carro2) return;

    const todasAsEspecificacoes = new Set([
        ...Object.keys(carro1.especificacoes),
        ...Object.keys(carro2.especificacoes)
    ]);

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

// ==================== FUNÇÃO: INICIALIZAR FAVORITOS ====================
function inicializarFavoritos() {
    const container = document.getElementById('favoritosContainer');
    const btnLimpar = document.getElementById('limparFavoritos');

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

    favoritos.forEach(id => {
        const carro = carros.find(c => c.id === id);
        if (carro) {
            const card = document.createElement('div');
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

// Limpar todos favoritos
document.addEventListener('DOMContentLoaded', () => {
    const btnLimpar = document.getElementById('limparFavoritos');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (confirm('Deseja remover todos os carros dos favoritos?')) {
                favoritos = [];
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                inicializarFavoritos();
                inicializarCarros();
            }
        });
    }
});

// ==================== FUNÇÃO: VALIDAR E ENVIAR FORMULÁRIO ====================
function inicializarFormulario() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        if (!validarFormulario()) {
            e.preventDefault();
        }
    });
}

function validarFormulario() {
    let isValido = true;
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    // Limpar erros anteriores
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Validar Nome
    if (nome.value.trim().length < 3) {
        mostrarErro('nome', 'Nome deve ter pelo menos 3 caracteres');
        isValido = false;
    }

    // Validar Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        mostrarErro('email', 'Email inválido');
        isValido = false;
    }

    // Validar Mensagem
    if (mensagem.value.trim().length < 10) {
        mostrarErro('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
        isValido = false;
    }

    return isValido;
}

function mostrarErro(campo, mensagem) {
    const input = document.getElementById(campo);
    const grupo = input.closest('.form-group');
    const msgErro = document.getElementById(`erro${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    
    grupo.classList.add('error');
    if (msgErro) {
        msgErro.textContent = mensagem;
    }
}


// ==================== FUNÇÃO: MENU MOBILE ====================
function inicializarMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ==================== MELHORIAS: LAZY LOADING E PERFORMANCE ====================
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.car-card').forEach(card => {
            observer.observe(card);
        });
    });
}

// ==================== ACESSIBILIDADE: SUPORTE A TECLADO ====================
document.addEventListener('keydown', (e) => {
    // ESC para fechar menu mobile
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Navegação por teclado entre cards
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const cards = document.querySelectorAll('.car-card:not(.hidden)');
        const focused = document.activeElement;
        
        if (cards.length > 0) {
            const currentIndex = Array.from(cards).indexOf(focused);
            if (currentIndex !== -1) {
                const nextIndex = e.key === 'ArrowRight' 
                    ? (currentIndex + 1) % cards.length 
                    : (currentIndex - 1 + cards.length) % cards.length;
                cards[nextIndex].focus();
            }
        }
    }
});

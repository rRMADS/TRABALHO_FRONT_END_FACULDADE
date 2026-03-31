# LuxeDrive - Carros de Luxo e Alta Performance

## Sobre o Projeto

O **LuxeDrive** e um site interativo e responsivo que apresenta um catalogo de carros de luxo e alta performance. O projeto foi desenvolvido como trabalho pratico da disciplina de Programacao Front-End do curso de Analise e Desenvolvimento de Sistemas.

## Tema

Catalogo de carros de luxo, com foco na apresentacao visual dos veiculos, comparacao de especificacoes tecnicas e sistema de favoritos.

## Funcionalidades

- **Catalogo de Carros**: Exibicao dos carros em grid com imagens, especificacoes e precos.
- **Filtro por Categoria**: Filtragem dos carros por tipo (Sedan, Supercar, SUV) com atualizacao dinamica.
- **Comparador de Carros**: Comparacao lado a lado das especificacoes tecnicas de dois carros selecionados.
- **Sistema de Favoritos**: Adicionar/remover carros dos favoritos com persistencia via localStorage.
- **Modal de Detalhes**: Visualizacao detalhada das especificacoes tecnicas de cada carro em janela modal.
- **Formulario de Contato**: Formulario com validacao de campos (nome, email e mensagem) via JavaScript.
- **Menu Responsivo**: Menu hamburguer para navegacao em dispositivos moveis.
- **Botao WhatsApp**: Botao flutuante para contato direto via WhatsApp.
- **Animacoes e Efeitos**: Animacoes de entrada, hover effects, transicoes suaves e lazy loading com IntersectionObserver.
- **Navegacao por Teclado**: Suporte a teclas ESC e setas para acessibilidade.

## Tecnologias Utilizadas

- **HTML5**: Estrutura semantica com tags como `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **CSS3**: Estilizacao completa com variaveis CSS, Grid Layout, Flexbox, Media Queries, pseudo-classes, pseudo-elementos e animacoes com keyframes.
- **JavaScript (ES6+)**: Manipulacao do DOM, eventos, localStorage, IntersectionObserver, validacao de formularios — sem uso de frameworks.

## Estrutura de Arquivos

```
LuxeDrive/
├── index.html          # Pagina principal do site
├── styles.css          # Estilos CSS do site
├── script.js           # Logica JavaScript do site
├── hero-bg.jpeg        # Imagem de fundo da hero section
├── bmw-m3.jpg          # Imagem do BMW M3
├── mclaren-w1.jpg      # Imagem da McLaren W1
├── amg-g63.jpg         # Imagem do AMG G63
├── ferrari-puro-sangue.jpg  # Imagem da Ferrari Puro Sangue
└── README.md           # Documentacao do projeto
```

## Responsividade

O site se adapta a diferentes tamanhos de tela:

- **Desktop** (acima de 768px): Grid de 2 colunas, navbar horizontal.
- **Tablet** (ate 768px): Grid de 2 colunas, menu hamburguer, comparador em coluna unica.
- **Mobile** (ate 480px): Grid de 1 coluna, botoes empilhados, fontes reduzidas.

## Acessibilidade

- Texto alternativo (`alt`) em todas as imagens.
- Atributos `aria-label` e `aria-expanded` nos elementos interativos.
- Navegacao por teclado (ESC para fechar modal/menu, setas para navegar entre cards).
- Contraste adequado entre texto e fundo.
- Suporte a `prefers-reduced-motion` para usuarios que preferem menos animacoes.
- Outline visivel para navegacao por teclado (`focus-visible`).

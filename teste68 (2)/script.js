console.log("✅ Script carregado com sucesso!");

// ===================================
// 📜 VARIÁVEIS GLOBAIS E ELEMENTOS
// ===================================

const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const cursor = document.getElementById('cursor');
const cursorhold = document.getElementById('cursor-segurando');
const botaocozinha = document.getElementById('placeholderbotaocozinha');
const container = document.getElementById('container'); // ADICIONADO

//====================== ÁUDIOS
// Música de fundo            
const background = new Audio('audio/popstar.m4a')

// Efeitos para começo e fim de tarefas
const start = new Audio('audio/started.m4a');
const finish = new Audio('audio/completed.m4a')
const finish2 = new Audio('audio/completed2.mp3');
const finish3 = new Audio('audio/focus.m4a');
const finish4 = new Audio('audio/flower.m4a');

// Efeitos para realização de ações
const task1 = new Audio('audio/step1.m4a');
const task2 = new Audio('audio/step2.m4a');
const task3 = new Audio('audio/step3.m4a');
const task4 = new Audio('audio/step4.m4a');

// Efeito para obtenção de dinheiro
const cash = new Audio('audio/money.m4a');

//======================= Elementos das Mesas (Imagens e Containers)
const mesa1 = document.getElementById('mesa1'); // A imagem da mesa (onde clica)
const mesa2 = document.getElementById('mesa2');
const mesa3 = document.getElementById('mesa3');

const mesa1e = document.getElementById('mesa1-guardar'); // A div (onde o cliente entra)
const mesa2e = document.getElementById('mesa2-guardar');
const mesa3e = document.getElementById('mesa3-guardar');

//======================= COZINHA
let kitchenopen = false;
const kitchen = document.getElementById('cozinha');
            
// Mistura
const espatula = document.getElementById('espatula');
const panela = document.getElementById('panela');
const panelaFundo = document.getElementById('panela-fundo');
const panelaArea = document.getElementById('panela-area');
const barra = document.getElementById('barracheia');
const manteiga = document.getElementById('manteiga');
const manteigaColher = document.getElementById('manteigaColher');
const chocolate = document.getElementById('chocolate');
const chocolateColher = document.getElementById('chocolateColher');
const leitecon = document.getElementById('leitecon');
const brigadeiromistura = document.getElementById('brigadeiromistura');

const manteigapanela = document.getElementById('manteigapanela');
const chocolatepanela = document.getElementById('chocolatepanela');
const leiteconpanela = document.getElementById('leiteconpanela');

let ingredienteBrigadeiro = 0;
let segurandoObjeto = false;

let misturaConcluida = false;
let espatulaSelecionado = false;
let manteigaSelecionado = false;
let chocolateSelecionado = false;
let leiteconSelecionado = false;

let manteigaAdicionado = false;
let chocolateAdicionado = false;
let leiteconAdicionado = false;

let granuladoConcluido = false;

// Misturar
let loop = 0;
let count = 0;
let pontosmistura = 0;
let variavelmistura = 100;
let variavelmistura2 = 0;
let variavelbarra = -800;

let minigameiniciado = false
            
// Desempenho
const good = document.getElementById('good');
const great = document.getElementById('great');
const awesome = document.getElementById('awesome');

//==================== Variáveis de Movimento do Jeca
let move = false;
let posX = 300;
let posY = 200;
let targetX = posX;
let targetY = posY;
let endposition = "right";
let playerSpeed = 7; 

// Variáveis de Jogo (Dinheiro, etc)
// let dinheiro = 25;
// let paciencia = 0;
// let bonus = 0;

let mouseX = 0;
let mouseY = 0;

// ===================================
// 👥 SISTEMA DE CLIENTES E MESAS
// ===================================

// Variáveis de Clientes
let client = [];
let clientClicado = []; // Array para segurar o cliente selecionado
const maxClients = 3;
let occupiedPositions = new Set();
let num = 0;
let num2 = 0; //para o pedido

// Configurações de Clientes
const clientPositions = { 1: 100, 2: 50, 3: 0 };
const zclient = { 0: 3, 50: 4, 100: 5 };

// Sprites (Imagens)
const clientImg = [
    "aly.gif", "leandro.gif", "marrye.gif", "nox.gif",
    "pariz.gif", "pinguin.gif", "gigs.gif", "coruja.gif", "forg.gif"
];

// Estados na Mesa: [0] Sentado, [1] Pedindo, [2] Esperando
const clientMesa = [
    ["aly-sentada.png", "aly-pedindo.png", "aly-esperando.png", "aly-feliz.png"], 
    ["leandro-sentado.png", "leandro-pedindo.png", "leandro-esperando.png", "leandro-feliz.png"], 
    ["minhoca-sentada.png", "marrie-pedindo.png", "marrie-esperando-GIF.gif", "minhoca-sentada.png"], 
    ["NOX-SENTADO.png", "NOX-pedindo.png", "NOX-SENTADO.png", "NOX-feliz.png"], 
    ["pariz-sentada.png", "pariz-pedindo.png", "pariz-esperando.png", "pariz-felizkra.png"], 
    ["chea-sentada.png", "chea-pedindo.png", "chea-esperando.png", "chea-happy.png"], 
    ["girgs-sentado.png", "girgs-pedindo.png", "girgs-sentado.png", "girgs-feliz.png"], 
    ["coruja-sentada.png", "coruja-pedindo.png", "coruja-sentada.png", "coruja-feliz.png"], 
    ["forg-sentado.png", "forg-pedindo.png", "forg-sentado.png", "forg-feliz.png"]
];

// array com as comidas que conectará com o número do personagem na demo
const spriteComida = {
    1: "brigadeirobalao.png",
    2: "brigadeirobalao.png",
    3: "brigadeirobalao.png"
}

// ===================================
// 🏃 SCRIPT DE MOVIMENTO (JECA)
// ===================================

function update() {
    const dx = targetX - posX;
    const dy = targetY - posY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
        move = true;
        posX += (dx / distance) * playerSpeed;
        posY += (dy / distance) * playerSpeed;

        if (player) {
            player.style.left = posX + "px";
            player.style.top = posY + "px";
        }
    } else if (distance <= 5 && move === true) {
        move = false;
        if (player) {
            if (endposition === "left") player.src = "img/Jeca-paradoL.gif";
            if (endposition === "right") player.src = "img/Jeca-paradoR.gif";
        }
    }
    requestAnimationFrame(update);
}

if (gameArea) {
    gameArea.addEventListener('click', (event) => {
        // Se clicar num cliente, não move o Jeca (para evitar bugs visuais)
        if (event.target.classList.contains('cliente')) return;

        move = true;
        const rect = gameArea.getBoundingClientRect();
        targetX = event.clientX - rect.left;
        targetY = event.clientY - rect.top - 70;

        if (player) {
            if (targetX < posX) {
                player.src = "img/Jeca-correndoL.gif";
                endposition = "left";
            } else {
                player.src = "img/Jeca-correndoR.gif";
                endposition = "right";
            }
        }
    });
}

// ===================================
// ⚙️ SISTEMA DE MODAIS
// ===================================

function setupModal(btnId, modalId) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    if (!btn || !modal) return;

    const span = modal.querySelector(".fechar");
    btn.addEventListener("click", () => modal.style.display = "flex");
    if (span) span.addEventListener("click", () => modal.style.display = "none");
    
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
}

// ===================================
// 🎯 FUNÇÃO VISIVEL (COZINHA)
// ===================================

function visivel() {
    if (kitchenopen === false) {
        setTimeout(() => {
            if (container) container.style.display = "none";
            if (gameArea) gameArea.style.display = "none";
        }, 2000); // igual ao tempo da animação

        kitchen.style.display = "flex";     // aparece
        requestAnimationFrame(() => {
            kitchen.classList.add("animar"); // anima
        });

        kitchenopen = true;
    } 
    else if (kitchenopen === true) {
        if (container) container.style.display = "flex";
        if (gameArea) gameArea.style.display = "flex";
        kitchen.classList.remove("animar"); // some suavemente
        setTimeout(() => {
            kitchen.style.display = "none"; // depois de sumir
        }, 2000); // igual ao tempo da animação
        kitchenopen = false;
    }
}

// ===================================
// 👥 FUNÇÕES DE CLIENTES
// ===================================

function selecionarNum() {
    return Math.floor(Math.random() * clientImg.length);
}

function time() {
    return Math.random() * 5000;
}

function criarCliente() {
    num++;
    let pos = clientPositions[num];
    let z = zclient[pos];

    occupiedPositions.add(pos);

    const clientDiv = document.createElement('img');
    clientDiv.classList.add('cliente');
    clientDiv.style.left = `${pos}px`;
    clientDiv.style.zIndex = `${z}`;

    // Define qual personagem é
    const numSprite = selecionarNum();
    clientDiv.src = `img/${clientImg[numSprite]}`;
    clientDiv.dataset.sprite = JSON.stringify(numSprite); // Guarda o ID

    if (gameArea) gameArea.appendChild(clientDiv);
    client.push(clientDiv);

    // --- CLIQUE NO CLIENTE (Apenas seleciona) ---
    clientDiv.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede outros cliques

        if (clientClicado.length > 0) {
            console.log("⚠️ Você já tem um cliente selecionado!");
            return;
        }

        if (!clientClicado.includes(clientDiv)) {
            clientDiv.hidden = true; // Some da fila
            occupiedPositions.delete(pos);
            clientClicado.push(clientDiv); // Guarda na "mão"
            console.log("✅ Cliente pego! Clique numa mesa.");
        }
    });
}

function clientes3() {
    num = 0;
    let create = 0;
    const interval = setInterval(() => {
        if (create < maxClients) {
            criarCliente();
            create++;
        } else {
            clearInterval(interval);
        }
    }, 500);
}

// Função de verificações, posicionamento e colocando o moverCliente na prática
function tentarSentarCliente(mesa, mesal, mesaz, mesaElemento, posDireita, posEsquerda, zIndex) {
    // 1. Verifica se tem cliente na mão
    if (clientClicado.length === 0) return;

    const cliente = clientClicado[0];
    const clientesNaMesa = mesaElemento.querySelectorAll(".cliente").length;

    // 2. Verifica se mesa está cheia (max 2)
    if (clientesNaMesa >= 2) {
        console.log("⛔ Mesa cheia!");
        return;
    }

    // 3. Posiciona o cliente
    if (clientesNaMesa > 0) {
        // Lado Direito
        cliente.style.transform = "scaleX(-1)";
        moverCliente(cliente, mesaElemento, posDireita, "0px", zIndex);
        console.log("✅ Cliente posicionado na direita");
        mesa.src = "img-cenario/Mesa.png";
        mesa.style.left = mesal
        mesa.style.zIndex = mesaz
    } else {
        // Lado Esquerdo
        cliente.style.transform = "scaleX(1)";
        moverCliente(cliente, mesaElemento, posEsquerda, "0px", zIndex);
        console.log("✅ Cliente posicionado na esquerda");

    }

    const tempo = time()

    // 4. Anima e limpa seleção
    mudarSprite(cliente, tempo);
    balao(mesaElemento, tempo)
    clientClicado = [];
}

// estruturação do posicionamento do cliente e sprite dele sentado
function moverCliente(cliente, mesa, left, top, zIndex) {

    cliente.hidden = false; // cliente aparece
    mesa.appendChild(cliente); // Move o elemento HTML para dentro da div da mesa
    cliente.style.position = "absolute";
    cliente.style.left = left; // coloca os parâmetros no estilo do cliente
    cliente.style.top = top;
    cliente.style.zIndex = zIndex

    // Coloca imagem de sentado
    const spriteID = parseInt(cliente.dataset.sprite, 10);
    if (!Number.isNaN(spriteID)) {
        cliente.src = `img/${clientMesa[spriteID][0]}`;
    } else {
        console.warn("Opção inválida para sprite")
    }
}

function mudarSprite(cliente, tempo) {

    if (!cliente) return;
    const spriteID = parseInt(cliente.dataset.sprite, 10);

    // Loop de animação simples (Sentado <-> Pedindo)
    if (cliente._spriteIntervalId) clearInterval(cliente._spriteIntervalId);
    
    cliente._spriteIntervalId = setInterval(() => {
        cliente.src = `img/${clientMesa[spriteID][1]}`; // Pedindo    
    }, (tempo) + 5000);
}

function balao(mesa, tempo) {
    console.log("✅ pedido subiu!")

    num2 += 1
    console.log(`Pedido de número ${num2}`)

    const comidaEscolhida = document.createElement('img');

    comidaEscolhida.hidden = true
    comidaEscolhida.classList.add('comida');
    comidaEscolhida.src = `img-comida/${spriteComida[num2]}`;

    // ADICIONA O EVENT LISTENER AQUI
    comidaEscolhida.addEventListener('click', visivel);

    const clientesNaMesa = mesa.querySelectorAll(".cliente").length;

    if (clientesNaMesa > 1) {
        comidaEscolhida.style.width = "100px"
        comidaEscolhida.style.height = "auto"
        comidaEscolhida.style.position = "absolute"
        comidaEscolhida.style.top = "-95px"
        comidaEscolhida.style.left = "245px"
    } else {
        comidaEscolhida.style.width = "100px"
        comidaEscolhida.style.height = "auto"
        comidaEscolhida.style.position = "absolute"
        comidaEscolhida.style.top = "-95px"
        comidaEscolhida.style.left = "55px"
    }

    mesa.appendChild(comidaEscolhida);

    if (comidaEscolhida._spriteIntervalId) clearInterval(comidaEscolhida._spriteIntervalId);
    
    comidaEscolhida._spriteIntervalId = setInterval(() => {
        comidaEscolhida.hidden = false // Aparece o balão    
    }, (tempo) + 5000);
}

// ===================================
// 🍳 FUNÇÕES DA COZINHA
// ===================================

// Função da mistura
function misturar() {
    const leftetop = [
        { left: "140px", top: "10px" },
        { left: "140px", top: "250px" },
        { left: "270px", top: "150px" },
        { left: "20px",  top: "150px" },
        { left: "220px", top: "230px" },
        { left: "220px", top: "80px" },
        { left: "60px",  top: "80px" },
        { left: "60px",  top: "230px" },
        { left: "130px", top: "160px" },
    ];

    for (let i = 0; i <= 8; i++) {
        const element = document.createElement("div");
        element.id = "target" + i;
        element.style.zIndex = "599999995999999959999999";
        element.dataset.target = 0;
        element.style.width = "120px";
        element.style.height = "120px";
        element.style.position = "absolute";
        element.style.left = `${leftetop[i].left}`;
        element.style.top = `${leftetop[i].top}`;
        element.style.borderRadius = "100px"

        element.addEventListener('mouseover', (event) => {
            if (element.dataset.target === "0" && espatulaSelecionado === true && ingredienteBrigadeiro === 3) {
                espatula.style.pointerEvents = "none";
                task4.pause();
                task4.currentTime = 1;
                task4.play();
                task4.currentTime = 0.7;
                
                element.dataset.target = "1";
                count = count + 1;

                variavelmistura = variavelmistura - 1
                variavelmistura2 = variavelmistura2 + 1

                manteigapanela.style.opacity = variavelmistura + "%"
                chocolatepanela.style.opacity = variavelmistura + "%"
                leiteconpanela.style.opacity = variavelmistura + "%"

                brigadeiromistura.style.opacity = variavelmistura2 + "%"

                pontosmistura = pontosmistura+0.5
                let timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 0.5*0.2;
                }, 300);

                pontosmistura = pontosmistura+1
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 1*0.2;
                }, 500);

                pontosmistura = pontosmistura+1.5
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 1.5*0.2;
                }, 700);

                pontosmistura = pontosmistura+2
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 2*0.2;
                }, 1000);

                pontosmistura = pontosmistura+5
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 5*0.2;
                }, 2000);

                pontosmistura = pontosmistura+7.5
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 7.5*0.2;
                }, 3000);

                pontosmistura = pontosmistura+10
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 10 *0.2;
                }, 5000);
                
                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 3
                }, 10000);

                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 5
                }, 20000);

                timer = setTimeout(() => {
                    pontosmistura = pontosmistura - 10
                }, 35000);

                if (count === 8) {
                    loop = loop + 1;

                    // seleciona todos os alvos
                    const targets = document.querySelectorAll('[id^="target"]');
                    targets.forEach(t => {
                        t.dataset.target = "0";
                    });

                    count = 0
                }

                if (loop === 15) {
                    count = 0
                    const targets = document.querySelectorAll('[id^="target"]');
                    targets.forEach(t => {
                        t.dataset.target = "1";
                        // cancela o timeout
                        clearTimeout(timer);
                    });

                    if (pontosmistura < 1400) {
                        good.style.display = "inline"
                        setTimeout(() => {
                            good.style.display = "none"
                        }, 3000);

                    } else if (pontosmistura < 2000) {
                        great.style.display = "inline"
                        setTimeout(() => {
                            great.style.display = "none"
                        }, 3000);

                    } else {
                        awesome.style.display = "inline"
                        setTimeout(() => {
                            awesome.style.display = "none"
                        }, 3000);
                    }

                    finish.play();
                    cash.play();

                    
                    espatulaSelecionado = false

                    misturaConcluida = true
                    cursor.style.display = "none"
                    cursorhold.style.display = "none"

                    // Espera 7,5 segundos para iniciar o minigame do brigadeiro
                    setTimeout(() => {
                        const contador = document.createElement("a");
                        contador.style.position = "absolute"
                        contador.style.display = "none"
                        contador.href = "https://pt.vecteezy.com/videos-gratis/temporizador-5-segundos"
                        setTimeout(iniciarGranulado, 5000);
                        setTimeout(() => {
                            contador.style.display = "none"
                        }, 5000);  

                        leitecon.style.display = "none"
                        manteiga.style.display = "none"
                        chocolate.style.display = "none"
                        panela.style.display = "none"
                        panelaArea.style.display = "none"
                        panelaFundo.style.display = "none"
                        espatula.style.display = "none"
                        brigadeiromistura.style.display = "none"

                        brigadeiroMinigame = false;
                        brigadeiroCaindoATM = true;
                        brigadeiro.style.display = "none";

                        objetos.forEach(o => o.remove());
                        brigadeirosCaindo.forEach(b => b.remove());

                    }, 75);
                }
            }
        });

        panelaFundo.appendChild(element);
    }
}

// ===================================
// 🎮 MINIGAMES
// ===================================

// Variáveis do minigame do brigadeiro
let brigadeiroMinigame = false; // Alterado para false inicialmente
const brigadeiro = document.getElementById('brigadeiro');
let objetos = [];
let concluido = 0;
let brigadeirosUsados = 0;
let brigadeiroCaindoATM = true;
let minigameBrigadeiroAtivo = false;

let score = 0;
let brigadeiroScore = 0;
let granuladoScore = 0;

// barra
const granBarContainer = document.getElementById("granBarContainer");
const granBar = document.getElementById("granBar");

function atualizarBarra() {
    granBar.style.width = (granulosColetados / 1000 * 100) + "%";
}

const scoreBrigEl = document.getElementById('scoreBrigadeiro');
const scoreGranEl = document.getElementById('scoreGranulado');

/* ========== MINIGAME DO BRIGADEIRO ========== */

function iniciarBrigadeiroMinigame() {
    brigadeiro.style.display = "inline";
    brigadeiro.style.zIndex = "2";
    brigadeiroMinigame = true;
}

/* ========== MOVIMENTO DO BRIGADEIRO ========== */

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    if (brigadeiroMinigame) {
        brigadeiro.style.left = (mouseX - brigadeiro.width * 0.4) + "px";
    }
});

/* ========== CRIA AS 7 FORMAS ========== */
let forminhasCriadas= false;
function criarForminhas() {
    if (forminhasCriadas) return;
    forminhasCriadas = true;
    for (let i = 0; i < 7; i++) {
        let o = document.createElement("img");
        o.classList.add("obj");
        o.src = "img-ingrediente/Forminha.png";
        o.id = "obj" + i;
        o.style.top = "370px";
        o.style.left = (-200 * i) + "px";
        o.dataset.done = "0";
        o.style.zIndex = "3";
        o.style.display = "inline";
        objetos.push(o);
        kitchen.appendChild(o);
    }
}

/* ========== MOVIMENTO DAS FORMAS ========== */

function moverForma() {
    if (!minigameBrigadeiroAtivo) return;
    objetos.forEach(obj => {
        let x = parseFloat(obj.style.left);
        x += 4;
        if (x > window.innerWidth) x = -120;
        obj.style.left = x + "px";
    });
    requestAnimationFrame(moverForma);
}

/* ========== BRIGADEIROS CAINDO ========== */

let brigadeirosCaindo = [];

function moverBrigadeiros() {
    brigadeirosCaindo.forEach((brig, index) => {
        let y = parseFloat(brig.style.top);
        y += 9;

        if (y > window.innerHeight) {
            brig.remove();
            brigadeirosCaindo.splice(index, 1);
            return;
        }
        brig.style.top = y + "px";
        brig.style.zIndex = "2";
    });
    requestAnimationFrame(moverBrigadeiros);
}

/* ========== CLICK → SOLTAR BRIGADEIRO ========== */

document.addEventListener("click", (event) => {
    if (brigadeiroCaindoATM === false) {
        brigadeiroCaindoATM = true;
        mouseX = event.clientX;

        let brigadeiroCaindo = document.createElement("img");
        brigadeiroCaindo.classList.add("brig");
        brigadeiroCaindo.src = "img-ingrediente/Brigadeiro-granulado.png";
        brigadeiroCaindo.style.position = "absolute";
        brigadeiroCaindo.style.height = "20%";

        brigadeirosUsados++;

        brigadeiroCaindo.style.left = (mouseX - 60) + "px";
        brigadeiroCaindo.style.top = "-70px";

        kitchen.appendChild(brigadeiroCaindo);
        brigadeirosCaindo.push(brigadeiroCaindo);

        brigadeiro.style.display = "none";

        setTimeout(() => {
            let acertouForma = false;
            let distanciaTotal = 0;

            objetos.forEach(obj => {
                if (obj.dataset.done === "1") return;

                let centroBrig = mouseX;
                let centroForma = obj.getBoundingClientRect().left + obj.offsetWidth / 2;

                let distancia = Math.abs(centroBrig - centroForma);

                if (distancia < obj.offsetWidth * 0.45) {
                    acertouForma = true;
                    obj.dataset.done = "1";
                    concluido++;
                    distanciaTotal = distancia;

                    // ✅ Brigadeiro segue a posição da forminha
                    function seguirForminha() {
                        if (!brigadeiroCaindo) return;
                        const rect = obj.getBoundingClientRect();
                        brigadeiroCaindo.style.left = (rect.left + rect.width / 2 - brigadeiroCaindo.offsetWidth / 2) + 75 + "px";
                        brigadeiroCaindo.style.top = (rect.top - brigadeiroCaindo.offsetHeight / 2) + 60 + "px";
                        requestAnimationFrame(seguirForminha);
                    }

                    seguirForminha();

                    // remove da lista de brigadeiros que caem
                    const index = brigadeirosCaindo.indexOf(brigadeiroCaindo);
                    if (index > -1) brigadeirosCaindo.splice(index, 1);
                }
            });

            brigadeiro.style.display = "inline";
            brigadeiroCaindoATM = false;

            if (acertouForma) {
                score += (distanciaTotal ** 0.9) * 10;
                brigadeiroScore += (distanciaTotal ** 0.9) * 10;
            } else {
                score -= distanciaTotal * 20;
                brigadeiroScore -= distanciaTotal * 20;
            }

            if (concluido === 7) {
                alert("🎉 Parabéns! Demonstração concluída 🎉\n\nPontuação Final:\n• Mistura: " + Math.floor(pontosmistura) + 
                "\n• Brigadeiro: " + Math.round(brigadeiroScore) + 
                "\n• Granulado: " + Math.round(granuladoScore) + 
                "\n\nReiniciando jogo...");
                location.reload();
                brigadeiro.style.display = "none";
                brigadeiroMinigame = false;

                brigadeiroCaindoATM = true;
                minigameBrigadeiroAtivo = false;

                visivel();
            }


        }, 800);
    }
});

/* ================== MINIGAME DO GRANULADO ================== */

let pacote = document.getElementById("pacote");
let tigela = document.getElementById("tigela");

let granulos = [];
let granulosColetados = 0;

let pacoteX = 300;
let pacoteVel = 3;
let pacoteDir = 1;

let granuladoAtivo = false;
let pacoteInterval;

function iniciarGranulado() {
    granuladoAtivo = true;
    pacote.style.display = "block";
    tigela.style.display = "block";
    granBarContainer.style.display = "block";

    moverPacote();
    criarGranulos();
}

/* ========== MOVIMENTO DO PACOTE ========== */
function moverPacote() {
    pacoteInterval = setInterval(() => {
        if (!granuladoAtivo) {
            clearInterval(pacoteInterval);
            return;
        }
        let mult = 0.2 + Math.random() * 3.8;
        pacoteVel = 3 * mult;
    }, 2000);

    function anima() {
        if (!granuladoAtivo) return;

        pacoteX += pacoteVel * pacoteDir;
        if (pacoteX < 0) pacoteDir = 1;
        if (pacoteX > window.innerWidth - 160) pacoteDir = -1;

        pacote.style.left = pacoteX - 50 + "px";
        requestAnimationFrame(anima);
    }

    anima();
}

/* ========== CRIAÇÃO DE GRANULADOS ================== */
function criarGranulos() {
    function gerar() {
        if (!granuladoAtivo) return;

        let g = document.createElement("div");
        g.classList.add("gran");

        let px = pacoteX + 70 + Math.random() * 20 - 10;
        g.style.left = px + "px";
        g.style.top = "80px";
        g.style.transform = "rotate(" + Math.ceil(Math.random() * 360) + "deg)";
        g.dataset.vy = 3 + Math.random() * 2;
        g.dataset.canCheck = "1";
        g.style.zIndex = "999";

        kitchen.appendChild(g);
        granulos.push(g);

        cair(g);
    }

    const interval = setInterval(() => {
        if (!granuladoAtivo) {
            clearInterval(interval);
            return;
        }
        gerar();
    }, 25);
}

/* ========== QUEDA + COLISÃO ================== */
function cair(g) {
    let isActive = true;

    function anima() {
        if (!granuladoAtivo || !g || !isActive) return;

        let y = parseFloat(g.style.top);
        y += parseFloat(g.dataset.vy);
        g.style.top = y + "px";

        // Obtém as posições dos elementos
        const gRect = g.getBoundingClientRect();
        const tRect = tigela.getBoundingClientRect();

        // Verifica colisão entre o granulado e a tigela
        if (
            gRect.right > tRect.left &&
            gRect.left < tRect.right &&
            gRect.bottom > tRect.top &&
            gRect.top < tRect.bottom
        ) {
            granulosColetados++;
            granuladoScore += 3;
            atualizarBarra();
            g.remove();
            isActive = false;
            
            if (granulosColetados >= 1000) finalizarGranulado();
            return;
        }

        // granulado chegou ao chão ou saiu da tela → penalidade
        if (y > window.innerHeight) {
            granuladoScore -= 2;
            g.remove();
            isActive = false;
            return;
        }

        requestAnimationFrame(anima);
    }

    anima();
}

/* ========== FINALIZAÇÃO ================== */
function finalizarGranulado() {
    granuladoAtivo = false;

    granulos.forEach(g => g.remove());
    granulos = [];

    tigela.style.display = "none";
    pacote.style.display = "none";

    setTimeout(() => {
        brigadeiro.style.display = "inline";
        brigadeiroMinigame = true;
        brigadeiroCaindoATM = false;
        minigameBrigadeiroAtivo = true;

        iniciarBrigadeiroMinigame();
        criarForminhas();
        moverForma();
    }, 75);
}

/* ========== TIGELA SEGUE O MOUSE ================== */
document.addEventListener("mousemove", (ev) => {
    if (!granuladoAtivo) return;
    tigela.style.left = (ev.clientX - 200) + "px";
});

/* ========== CHECK SECUNDÁRIO ========== */
function checkGranulo(hora) {
    if (hora !== ultimoMovimentoHora) return;

    granulos.forEach((g, i) => {
        if (!g || g.dataset.canCheck === "0") return;

        let gx = g.getBoundingClientRect().left;
        let tx = tigela.getBoundingClientRect().left;

        let dist = Math.abs(gx - tx);

        if (dist < 100) {
            score += 3;
            granuladoScore += 3;
            granulosColetados++;

            atualizarBarra();

            if (granulosColetados >= 1000) finalizarGranulado();

            g.remove();
            granulos[i] = null;

        } else {
            score -= 1;
            granuladoScore -= 1;
        }

        g.dataset.canCheck = "0";
    });

    granulos = granulos.filter(g => g !== null);
}

// ===================================
// 🚀 INICIALIZAÇÃO DO JOGO
// ===================================

window.addEventListener("load", () => {
    console.log("🚀 Jogo Iniciando...");

    // Configura Modais
    setupModal("btnAbrirConfig", "config");
    setupModal("btnAbrirLoja", "loja");
    setupModal("btnAbrirReceitas", "receitas");
    setupModal("btnAbrirPerfil", "perfil");
    setupModal("btnAbrirTutorial", "tutorial");

    // Configura os cliques nas mesas
    if (mesa1 && mesa2 && mesa3) {
        mesa1.onclick = () => tentarSentarCliente(mesa1, "75px", "5", mesa1e, "185px", "-6px", "4");
        mesa2.onclick = () => tentarSentarCliente(mesa2, "95px", "10", mesa2e, "240px", "-6px", "9");
        mesa3.onclick = () => tentarSentarCliente(mesa3, "95px", "10", mesa3e, "240px", "-6px", "9");
        console.log("✅ Mesas Configuradas.");
    } else {
        console.error("❌ Erro: Mesas não encontradas no HTML.");
    }

    // Event listeners para elementos da cozinha
    espatula.addEventListener('click', (event) => {
        if (espatulaSelecionado === false) {
            espatulaSelecionado = true
            segurandoObjeto = true
        } else {
            espatulaSelecionado = false
            segurandoObjeto = false
        }
    });

    manteiga.addEventListener('click', (event) => {
        if (manteigaSelecionado === false && manteigaAdicionado === false) {
            manteigaSelecionado = true
            segurandoObjeto = true
        } else {
            manteigaSelecionado = false
            segurandoObjeto = false
            manteigaColher.style.display = "none"
        }
    });

    manteigaColher.addEventListener('click', (event) => {
        if (manteigaSelecionado === false) {
            manteigaSelecionado = true
            segurandoObjeto = true
        } else {
            manteigaSelecionado = false
            segurandoObjeto = false
        }
    });

    chocolate.addEventListener('click', (event) => {
        if (chocolateSelecionado === false && chocolateAdicionado === false) {
            chocolateSelecionado = true
            segurandoObjeto = true
        } else {
            chocolateSelecionado = false
            segurandoObjeto = false
            chocolateColher.style.display = "none"
        }
    });

    chocolateColher.addEventListener('click', (event) => {
        if (chocolateSelecionado === false) {
            chocolateSelecionado = true
            segurandoObjeto = true
        } else {
            chocolateSelecionado = false
            segurandoObjeto = false
        }
    });
    
    leitecon.addEventListener('click', (event) => {
        if (leiteconSelecionado === false && leiteconAdicionado === false) {
            leiteconSelecionado = true
            segurandoObjeto = true
        } else {
            leiteconSelecionado = false
            segurandoObjeto = false
        }
    });

    panelaArea.addEventListener('click', (event) => {
        segurandoObjeto = false

        if (manteigaSelecionado === true) {
            ingredienteBrigadeiro += 1
            manteigaSelecionado = false
            manteigaAdicionado = true
            manteigapanela.style.display = "inline"
            manteigaColher.style.display = "none"
        }

        if (chocolateSelecionado === true) {
            ingredienteBrigadeiro += 1
            chocolateSelecionado = false
            chocolateAdicionado = true
            chocolatepanela.style.display = "inline"
            chocolateColher.style.display = "none"
        }

        if (leiteconSelecionado === true) {
            ingredienteBrigadeiro += 1
            leiteconSelecionado = false
            leiteconAdicionado = true
            leiteconpanela.style.display = "inline"
            leitecon.style.display = "none"
        }

        if (ingredienteBrigadeiro === 3) {
            panelaArea.style.display = "none"
            brigadeiromistura.style.display = "inline"
            console.log("todos ingredientes adicionados")
            espatulaSelecionado = true
        }
    });

    // Mouse movement tracking
    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (segurandoObjeto === true && cursorhold && misturaConcluida === false) {
            cursorhold.style.display = "inline";
            if (cursor) cursor.style.display = "none";
            
            if (cursorhold.offsetHeight && cursorhold.offsetWidth) {
                cursorhold.style.top = (mouseY - cursorhold.offsetHeight * 0.3) + "px";
                cursorhold.style.left = (mouseX - cursorhold.offsetWidth * 0.3) + "px";
            }
        } else if (cursor && misturaConcluida === false) {
            cursor.style.display = "inline";
            if (cursorhold) cursorhold.style.display = "none";
            
            if (cursor.offsetHeight && cursor.offsetWidth) {
                cursor.style.top = (mouseY - cursor.offsetHeight * 0.3) + "px";
                cursor.style.left = (mouseX - cursor.offsetWidth * 0.3) + "px";
            }
        }

        if (manteigaSelecionado === true && manteigaColher) {
            manteigaColher.style.display = "inline"
            if (manteigaColher.offsetHeight && manteigaColher.offsetWidth) {
                manteigaColher.style.top = (mouseY - manteigaColher.offsetHeight) + 80 +"px";
                manteigaColher.style.left = (mouseX - manteigaColher.offsetWidth) - 40 + "px";
            }
        } else if (chocolateSelecionado === true && chocolateColher) {
            chocolateColher.style.display = "inline"
            if (chocolateColher.offsetHeight && chocolateColher.offsetWidth) {
                chocolateColher.style.top = (mouseY - chocolateColher.offsetHeight) + 80 + "px";
                chocolateColher.style.left = (mouseX - chocolateColher.offsetWidth) - 40 + "px";
            }
        } else if (leiteconSelecionado === true && leitecon) {
            if (leitecon.offsetHeight && leitecon.offsetWidth) {
                leitecon.style.top = (mouseY - leitecon.offsetHeight) + 50 + "px";
                leitecon.style.left = (mouseX - leitecon.offsetWidth) + "px";
            }
        } else if (espatulaSelecionado === true && espatula) {
            if (espatula.offsetHeight && espatula.offsetWidth) {
                espatula.style.top = (mouseY - espatula.offsetHeight) + 80 + "px";
                espatula.style.left = (mouseX - espatula.offsetWidth) - 85 + "px";
            }
        }
    });

    // Inicia loops
    requestAnimationFrame(update); // Movimento Jeca
    misturar(); // Inicia o sistema de mistura
    clientes3(); // Gera clientes
    moverBrigadeiros(); // Inicia movimento de brigadeiros
});
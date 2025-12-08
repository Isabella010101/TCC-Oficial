<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Evita erro se o usuário não estiver logado
$nomeUsuario = isset($_SESSION['nome']) ? $_SESSION['nome'] : 'Visitante';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/jeca-logo.png">
    <title>Jeca Maracatu</title>
</head>
<body>
    <!-- Sistema de Login/Cadastro (se necessário) -->
    <div id="modal-login-cadastro" class="modal" style="display: none;">
        <div class="modal-content-login">
            <span class="fechar" id="fechar-login">&times;</span>
            
            <div id="auth-message-area"></div>
            
            <form id="form-login" class="cadastro" method="POST" action="processar_login.php"> 
                <div>Bem-vindo de volta</div>
                <div class="placeholder">
                    <input type="email" name="email" class="form-control" placeholder="E-mail" required autocomplete="off">
                    <input type="password" name="senha" class="form-control" placeholder="Senha" required autocomplete="off">
                </div>
                <button type="submit">Login</button>
                <p class="link-criar-conta">
                    Ainda não tem uma conta?
                    <a href="#" id="link-abrir-cadastro">Crie agora</a>
                </p>
            </form>

            <form id="form-cadastro" class="cadastro" method="POST" action="processar_cadastro.php" style="display: none;">
                <div>Crie sua conta</div>
                <div class="placeholder">
                    <input type="text" name="nome" class="form-control" placeholder="Nome" required autocomplete="off">
                    <input type="email" name="email" class="form-control" placeholder="E-mail" required autocomplete="off">
                    <input type="password" name="senha" class="form-control" placeholder="Senha (mín. 6 caracteres)" required autocomplete="off">
                    <input type="password" name="confirmar_senha" class="form-control" placeholder="Confirmar Senha" required autocomplete="off"> 
                </div>
                <button type="submit">Sign up</button>
                <p class="link-criar-conta">
                    Já tem uma conta?
                    <a href="#" id="link-abrir-login">Faça o Login</a>
                </p>
            </form>
        </div>
    </div>

    <!-- Header do Jogo -->
    <div id="game">
        <header>
            <div class="log">
                <img src="img/icon.png" alt="Logo Jeca"> 
            </div>
            <nav>
                <button id="btnAbrirTutorial" class="tutorial">
                    <img src="img/tutorial.png" alt="Tutorial">
                </button>
                <button id="btnAbrirConfig"><img src="img/iconeEng2.png" alt="Configurações"></button>
                <button id="btnAbrirReceitas"><img src="img/iconeRec.png" alt="Receitas"></button>
                <button id="btnAbrirPerfil"><img src="img/iconeJeca.png" alt="Perfil"></button>
            </nav>

            <div class="dinheiro-display">
                <span><img src="img/saco.png" alt="Dinheiro"></span>
                <span class="ponto">:</span>
                <span id="dinheiro-quantidade">25</span>
            </div>
        </header>
    </div>

    <!-- Área Principal do Jogo -->
    <main>
        <container id="container">
            <!-- Mesas do Restaurante -->
            <div class="mesa-guardar" id="mesa1-guardar">
                <img id="mesa1" src="img-cenario/Mesas1.png">
            </div>
            <div class="mesa-guardar" id="mesa2-guardar">
                <img id="mesa2" src="img-cenario/Mesas1.png">
            </div>
            <div class="mesa-guardar" id="mesa3-guardar">
                <img id="mesa3" src="img-cenario/Mesas1.png">
            </div>

            <!-- Cenário -->
            <div id="parede"></div>
            <div id="parede2"></div>
            <div id="chao"></div>
            <img id="janela" src="img-cenario/Janela.gif">
        </container>

        <!-- Cozinha -->
        <div id="cozinha">
            <div id="score-display">Misture</div>
            
            <!-- Barra de progresso -->
            <div id="barravazia">
                <div id="barracheia"></div>
            </div>
            
            <!-- Barra de granulado -->
            <div id="granBarContainer">
                <div id="granBar"></div>
            </div>

            <!-- Utensílios e ingredientes -->
            <img id="espatula" src="img-cozinha/Espatula.png" draggable="true">
            
            <img id="leitecon" src="img-ingrediente/Leite condensado.png" draggable="true">
            <img id="chocolate" src="img-ingrediente/Achocolatado.png" draggable="true">
            <img id="chocolateColher" src="img-ingrediente/Achocolatado-colher.png" draggable="true">
            <img id="manteiga" src="img-ingrediente/Manteiga.png" draggable="true">
            <img id="manteigaColher" src="img-ingrediente/Manteiga-colher.png" draggable="true">
            
            <!-- Ingredientes na panela (visuais) -->
            <img id="manteigapanela" src="img-ingrediente/Manteiga na panela.png">
            <img id="chocolatepanela" src="img-ingrediente/Chocolate em pó na panela.png">
            <img id="leiteconpanela" src="img-ingrediente/Leite condensado visto de cima.png">
            <img id="brigadeiromistura" src="img-ingrediente/Brigadeiro-mistura.png">
            
            <!-- Panela e área interativa -->
            <img id="panela" src="img-cozinha/Panela vista de cima.png">
            <div id="panela-fundo"></div>
            <div id="panela-area"></div>
            
            <!-- Feedback visual -->
            <img id="good" src="img/bom.png">
            <img id="great" src="img/otimo.png">
            <img id="awesome" src="img/perfeito.png">
            
            <!-- Brigadeiro final -->
            <img id="brigadeiro" src="img-ingrediente/Brigadeiro-granulado.png">
            <img id="pacote" src="img-ingrediente/Pacote-granulado.png">
            <img id="tigela" src="img-cozinha/Tigela.png">
            
            <!-- HUD de pontuação -->
            <div id="hud">
                <div id="scoreBrigadeiro">Pontuação brigadeiro: 0</div>
                <div id="scoreGranulado">Pontuação granulado: 0</div>
            </div>
            
            <!-- Fundo da cozinha -->
            <img src="img-cenario/cozinha.png" alt="fundo cozinha" class="fundo">
        </div>

        <!-- Área do Jogador -->
        <div id="game-area">
            <img src="img/Jeca-paradoR.gif" id="player" class="player" alt="Player Jeca">
            <img src="img-cenario/fundo.png" alt="fundo principal" class="fundo">
        </div>
        
        <!-- Cursor personalizado -->
        <img id="cursor" src="img/Cursor.png">
        <img id="cursor-segurando" src="img/Cursor segurando.png">
    </main>

    <!-- Modal de Receitas -->
    <div id="receitas" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <div class="carousel-container">
                <div class="carousel-track">
                    <div class="carousel-slide">
                        <h3>Brigadeiro</h3>
                        <img src="img-comida/brigadeiro.png" alt="Brigadeiro" class="img-receita"> 
                        <p>Tradicional doce brasileiro criado na década de 1940 no Rio de janeiro...</p>
                    </div>
                    <div class="carousel-slide">
                        <h3>Pudim</h3>
                        <img src="img-comida/pudim.png" alt="Pudim" class="img-receita">
                        <p>O pudim surgiu na Idade Média na Europa...</p>
                    </div>
                    <div class="carousel-slide">
                        <h3>Coxinha</h3>
                        <img src="img-comida/Coxinhapng.png" alt="Coxinha" class="img-receita">
                        <p>A coxinha surgiu no século XIX em São Paulo...</p>
                    </div>
                </div>
                <button id="prevBtn" class="carousel-btn prev">❮</button>
                <button id="nextBtn" class="carousel-btn next">❯</button>
            </div>
        </div>
    </div>

    <!-- Cutscene Inicial -->
    <div id="modal-cutscene" class="modal" style="display: none;">
        <div class="modal-content-cutscene">
            <div class="cutscene-carousel">
                <div class="cutscene-track">
                    <!-- 16 slides da cutscene -->
                    <?php for($i = 1; $i <= 16; $i++): ?>
                    <div class="cutscene-slide">
                        <img src="img-cutscene/<?php echo $i; ?>.jpeg" alt="Cena <?php echo $i; ?>" class="img-cutscene">
                    </div>
                    <?php endfor; ?>
                </div>
                <button id="cutPrevBtn" class="carousel-btn prev">❮</button>
                <button id="cutNextBtn" class="carousel-btn next">❯</button>
            </div>
            <button id="btn-start-game" class="btn-jogar-final">COMEÇAR O JOGO ▶</button>
        </div>
    </div>

    <!-- Modal de Perfil -->
    <div id="perfil" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <h2><img src="img/iconeJeca.png" alt="Jeca"> Perfil</h2>
            <p>Bem Vindo, <strong class="nomedousuario"><?php echo htmlspecialchars($nomeUsuario); ?></strong>!</p>
            <p>
                <button class="btn" onclick="window.location.replace('logout.php')">Sair</button>
            </p>
        </div>
    </div>

    <!-- Modal de Configurações -->
    <div id="config" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <h2>⚙️ Configurações</h2>
            <div class="config-opcoes">
                <button id="btnSomMusica">
                    <img src="img/musica.png" alt="Música">
                </button>
                <button id="btnSomEfeitos">
                    <img src="img/som.png" alt="Efeitos Sonoros">
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de Tutorial -->
    <div id="tutorial" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <img src="img-cenario/tut.jpeg" alt="Tutorial do Jogo">
        </div>
    </div>

    <!-- Modal de Início -->
    <div id="modal-inicio" class="modal">
        <div class="modal-contentinicio">
            <button id="btn-Jogar"><img src="img/botão.webp" alt="Jogar"></button>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        // Status do login para o JavaScript
        const usuarioEstaLogado = <?php echo isset($_SESSION['id']) ? 'true' : 'false'; ?>;
        console.log("Status do Login:", usuarioEstaLogado);
        
        // Se não estiver logado, mostrar modal de login
        if (!usuarioEstaLogado) {
            document.getElementById('modal-login-cadastro').style.display = 'block';
        } else {
            // Se estiver logado, mostrar modal de início
            document.getElementById('modal-inicio').style.display = 'block';
        }
    </script>
    
    <script src="script-copy.js"></script>
</body>
</html>
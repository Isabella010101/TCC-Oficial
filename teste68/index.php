<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Evita erro se o usuário não estiver logado
$nomeUsuario = isset($_SESSION['nome']) ? $_SESSION['nome'] : 'Visitante';
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeca Maracatu</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/jeca-logo.png">
</head>
<body>

    <div id="game">
        <header>
            <div class="log">
                <img src="img/icon.png" alt="Logo">
            </div>
            <nav>
                <button id="btnAbrirConfig"><img src="img/iconeEng2.png" alt="Configurações" class="config"></button>
                <button id="btnAbrirReceitas"><img src="img/iconeRec.png" alt="Receitas"></button>
                <button id="btnAbrirPerfil"><img src="img/iconeJeca.png" alt="Perfil"></button>
            </nav>

            <button id="btnAbrirTutorial" class="tutorial">
                <img src="img/tutorial.png" alt="Tutorial">
            </button>
        </header>
    </div>

    <div id="cozinha">
        <div id="score-display" style="position: absolute; z-index: 9999999999999999;">Misture</div>
        
        <img id="espatula" src="img-cozinha/Espatula.png">

        <img id="leitecon" src="img-ingrediente/Leite condensado.png" draggable="true">
        <img id="chocolate" src="img-ingrediente/Achocolatado.png" draggable="true">
        <img id="chocolateColher" src="img-ingrediente/Achocolatado-colher.png" draggable="true">
        <img id="manteiga" src="img-ingrediente/Manteiga.png" draggable="true">
        <img id="manteigaColher" src="img-ingrediente/Manteiga-colher.png" draggable="true">

        <img id="manteigapanela" src="img-ingrediente/Manteiga na panela.png">
        <img id="chocolatepanela" src="img-ingrediente/Chocolate em pó na panela.png">
        <img id="leiteconpanela" src="img-ingrediente/Leite condensado visto de cima.png">
        <img id="brigadeiromistura" src="img-ingrediente/Brigadeiro-mistura.png">
        
        <img id="panela" src="img-cozinha/Panela vista de cima.png">
        <div id="panela-fundo"></div>
        <div id="panela-area"></div>

        <img id="good" src="img/bom.png">
        <img id="great" src="img/otimo.png">
        <img id="awesome" src="img/perfeito.png">
        
        <img src="img-cenario/cozinha.png" style="z-index: -999" alt="fundo" class="fundo">

        <img id="brigadeiro" style="position: absolute; display: none; height: 20%; top: -70px;" src="img-ingrediente/Brigadeiro-granulado.png">
        <img id="pacote" src="img-ingrediente/Pacote-granulado.png" style="display:none;">
        <img id="tigela" src="img-cozinha/Tigela.png" style="display:none;">

        <div id="granBarContainer">
            <div id="granBar"></div>
        </div>

        <div id="hud">
            <div id="scoreBrigadeiro">Pontuação brigadeiro: 0</div>
            <div id="scoreGranulado">Pontuação granulado: 0</div>
        </div>
    </div>

    <main>
        <img id="cursor" src="img/Cursor.png">
        <img id="cursor-segurando" src="img/Cursor segurando.png">

        <container id="container">
            <div class="mesa-guardar" id="mesa1-guardar">
                <img id="mesa1" src="img-cenario/Mesas1.png">
            </div>

            <div class="mesa-guardar" id="mesa2-guardar">
                <img id="mesa2" src="img-cenario/Mesas1.png">
            </div>

            <div class="mesa-guardar" id="mesa3-guardar">
                <img id="mesa3" src="img-cenario/Mesas1.png">
            </div>

            <div id="parede"></div>
            <div id="parede2"></div>
            <div id="chao"></div>

            <img id="janela" src="img-cenario/Janela.gif">
        </container>

        <div id="game-area">
            <img src="img/Jeca-paradoR.gif" id="player" class="player" alt="Player">
            <img src="img-cenario/fundo.png" alt="fundo" class="fundo">

            
        </div>
    </main>

    <div id="receitas" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <h2>📒 Algumas curiosidades sobre cada comida</h2>
            <p>Este é o conteúdo do seu modal.</p>
        </div>
    </div>

    <div id="perfil" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <h2><img src="img/iconeJeca.png" alt="Jeca" style="width: 30px; margin-top: 10px;"> Perfil</h2>
            <p> </p>
            Bem Vindo, <strong class="nomedousuario"><?php echo $_SESSION['nome']; ?></strong>!
            <p> </p>
            <p>
                <button class="btn" onclick="window.location.replace('logout.php')">Sair</button>
            </p>
        </div>
    </div>

    <div id="config" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <h2>⚙️ Configurações</h2>
            <div class="config-opcoes">
                <button id="btnSom">
                    <img src="img/musica.png">
                </button>
                <button id="btnSom">
                    <img src="img/som.png">
                </button>
            </div>
        </div>
    </div>

    <div id="tutorial" class="modal">
        <div class="modal-content">
            <span class="fechar">&times;</span>
            <img src="img-cenario/tut.jpeg">
        </div>
    </div>

    <script src="script.js"></script>

</body>
</html>
<?php
// include ("protect.php");

// //Se não está logado, vai para o login
// if (!isset($_SESSION['usuario'])) { 
//     header('Location: index.php'); 
//     exit(); 
// }

?>

    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <link rel="icon" href="img/jeca-logo.png">
    </head>
    <body>
        <div id="game">
            <header>
                <div class="log">
                    <img src="img/icon.png" alt=""> 
                    
                </div>
                <nav>
                    <!-- <button id="btnAbrirConfig"><img src="img/iconeEng2.png" alt="" class="config"></button> -->
                    <!-- <button id="btnAbrirLoja"><img src="img/iconeCar.png" alt=""></button> -->
                    <button id="btnAbrirReceitas"><img src="img/iconeRec.png" alt=""></button>
                    <button id="btnAbrirPerfil"><img src="img/iconeJeca.png" alt=""></button>
                </nav>

                <button id="btnAbrirTutorial" class="tutorial">
                    <img src="img/tutorial.png" alt="">
                </button>
            </header>
        </div>


        <div id="cozinha">
            <!-- <div id="barravazia"><div id="barracheia"></div></div> -->



            <img id="espatula" src="img-cozinha/Espatula.png">

            <!-- Ingredientes do brigadeiro -->
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

            <!-- *** INÍCIO: conteúdo do BODY do index-mistura-p23.html inserido aqui (SEM ALTERAÇÕES) *** -->
                <img id="brigadeiro" style="position: absolute; display: none; height: 20%; top: -70px;" 
                     src="img-ingrediente/Brigadeiro-granulado.png">

                <img id="pacote" src="img-ingrediente/Pacote-granulado.png" style="display:none;">
                <img id="tigela" src="img-cozinha/Tigela.png"style="display:none;">

            <!-- Barra de progresso -->
            <div id="granBarContainer">
                <div id="granBar"></div>
            </div>

            <div id="hud">
            </div>
            <!-- *** FIM: conteúdo do BODY do index-mistura-p23.html *** -->

        </div>

        <main>

          <img id="cursor" src="img/Cursor.png">
          <img id="cursor-segurando" src="img/Cursor segurando.png">


            <container id="container">
              <!-- colisão -->
              <div class="mesa-guardar" id="mesa1-guardar">
                  <img id="mesa1" src="img-cenario/Mesas1.png">
                  <!-- <div id="mesa1-cliente"></div> -->
              </div>

              <div class="mesa-guardar" id="mesa2-guardar">
                  <img id="mesa2" src="img-cenario/Mesas1.png">
                  <!-- <div id="mesa2-cliente"></div> -->
              </div>

              <div class="mesa-guardar" id="mesa3-guardar">
                  <img id="mesa3" src="img-cenario/Mesas1.png">
                  <!-- <div id="mesa3-cliente"></div> -->
              </div>

              <!-- <img id="QUADRADO" draggable="true"> -->
              <!-- <div id="parede"></div> -->
              <!-- <div id="parede2"></div> -->
              <div id="chao"></div>


              <img id="janela" src="img-cenario/Janela.gif">

            </container>


            <!-- game area -->
            <div id="game-area">

                <img src="img/Jeca-paradoR.gif" id="player" class="player" alt="Player">

                <img src="img-cenario/fundo.png" alt="fundo" class="fundo">
            </div>
                
        </main>

      <!-- Modal Receitas -->
  <div id="receitas" class="modal">
    <div class="modal-content">
      <span class="fechar">&times;</span>
      <h2>📒 Algumas curiosidades sobre cada comida</h2>
      <p>Este é o conteúdo do seu modal.</p>
    </div>
  </div>

  <!-- Modal Loja
  <div id="loja" class="modal">
    <div class="modal-content">
      <span class="fechar">&times;</span>
      <h2>🛒 Loja de Power-ups</h2>

      <div id="powerupsLoja">
        <div class="powerup" id="powerup-velocidade">
          <h4>Pés Rápidos</h4>
          <p>Velocidade +10</p>
          <p>Custo: <span class="preco">10</span> 💰</p>
          <button id="btnAumentarVelocidade">Comprar</button>
        </div>

        <div class="powerup" id="powerup-vida">
          <h4>Bom Cozinheiro</h4>
          <p>+5 de paciência</p>
          <p>Custo: <span class="preco">15</span> 💰</p>
          <button id="btnAumentarVida">Comprar</button>
        </div>

        <div class="powerup" id="powerup-dano">
          <h4>Tempero Especial</h4>
          <p>+5% de bônus</p>
          <p>Custo: <span class="preco">20</span> 💰</p>
          <button id="btnAumentarDano">Comprar</button>
        </div>
      </div>
    </div>
  </div> -->

  <!-- Modal Perfil -->
  <div id="perfil" class="modal">
    <div class="modal-content">
      <span class="fechar">&times;</span>
      <h2><img src="img/iconeJeca.png" alt="Jeca" style="width: 30px; margin-top: 10px;"> Perfil</h2>


      <p>   </p>

      Bem Vindo, <strong class="nomedousuario">Jeca Maracatu</strong>!
      
      <p> </p>

    </div>
  </div>

  <!-- Modal Configurações -->
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
        <!-- <button id="btnLinguagem">🌐 Linguagem: Português</button> -->
        <!-- <button id="btnJacquin">👨‍🍳 Érick Jacquin</button> -->
      </div>
    </div>
  </div>

  <!-- Modal Tutorial -->
  <div id="tutorial" class="modal">
    <div class="modal-content">
      <span class="fechar">&times;</span>      
      <img src="img-cenario/tut.jpeg">
    </div>
  </div>

  

    <script src="script.js"></script>

    </body>
    </html>
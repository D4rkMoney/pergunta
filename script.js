const pergunta = document.getElementById("pergunta");
const nao = document.getElementById("nao");
const sim = document.getElementById("sim");

// -------------------------------
// 🔥 Animação para deixar o SIM chamativo
// -------------------------------
sim.style.animation = "pulse 1s infinite ease-in-out";

const estilo = document.createElement("style");
estilo.innerHTML = `
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 10px #00ff6a; }
  50% { transform: scale(1.15); box-shadow: 0 0 30px #00ff6a; }
  100% { transform: scale(1); box-shadow: 0 0 10px #00ff6a; }
}
`;
document.head.appendChild(estilo);


// -------------------------------
// 🎨 Trocar cor da pergunta
// -------------------------------
function mudarCor() {
  const cores = ["#ff2e2e", "#ffb800", "#00ffb2", "#00b7ff", "#ff00e6"];
  pergunta.style.color = cores[Math.floor(Math.random() * cores.length)];
}
setInterval(mudarCor, 300);


// -------------------------------
// 😂 Emoji caindo
// -------------------------------
function criarEmoji() {
  const emoji = document.createElement("div");
  emoji.textContent = "😂";

  emoji.style.position = "fixed";
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = "-60px";
  emoji.style.fontSize = "40px";
  emoji.style.pointerEvents = "none";
  emoji.style.transition = "transform 2s ease, top 2s ease, opacity 2s ease";

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.style.top = window.innerHeight + "px";
    emoji.style.transform = "rotate(360deg) scale(1.3)";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2200);
}


// -------------------------------
// -------------------------------
// 🏃 Botão NÃO fugindo — SOLUÇÃO DEFINITIVA MOBILE
// -------------------------------
let tentativas = 0;

function fugir() {
  tentativas++;

  // emojis
  for (let i = 0; i < tentativas; i++) criarEmoji();

  const w = nao.offsetWidth;
  const h = nao.offsetHeight;
  const margin = 20;

  const maxX = window.innerWidth - w - margin;
  const maxY = window.innerHeight - h - margin;

  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  nao.style.left = Math.max(margin, x) + "px";
  nao.style.top  = Math.max(margin, y) + "px";
}

// PC
nao.addEventListener("mouseover", fugir);

// 📱 MOBILE — O combo que faz funcionar SEM travar:
nao.addEventListener("touchstart", e => {
  e.preventDefault();      // impede highlight azul
  fugir();
});

nao.addEventListener("touchmove", e => {
  e.preventDefault();      // impede o dedo de focar o botão
  fugir();
});

nao.addEventListener("touchend", e => {
  e.preventDefault();      // impede clique fantasma
});



// -------------------------------
// ✔ Botão SIM
// -------------------------------
sim.addEventListener("click", () => {
  window.open("https://i.pinimg.com/736x/d1/ca/59/d1ca5901669de6a0b15e5562bab4378c.jpg", "_blank");
});


// -------------------------------
// 🔊 Música
// -------------------------------
const musica = document.getElementById("musica");
let musicaIniciada = false;

function iniciarMusica() {
  if (musicaIniciada) return;
  musicaIniciada = true;

  const tentarPlay = () => {
    musica.play().then(() => {
      // garantir loop mesmo se o "loop" do HTML falhar
      musica.addEventListener("ended", () => {
        musica.currentTime = 0;
        musica.play().catch(() => {});
      });
    })
    .catch(err => {
      console.log("Tentando novamente...", err);
      setTimeout(tentarPlay, 500);
    });
  };

  tentarPlay();
}


// desktop
window.addEventListener("click", iniciarMusica, { once: true });

// mobile (gesto válido)
window.addEventListener("touchstart", iniciarMusica, { once: true });

// botão NÃO
const btnNao = document.getElementById("nao");
if (btnNao) {
  btnNao.addEventListener("click", iniciarMusica);
  btnNao.addEventListener("mouseover", iniciarMusica);
  btnNao.addEventListener("touchstart", iniciarMusica);
}




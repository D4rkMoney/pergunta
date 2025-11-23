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
// 🎨 Trocar cor do texto da pergunta
// -------------------------------
function mudarCor() {
  const cores = ["#ff2e2e", "#ffb800", "#00ffb2", "#00b7ff", "#ff00e6"];
  pergunta.style.color = cores[Math.floor(Math.random() * cores.length)];
}
setInterval(mudarCor, 300);


// -------------------------------
// 😂 Criar emoji caindo
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

  // animação
  setTimeout(() => {
    emoji.style.top = window.innerHeight + "px";
    emoji.style.transform = "rotate(360deg) scale(1.3)";
    emoji.style.opacity = 0;
  }, 50);

  // remove depois
  setTimeout(() => emoji.remove(), 2200);
}


// -------------------------------
// 🏃 Botão NÃO fugindo (com limites certos)
// -------------------------------
let tentativas = 0;

nao.addEventListener("mouseover", () => {

  // aumenta o nível de caos
  tentativas++;

  // cria vários emojis por tentativa
  for (let i = 0; i < tentativas; i++) {
    criarEmoji();
  }

  const botaoLargura = nao.offsetWidth;
  const botaoAltura = nao.offsetHeight;

  const margem = 20;

  const maxX = window.innerWidth - botaoLargura - margem;
  const maxY = window.innerHeight - botaoAltura - margem;

  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  x = Math.max(margem, Math.min(x, maxX));
  y = Math.max(margem, Math.min(y, maxY));

  nao.style.left = x + "px";
  nao.style.top = y + "px";
});
 sim.addEventListener("click", () => {
  window.open("https://i.pinimg.com/736x/d1/ca/59/d1ca5901669de6a0b15e5562bab4378c.jpg", "_blank");
});

const musica = document.getElementById("musica");
let musicaIniciada = false;

function tocarMusica() {
  if (!musicaIniciada) {
    musicaIniciada = true;
    musica.play().catch(() => {});
  }
}

// QUANDO O USUÁRIO CLICAR EM QUALQUER LUGAR DA TELA
window.addEventListener("click", tocarMusica, { once: true });

// EXEMPLO: SE TENTAR CLICAR NO BOTÃO "NÃO"
const btnNao = document.getElementById("nao");
if (btnNao) {
  btnNao.addEventListener("mouseover", tocarMusica);
  btnNao.addEventListener("click", tocarMusica);
}

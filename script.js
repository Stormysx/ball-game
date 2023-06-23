var topDiv = document.getElementById("top");
var scoreDiv = document.getElementById("score");
var x = 0;
var y = 0;
var dx = 5;
var dy = 5;
var score = 0;
var isSlowMotion = false;
var slowMotionFactor = 0.2;

var kareler = [];
var beyazCember = document.createElement("div");
beyazCember.className = "beyaz-cember";
topDiv.appendChild(beyazCember);

function rastgeleKonum() {
  return {
    top: Math.floor(Math.random() * (window.innerHeight - 50)),
    left: Math.floor(Math.random() * (window.innerWidth - 50))
  };
}

function rastgeleSpawn() {
  var konum = rastgeleKonum();
  topDiv.style.top = konum.top + "px";
  topDiv.style.left = konum.left + "px";

  for (var i = 0; i < kareler.length; i++) {
    var kare = kareler[i];
    var konum = rastgeleKonum();
    kare.style.top = konum.top + "px";
    kare.style.left = konum.left + "px";
  }
}

function hareketEt() {
  if (!isSlowMotion) {
    x += dx;
    y += dy;
  } else {
    x += dx * slowMotionFactor;
    y += dy * slowMotionFactor;
  }

  topDiv.style.left = x + "px";
  topDiv.style.top = y + "px";

  if (x + topDiv.offsetWidth > window.innerWidth || x < 0) {
    dx = -dx;
  }

  if (y + topDiv.offsetHeight > window.innerHeight || y < 0) {
    dy = -dy;
  }

  for (var i = 0; i < kareler.length; i++) {
    var kare = kareler[i];
    if (carpismaKontrol(topDiv, kare)) {
      puanArtir();
      kare.remove();
      kareler.splice(i, 1);
    }
  }

  requestAnimationFrame(hareketEt);
}

function carpismaKontrol(element1, element2) {
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function puanArtir() {
  score++;
  scoreDiv.textContent = score;

  if (score % 10 === 0) {
    beyazCember.style.opacity = 1;

    // Seviye belirleme
    var level = Math.floor(score / 10);
    levelDiv.textContent = "Level: " + level;

    // GIF gösterme
    gifDiv.innerHTML = "<img src='path_to_gif.gif' alt='GIF'>";

    if (score % 20 === 0) {
      topDiv.classList.add("parilama");

      setTimeout(function() {
        beyazCember.style.opacity = 0;
        topDiv.classList.remove("parilama");
      }, 5000);
    }
  } else {
    beyazCember.style.opacity = 0;
  }

  // Topun hızını artır
  if (score < 10 || score % 10 !== 0) {
    dx *= 1.1;
    dy *= 1.1;
  }
}

function kareEkle() {
  var kare = document.createElement("div");
  kare.className = "kare";
  var konum = rastgeleKonum();
  kare.style.top = konum.top + "px";
  kare.style.left = konum.left + "px";
  document.body.appendChild(kare);
  kareler.push(kare);
}

function toggleSlowMotion() {
  isSlowMotion = !isSlowMotion;
  if (isSlowMotion) {
    topDiv.style.transition = "none";
  } else {
    topDiv.style.transition = "background-color 0.5s";
  }
}

function handleKeyPress(event) {
  var keyPressed = event.key.toLowerCase();
  if (keyPressed === "p") {
    toggleSlowMotion();
  } else if (keyPressed === "h" || keyPressed === "e" || keyPressed === "s" || keyPressed === "o" || keyPressed === "y" || keyPressed === "a" || keyPressed === "m") {
    puanArtir();
  }
}

document.addEventListener("keydown", handleKeyPress);

rastgeleSpawn();
hareketEt();
setInterval(kareEkle, 2000);

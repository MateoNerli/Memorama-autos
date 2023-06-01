let tarjetasDestapadas = 0;
let carta1 = null;
let carta2 = null;
let resultado1 = null;
let resultado2 = null;
let aciertos = 0;
let movimientos = 0;
let temporizador = 0;
let timer = 60;
let intervalId;
let juegoActivo = false;

let moviminetosEL = document.getElementById("movimientos");
let aciertosEl = document.getElementById("puntaje");
let timerEl = document.getElementById("tiempo-restante");

let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
number = number.sort(() => {
  return Math.random() - 0.5;
});

function contarTiempo() {
  const interval = setInterval(() => {
    timer--;
    timerEl.innerHTML = timer;

    if (timer === 0) {
      clearInterval(intervalId);

      Swal.fire({
        title: "PERDISTE!",
        width: 450,
        padding: "3em",
        color: "#716add",
        background: "#fff url(./imagenes/fondo.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("./imagenes/chocando.gif")
          center top
          no-repeat
        `,
      }).then(() => {
        mostrarCartas();
        window.location.reload();
        reiniciarJuego();
      });
    }
  }, 1000);
  intervalId = interval;
}

function desbloquearTarjetas() {
  var cartas = document.getElementsByClassName("cartas");
  for (var i = 0; i < cartas.length; i++) {
    if (!cartas[i].classList.contains("encontrada")) {
      cartas[i].style.pointerEvents = "auto";
    }
  }
}

function destapar(id) {
  tarjetasDestapadas++;

  if (tarjetasDestapadas === 1) {
    carta1 = document.getElementById(id);
    resultado1 = number[id];
    carta1.innerHTML = `<img src="./imagenes/${resultado1}.jpg" alt="">`;
    carta1.disable = true;
  } else if (tarjetasDestapadas === 2) {
    carta2 = document.getElementById(id);
    resultado2 = number[id];
    carta2.innerHTML = `<img src="./imagenes/${resultado2}.jpg">`;
    carta2.disable = true;

    movimientos++;
    moviminetosEL.innerHTML = movimientos;

    if (resultado1 === resultado2) {
      tarjetasDestapadas = 0;
      aciertos++;
      aciertosEl.innerHTML = aciertos;
      carta1.style.pointerEvents = "none";
      carta2.style.pointerEvents = "none";
      carta1.classList.add("encontrada");
      carta2.classList.add("encontrada");

      if (aciertos === 10) {
        clearInterval(intervalId);
        if (temporizador == false) {
          contarTiempo();
          temporizador = true;
        }

        Swal.fire({
          title: "GANASTE!",
          width: 450,
          padding: "3em",
          color: "#716add",
          background: "#fff url(./imagenes/fondo.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("./imagenes/carro.gif")
            center top
            no-repeat
          `,
        }).then(() => {
          window.location.reload();
          reiniciarJuego();
        });
      }
    } else {
      setTimeout(() => {
        carta1.innerHTML = "";
        carta2.innerHTML = "";
        carta1.disable = false;
        carta2.disable = false;
        tarjetasDestapadas = 0;
        desbloquearTarjetas();
      }, 500);
    }
  }
}

function mostrar() {
  desbloquearTarjetas();

  for (let i = 0; i < 20; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./imagenes/${number[i]}.jpg">`;
  }

  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      let tarjetaBloqueada = document.getElementById(i);
      tarjetaBloqueada.innerHTML = "";
    }
    desbloquearTarjetas();
  }, 2000);

  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  let boton = document.getElementById("boton-jugar");
  boton.disabled = true;

  var playSection = document.getElementById("play-section");
  playSection.style.pointerEvents = "auto";

  aciertos = 0;
  movimientos = 0;
  moviminetosEL.innerHTML = movimientos;
  aciertosEl.innerHTML = aciertos;
}

function reiniciarJuego() {
  tarjetasDestapadas = 0;
  carta1 = null;
  carta2 = null;
  resultado1 = null;
  resultado2 = null;
  aciertos = 0;
  movimientos = 0;
  temporizador = 0;
  timer = 60;

  moviminetosEL.innerHTML = movimientos;
  aciertosEl.innerHTML = aciertos;
  timerEl.innerHTML = timer;

  let boton = document.getElementById("boton-jugar");
  boton.disabled = false;

  var cartas = document.getElementsByClassName("cartas");
  for (var i = 0; i < cartas.length; i++) {
    cartas[i].innerHTML = "";
    cartas[i].style.pointerEvents = "auto";
    cartas[i].classList.remove("encontrada");
  }
  number = number.sort(() => {
    return Math.random() - 0.5;
  });

  juegoActivo = true;

  desbloquearTarjetas();
}

function mostrarCartas() {
  for (let i = 0; i < 20; i++) {
    let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = `<img src="./imagenes/${number[i]}.jpg">`;
  }
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      let tarjeta = document.getElementById(i);
      tarjeta.innerHTML = "";
    }
  }, 5000);
}
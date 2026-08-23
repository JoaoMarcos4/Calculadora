var input = document.querySelector("#display");
var operador = "";
var parar = false;

function limpar() {
  input.value = "";
  document.querySelector("#history").innerHTML = "";
  operador = ""
}

function add_numero(string) {
  if (!parar) {
    if (string === '.' && input.value.indexOf(".") === -1 || string !== '.') {
      input.value = input.value + string;
      history.value = input.value;
    }
  } else {
    if (string === '.' && input.value.indexOf(".") === -1 || string !== '.') {
      input.value = "";
      parar = false;
      document.querySelector("#history").innerHTML = "";
      operador = "";

      input.value = input.value + string;
    }
  }
}

function add_operador(op) {
  if (input.value == "") {
    input.value = "0";
  }

  if (operador == "") {
    operador = op;
    input.value = input.value + op;
  } else {
    total()
    input.value = input.value + op;
    operador = op;
    parar=false;
  }
}

function total() {
  if (!parar) {
    numeros = input.value.split(operador);

    if (numeros[1] == "") {
      input.value = input.value + '0';
      numeros[1] = 0;

    }

    document.querySelector("#history").innerHTML = input.value;

    switch (operador) {
      case "+":
        input.value = Number(numeros[0]) + Number(numeros[1]);
        break;

      case "-":
        input.value = numeros[0] - numeros[1];
        break;

      case "*":
        input.value = numeros[0] * numeros[1];
        break;

      case "/":
        input.value = numeros[0] / numeros[1];
        break;
    }

    parar = true;
  }
}

function change_base() {
  numeros = input.value.split("(");
  let resultado = [];

  if (numeros.length === 2) {
    let numero = numeros[0];
    let base_atual = numeros[1].replace(")", "");

    resultado.push(true, numero, base_atual);
  } else {
    resultado.push(false);
  } 

  return resultado;
}

function convert_base(value) {
  let entrada = document.querySelector("#display").value;

  let resultado = change_base();

  if (resultado) {
    let numero = resultado[1];
    let base_atual = resultado[2];

    let decimal = parseInt(numero, base_atual);
    let convertido = decimal.toString(value);

    document.querySelector("#conversion").innerHTML = `${numero}(${base_atual}) = ${convertido}(${value})`;
  } else {
    document.querySelector("#conversion").innerHTML = "Formato inválido. Use o formato: número(base)";
  }
}
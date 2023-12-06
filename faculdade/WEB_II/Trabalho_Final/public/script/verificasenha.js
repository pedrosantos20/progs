document.addEventListener("DOMContentLoaded", function () {
    const senhaInput = document.getElementById("senha");
    const forcaSenhaTexto = document.getElementById("forcaSenha");

    senhaInput.addEventListener("input", function () {
      const forca = calcularForcaSenha(senhaInput.value);
      exibirForcaSenha(forca);
    });

    function calcularForcaSenha(senha) {
      const comprimentoMinimo = 8;
      const numeros = /\d/.test(senha);
      const letrasMinusculas = /[a-z]/.test(senha);
      const letrasMaiusculas = /[A-Z]/.test(senha);
      const caracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

      const forca = (numeros + letrasMinusculas + letrasMaiusculas + caracteresEspeciais) * comprimentoMinimo;

      return forca;
    }

    function exibirForcaSenha(forca) {
      if (forca < 8) {
        forcaSenhaTexto.innerText = "Fraca";
        forcaSenhaTexto.style.color = "red";
      } else if (forca < 16) {
        forcaSenhaTexto.innerText = "Moderada";
        forcaSenhaTexto.style.color = "orange";
      } else {
        forcaSenhaTexto.innerText = "Forte";
        forcaSenhaTexto.style.color = "green";
      }
    }
  });
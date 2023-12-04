document.addEventListener("DOMContentLoaded", function () {
    const quantidadeBtns = document.querySelectorAll('.quantidade-btn');
  
    quantidadeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const input = btn.parentElement.querySelector('.quantidade-input');
        let quantidade = parseInt(input.value);
  
        if (btn.classList.contains('aumentar')) {
          quantidade++;
        } else if (btn.classList.contains('diminuir')) {
          quantidade = Math.max(0, quantidade - 1);
        }
  
        input.value = quantidade;
      });
    });
  });
function loading(inicio) {

    if (inicio == true) {
      swal({
        title: "Carregando...",
        text: "Por favor aguarde",
        icon: "./assets/images/plane_loading.gif",
        button: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });
    } else {
      setTimeout(function () { swal.close(); }, 2000);
    }
  
  }

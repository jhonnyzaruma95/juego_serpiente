
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;


    

    // Primera pintura del juego al cargar la página

    function dibujarTablero(){
      ctx.strokeStyle = "white";
      

      //lineas verticales
      for(let x=0; x<=canvas.width; x+=TAMANIO_CELDA){
        ctx.beginPath();
        ctx.moveTo(x,0)
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
  
      }

      //lineas horizontales
      for(let y=0; y<=canvas.width; y+=TAMANIO_CELDA){
        ctx.beginPath();
        ctx.moveTo(0,y)
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
  
      }
    
      
    }

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
    }

    dibujarTodo();



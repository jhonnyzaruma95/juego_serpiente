
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;


    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

     // =========================
    // FUNCIONES DE DIBUJO
    // =========================

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

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(23,23);
      pintarParte(23,10);
      pintarParte(0,10);
      pintarParte(23,0);
    
    }

    //parte 2 serpiente 

    function pintarParte(lineaX,lineaY){
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;
      ctx.fillStyle = "green";
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);

      ctx.strokeStyle = "red";
      ctx.strokeRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);

    


    }





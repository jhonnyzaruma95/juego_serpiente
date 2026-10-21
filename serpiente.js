
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;
    let intervaloSerpiente = null;
    let direccionActual = "derecha";
    let comidaX;
    let comidaY;
    let puntaje = 0;
    const serpiente=[
      {x:12,y:13},
      {x:12,y:12},
      {x:11,y:12},
      {x:10,y:12},
      {x:9,y:12}
    ];

    

    // Primera pintura del juego al cargar la página

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
      pintarSerpiente();
      pintarParte(comidaX, comidaY, "red");
    
    }

    //parte 2 serpiente 

    function pintarParte(lineaX,lineaY,color){
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;
      ctx.fillStyle = color;
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);

      ctx.strokeStyle = "red";
      ctx.strokeRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);
    }

    //creacion de la serpiente

    function pintarSerpiente(){
      for(let i=0; i<serpiente.length; i++){
        if(i==0){
          pintarParte(serpiente[i].x, serpiente[i].y, "yellow");
        }else{
          pintarParte(serpiente[i].x, serpiente[i].y, "green");
       }
      }
     }

     //Taller de la serpiente parte 3
     function moverDerecha(){
      let cabezaActual = serpiente[0];
      let nuevaCabeza = {
        x: cabezaActual.x + 1,
        y: cabezaActual.y
      }

       serpiente.unshift(nuevaCabeza);
       serpiente.pop();
     }

     function moverIzquierda(){
      let cabezaActual = serpiente[0];
      let nuevaCabeza = {
        x: cabezaActual.x - 1,
        y: cabezaActual.y
      }

       serpiente.unshift(nuevaCabeza);
       serpiente.pop();
     }

      function moverArriba(){
      let cabezaActual = serpiente[0];
      let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y - 1
      }

       serpiente.unshift(nuevaCabeza);
       serpiente.pop();
      }

      function moverAbajo(){
      let cabezaActual = serpiente[0];
      let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y + 1
      }

       serpiente.unshift(nuevaCabeza);
       serpiente.pop();
      }

      function cambiarDireccion(direccion){
        direccionActual = direccion;

      }

      function iniciarJuego(){
        if(intervaloSerpiente !== null){
          return;
        }
        intervaloSerpiente = setInterval(moverSerpiente,1000);
      }

      function pausarJuego(){
        clearInterval(intervaloSerpiente);
        intervaloSerpiente = null;

      }

      function moverSerpiente(){
        let colaAnterior = {
        x: serpiente[serpiente.length - 1].x,
        y: serpiente[serpiente.length - 1].y
      }
      if(direccionActual == "derecha"){
        moverDerecha();
      }else if(direccionActual == "izquierda"){
        moverIzquierda();
      }else if(direccionActual == "arriba"){
        moverArriba();
      }else if(direccionActual == "abajo"){
        moverAbajo();
      }

      //comprobar si atrapo la comida
      if (atrapaComida()){
        puntaje++;

      document.getElementById("puntaje").textContent = puntaje;
      serpiente.push(colaAnterior);

      pintarComida();
    }

     dibujarTodo();
  
      }

      function pintarComida(){
        //Calcular posicion aleatoria en X
        comidaX = Math.floor(Math.random() *(canvas.width / TAMANIO_CELDA));

         //Calcular posicion aleatoria en Y
        comidaY = Math.floor(Math.random() *(canvas.height / TAMANIO_CELDA));

      }

      function atrapaComida(){
         let cabeza = serpiente[0];

         if (cabeza.x === comidaX && cabeza.y === comidaY) {
         return true;
         } else {
         return false;
        }
      }
      pintarComida();
      dibujarTodo();




      

    

    


  

    





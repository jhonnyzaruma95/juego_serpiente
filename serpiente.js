
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;

    const serpiente=[
      {x:12,y:13},
      {x:12,y:12},
      {x:11,y:12},
      {x:10,y:12},
      {x:9,y:12}
    ];

    let velocidad = 300;
    let intervaloSerpiente = null;
    let direccionActual = "derecha";
    let comidaX;
    let comidaY;
    let puntaje = 0;
    let gameOver = false;

    

    // Primera pintura del juego al cargar la página
      pintarComida();
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
      pintarSerpiente();
      pintarParte(comidaX, comidaY, "orange");
    
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
        // Evitar que retroceda sobre sí misma
      if( direccionActual === "derecha" && direccion === "izquierda" ||
          direccionActual === "izquierda" && direccion === "derecha" ||
          direccionActual === "arriba" && direccion === "abajo" ||
          direccionActual === "abajo" && direccion === "arriba") {
          return;
      }

         direccionActual = direccion;

      }

      function iniciarJuego(){
        if(intervaloSerpiente !== null || gameOver){
          return;
        }

        document.getElementById("mensaje").textContent =
        "¡A jugar! Usa las flechas para mover la serpiente.";


        intervaloSerpiente = setInterval(moverSerpiente,velocidad);
      }

      function pausarJuego(){
        clearInterval(intervaloSerpiente);
        intervaloSerpiente = null;

      }

      function moverSerpiente(){
       if(gameOver){
          return;
        }

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

      //verificar si la serpiente toco un borde
      if(verificarGameOver()){
        return;
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

      function verificarGameOver(){
        let cabeza = serpiente[0];
        let columnas = canvas.width / TAMANIO_CELDA;
        let filas = canvas.height / TAMANIO_CELDA;

        if (cabeza.x < 0 || cabeza.x >= columnas || 
            cabeza.y < 0 || cabeza.y >= filas){
              gameOver = true;
              document.getElementById("mensaje").textContent =
              "¡GAME OVER! Pulsa Reiniciar juego para intentarlo otra vez.";


              pausarJuego();
              alert("!!GAME OVER!!");
              return true;
        }
              return false;
            
      }

      function reiniciarJuego(){
       // Detener cualquier movimiento anterior
       pausarJuego();

       // Restaurar la serpiente a su posición inicial
      serpiente.length = 0;

      serpiente.push(
          { x: 12, y: 13 },
          { x: 12, y: 12 },
          { x: 11, y: 12 },
          { x: 10, y: 12 },
          { x: 9, y: 12 }
      );

      // Reiniciar la dirección
      direccionActual = "derecha";

      // Quitar el estado de GAME OVER
      gameOver = false;
      document.getElementById("mensaje").textContent =
      "¡Nueva partida! Consigue todos los puntos que puedas.";

      // Reiniciar el puntaje
      puntaje = 0;
      document.getElementById("puntaje").textContent = puntaje;
 
      // Crear una nueva posición para la comida
      pintarComida();

      // Limpiar y dibuja nuevamente el tablero
      dibujarTodo();
    
    }



     



      

    

    


  

    





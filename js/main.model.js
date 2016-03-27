// main.model.js
// by Sugar999999

main.model = (function(){

  //
  // ------------------difine---------------------
  //
  var configMap = {
    main_html: String()
      + '<div id=\"header\">Game<\/div>'
      + '<div id=\"main-disp\">Main'
        + '<canvas id=\"main-disp-window\"><\/canvas>'
      + '<\/div>'
      + '<div id=\"footer\">Footer<\/div>'
      + '<div id=\"nav\">Nav'
        + '<div id=\"output-map\"> << </div>'
      + '<\/div>',

    stage_map:
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],

    block_size: 25,
    mouse: {
      X: 0,
      Y: 0,
      col: 0,
      row: 0,
      _col: -1,
      _row: -1,
      swit: 0
    }
  },
  initModule, drawWindow, nav, onMouseMove, onMouseClick,
  mainCanvas, style, mainCont;


  //
  // --------------------nav----------------------
  //
  nav = function( $container ){
    var onOutputMap;

    onOutputMap = function(e){
      var $output =
      $(this)
        .parent()
        .find("textarea");

      for(var i=0; i < configMap.stage_map.length; i++){
        if(i === 0)$output.text('    [');
        $output.append('[' + configMap.stage_map[i] + ']');
        if(i != configMap.stage_map.length - 1){
          $output.append(',\n    ');
          continue;
        }
        $output.append(']');
      }
    }

    $container
      .append('<div><textarea rows=\"16\" cols=\"36\"><\/textarea><\/diiv>')
      .find("#output-map")
      .bind('click', onOutputMap);
  }

  //
  // --------------------drawWindow----------------------
  //
  drawWindow = function(){
    // ------------------px adapt---------------------
    style = window.getComputedStyle(mainCanvas);
    mainCanvas.width = +style.width.replace(/px/, "");
    mainCanvas.height = +style.width.replace(/px/, "");
    // -----------------------------------------------
    mainCont = mainCanvas.getContext("2d");

    mainCont.fillStyle = "#aaaaaa";
    for(var i=0; i < configMap.stage_map.length; i++){
      for(var j=0; j < configMap.stage_map[i].length; j++){
        if(configMap.stage_map[i][j] == 1)mainCont.fillRect(j * configMap.block_size, i * configMap.block_size, configMap.block_size, configMap.block_size);
      }
    }
  };

  //
  // --------------------onMouseMoveCanvas----------------------
  //
  onMouseMoveCanvas = function(e){
    configMap.mouse.X = e.clientX - mainCanvas.getBoundingClientRect().left;
		configMap.mouse.Y = e.clientY - mainCanvas.getBoundingClientRect().top;
    configMap.mouse.col = Math.floor(configMap.mouse.X / configMap.block_size);
    configMap.mouse.row = Math.floor(configMap.mouse.Y / configMap.block_size);
    if(e.buttons === 0 && configMap.stage_map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.mouse.swit = 1;
    else if(e.buttons === 0 && configMap.stage_map[configMap.mouse.row][configMap.mouse.col] == 1)configMap.mouse.swit = 0;

    if(e.buttons == 1 && !(configMap.mouse.exCol == configMap.mouse.col && configMap.mouse.exRow == configMap.mouse.row) ){
      configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = configMap.mouse.swit;
      drawWindow();
      configMap.mouse.exCol = configMap.mouse.col;
      configMap.mouse.exRow = configMap.mouse.row;
    }
  };

  //
  // --------------------onMouseClickCanvas----------------------
  //
  onMouseClickCanvas = function(e){
    if(configMap.stage_map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = 1;
    else configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = 0;
    drawWindow();
  };

  //
  // --------------------initModule----------------------
  //
  initModule = function($container){

    $container
      .append(configMap.main_html)
      .find("#header")
        .animate({width: 100 + "%"}, 1000)
        .animate({height: 50 + "px"}, 1000)
      .next() //Main
        .animate({width: 100 + "%"}, 1000)
        .animate({height: 500 + "px"}, 1000)
      .find("#main-disp-window") //Window
        .animate({width: 400 + "px"}, 1000)
        .animate({height: 400 + "px" }, 1000)
      .parent().next() //Footer
        .animate({width: 100 + "%"}, 1000)
        .css("bottom","0")
        .animate({height: 100 + "px" }, {duration: "1000", complete: function(){


        }});

        mainCanvas = document.getElementById("main-disp-window");

        mainCanvas.addEventListener('mousemove', onMouseMoveCanvas, false);
        mainCanvas.addEventListener('mousedown', onMouseClickCanvas, false);
        nav( $("#nav") );
  };



  return {initModule: initModule};

}());

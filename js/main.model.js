// main.model.js
// by Sugar999999

main.model = (function(){

  //
  // ------------------difine---------------------start
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
  // ------------------difine---------------------end


  // --------------------nav----------------------start
  //
  nav = function( $container ){
    var onOutputMap;

    // -----------onOutputMap------------start
    // 「configMap.stage_map」を配列表示で出力する。
    //
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
    };
    //
    // -----------onOutputMap------------end

    $container
      .append('<div><textarea rows=\"16\" cols=\"36\"><\/textarea><\/diiv>')
      .find("#output-map")
      .bind('click', onOutputMap);
  };

  //
  // --------------------nav----------------------end

  // ------------------------drawWindow--------------------------start
  //
  drawWindow = function(){
    // ---------------canvas px adapt------------------start
    style = window.getComputedStyle(mainCanvas);
    mainCanvas.width = +style.width.replace(/px/, "");
    mainCanvas.height = +style.width.replace(/px/, "");
    // ---------------canvas px adapt------------------end
    mainCont = mainCanvas.getContext("2d");

    mainCont.fillStyle = "#aaaaaa";
    for(var i=0; i < configMap.stage_map.length; i++){
      for(var j=0; j < configMap.stage_map[i].length; j++){
        if(configMap.stage_map[i][j] == 1)mainCont.fillRect(j * configMap.block_size, i * configMap.block_size, configMap.block_size, configMap.block_size);
      }
    }
  };

  //
  // ------------------------drawWindow--------------------------end

  // --------------------onMouseMoveCanvas----------------------start
  //
  onMouseMoveCanvas = function(e){
    // 「Canvas」内のマウスのX,Y座標を取得
    configMap.mouse.X = e.clientX - mainCanvas.getBoundingClientRect().left;
		configMap.mouse.Y = e.clientY - mainCanvas.getBoundingClientRect().top;

    // マウスの座標から現在位置ブロックの「Col」「Row」を算出
    configMap.mouse.col = Math.floor(configMap.mouse.X / configMap.block_size);
    configMap.mouse.row = Math.floor(configMap.mouse.Y / configMap.block_size);

    if( (configMap.mouse.col < configMap.stage_map[0].length) && (configMap.mouse.row < configMap.stage_map.length) ){
    // 取得した現在位置ブロックの状態に応じて、クリック時の動作を判定する。
    // 空白：ブロックを埋める。
    // 空白でない：ブロックを消す。
    // 例外：クリックされたまま他のブロックに移った場合、最初のブロック状態の判定から変更しない。
    //  * configMap.mouse.swit：クリック時の動作。「0」消す。「1」埋める。
    //
    if(e.buttons === 0 && configMap.stage_map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.mouse.swit = 1;
    else if(e.buttons === 0 && configMap.stage_map[configMap.mouse.row][configMap.mouse.col] == 1)configMap.mouse.swit = 0;

    // クリック時の動作
    //「configMap.mouse.swit」を現在位置ブロックに代入する。
    // 例外：クリックしたままの状態で、前回動作した位置ブロックにまだ滞在している場合、同じ位置で再度動作しない。
    //  * configMap.mouse._Col, configMap.mouse._Row：前回動作した位置ブロックの保存。
    //    クリックにて押下されたボタンが放れれば、数値がリセットされる。→同じ位置で移動せず再度クリックしても正常動作。
    if(e.buttons == 1 && !(configMap.mouse._Col == configMap.mouse.col && configMap.mouse._Row == configMap.mouse.row) ){
      configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = configMap.mouse.swit;
      drawWindow();
      configMap.mouse._Col = configMap.mouse.col;
      configMap.mouse._Row = configMap.mouse.row;
    } else {
      configMap.mouse._Col = -1;
      configMap.mouse._Row = -1;
    }
  }
  };
  //
  // --------------------onMouseMoveCanvas----------------------end

  // --------------------onMouseClickCanvas----------------------start
  //
  onMouseClickCanvas = function(e){
    if(configMap.stage_map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = 1;
    else configMap.stage_map[configMap.mouse.row][configMap.mouse.col] = 0;
    drawWindow();
  };
  //
  // --------------------onMouseClickCanvas----------------------end


  // --------------------initModule----------------------start
  //
  initModule = function($container){

    // メイン要素の描画
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
        .animate({height: 100 + "px" }, 1000);

    // 「nav」要素の追加
    nav( $("#nav") );

    // エレメント取得
    mainCanvas = document.getElementById("main-disp-window");
    // イベントバインド
    mainCanvas.addEventListener('mousemove', onMouseMoveCanvas, false);
    mainCanvas.addEventListener('mousedown', onMouseClickCanvas, false);

  };
  //
  // --------------------initModule----------------------end


  return {initModule: initModule};

}());

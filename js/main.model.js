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
        + '<input type=\"range\" id=\"rad-range\" max=\"360\" min=\"-360\" value=\"0\"></input>'
      + '<\/div>'
      + '<div id=\"footer\">Footer<\/div>'
      + '<div id=\"nav\">Nav'
        + '<div id=\"output-map\"> << </div>'
      + '<\/div>',

    stage: {
      map:
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
      start: {
        col: 0,
        row: 0
      },
      goal: {
        col: 0,
        row: 0
      },
      state: {}
    },

    block_size: 22,

    mouse: {
      X: 0,
      Y: 0,
      col: 0,
      row: 0,
      _col: -1,
      _row: -1,
      swit: 0
    },
    disp_state: {
      rad: 0,
      wid: 352,
      hei: 352
    },
    ball_state: {
      X: 0,
      Y: 0,
      col: 0,
      row: 0,
      _col: -1,
      _row: -1,
      gravity: 5,
      vx: 0,
      vy: 0,
      radius: 8
    }
  },
  initModule, drawDisp, nav, onMouseMove, onMouseClick,
  mainCanvas, style, mainCont, onRadChange, updateStatus;
  //
  // ------------------difine---------------------end

  // --------------------updateStatus----------------------start
  //
  updateStatus = function(){

    // ボールの現在位置ブロックを算出
    configMap.ball_state.col = Math.floor(configMap.ball_state.X / configMap.block_size);
    configMap.ball_state.row = Math.floor(configMap.ball_state.Y / configMap.block_size);

    // ゴール判定
    if( configMap.ball_state.col == configMap.stage.goal.col && configMap.ball_state.row == configMap.stage.goal.row ){
      //goal();
      clearInterval(configMap.stage.state.running);
      alert("goal!");
      return false;
    }

    // ボールの位置更新
    // 下向きの重力に合わせてsin,cosを設定。（ball_state.X: gravity（下向き） の sin, ball_state.Y: gravity（下向き） の cos）
    configMap.ball_state.vx = configMap.ball_state.X;
    configMap.ball_state.vy = configMap.ball_state.Y;
    configMap.ball_state.vx += Math.sin(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity;
    configMap.ball_state.vy += Math.cos(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity;
    // 「mainCanvas」からスケールアウトしないように値を調整。
    if(configMap.ball_state.vx < configMap.ball_state.radius)configMap.ball_state.vx = configMap.ball_state.radius;
    else if(configMap.ball_state.vx > mainCanvas.width - configMap.ball_state.radius)configMap.ball_state.vx = mainCanvas.width - configMap.ball_state.radius;
    if(configMap.ball_state.vy < configMap.ball_state.radius)configMap.ball_state.vy = configMap.ball_state.radius;
    else if(configMap.ball_state.vy > mainCanvas.height - configMap.ball_state.radius)configMap.ball_state.vy = mainCanvas.height - configMap.ball_state.radius;

    // ブロックを通過しない判定
    // ボール輪郭360度がブロックの輪郭を超えようとした場合の処理
    for(var i = 0; i< 360; i++){

      // ボール先端（ボールのX,Y＋半径）の「Col」「Row」を算出
      configMap.ball_state._col = Math.floor((configMap.ball_state.vx + (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius)) / configMap.block_size);
      configMap.ball_state._row = Math.floor((configMap.ball_state.vy + (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius)) / configMap.block_size);

      // Canvasの枠に接する場合、「configMap.ball_state._row」が定義外のインデックスを指さないように調整
      if( 0 > configMap.ball_state._row )configMap.ball_state._row = 0;
      if( 0 > configMap.ball_state._col )configMap.ball_state._col = 0;
      if( configMap.ball_state._col >= configMap.stage.map[0].length )configMap.ball_state._col = configMap.stage.map[0].length -1;
      if(configMap.ball_state._row >= configMap.stage.map.length)configMap.ball_state._row = configMap.stage.map.length -1;

      // ボール輪郭にブロックがあるかどうか判定。ブロック4面のどの面からの接触かによって場合分け。
      if(configMap.ball_state._col > configMap.ball_state.col){
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] == 1){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
          configMap.ball_state.vx -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);
        }
      }
      if(configMap.ball_state._col < configMap.ball_state.col){
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] == 1){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
          configMap.ball_state.vx -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);
        }
      }
      if(configMap.ball_state._row > configMap.ball_state.row){
        if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] == 1){
          configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
          configMap.ball_state.vy -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);
        }
      }
      if(configMap.ball_state._row < configMap.ball_state.row){
        if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] == 1){
          configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
          configMap.ball_state.vy -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);
        }
      }
    }

    // ボールの位置を移動
    configMap.ball_state.X = configMap.ball_state.vx;
    configMap.ball_state.Y = configMap.ball_state.vy;

  };

  //
  // --------------------updateStatus----------------------end

  // --------------------nav----------------------start
  //
  nav = function( $container ){
    var onOutputMap;

    // -----------onOutputMap------------start
    // 「configMap.stage.map」を配列表示で出力する。
    //
    onOutputMap = function(e){
      var $output =
      $(this)
        .parent()
        .find("textarea");

      for(var i=0; i < configMap.stage.map.length; i++){
        if(i === 0)$output.text('    [');
        $output.append('[' + configMap.stage.map[i] + ']');
        if(i != configMap.stage.map.length - 1){
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

  // ------------------------drawDisp--------------------------start
  //
  drawDisp = function(){

    var reset;
    // ---------------canvas px adapt------------------start
    style = window.getComputedStyle(mainCanvas);
    mainCanvas.width = +style.width.replace(/px/, "");
    mainCanvas.height = +style.width.replace(/px/, "");
    // ---------------canvas px adapt------------------end
    mainCont = mainCanvas.getContext("2d");

    // 初回のみの演出
    // ボールの描画
    reset = function(){

    };

    // draw stage.map
    mainCont.fillStyle = "#aaaaaa";
    for(var i=0; i < configMap.stage.map.length; i++){
      for(var j=0; j < configMap.stage.map[i].length; j++){
        if(configMap.stage.map[i][j] == 1)mainCont.fillRect(j * configMap.block_size, i * configMap.block_size, configMap.block_size, configMap.block_size);
      }
    }

    // draw ball
    updateStatus();
    mainCont.fillStyle = "#888888";
    mainCont.beginPath();
    mainCont.arc(configMap.ball_state.X, configMap.ball_state.Y, configMap.ball_state.radius, 0, Math.PI*2, true);
    mainCont.fill();

    // draw goal
    mainCont.fillStyle = "#d00";
    mainCont.beginPath();
    mainCont.arc((configMap.stage.goal.col * configMap.block_size) + configMap.block_size / 2, (configMap.stage.goal.row * configMap.block_size) + configMap.block_size / 2, configMap.ball_state.radius, 0, Math.PI*2, true);
    mainCont.fill();
  };

  //
  // ------------------------drawDisp--------------------------end

  // --------------------onRadChange----------------------start
  //
    onRadChange = function(e){
      configMap.disp_state.rad = $(this).val();
      $("#main-disp-window").css("transform", "rotate(" + configMap.disp_state.rad + "deg)");
    };
  //
  // --------------------onRadChange----------------------start

  // --------------------onMouseMoveCanvas----------------------start
  //
  onMouseMoveCanvas = function(e){
    // 「Canvas」内のマウスのX,Y座標を取得
    configMap.mouse.X = e.clientX - mainCanvas.getBoundingClientRect().left;
		configMap.mouse.Y = e.clientY - mainCanvas.getBoundingClientRect().top;

    // マウスの座標から現在位置ブロックの「Col」「Row」を算出
    configMap.mouse.col = Math.floor(configMap.mouse.X / configMap.block_size);
    configMap.mouse.row = Math.floor(configMap.mouse.Y / configMap.block_size);

    if( (configMap.mouse.col < configMap.stage.map[0].length) && (configMap.mouse.row < configMap.stage.map.length) ){

      // 取得した現在位置ブロックの状態に応じて、クリック時の動作を判定する。
      // 空白：ブロックを埋める。
      // 空白でない：ブロックを消す。
      // 例外：クリックされたまま他のブロックに移った場合、最初のブロック状態の判定から変更しない。
      //  * configMap.mouse.swit：クリック時の動作。「0」消す。「1」埋める。
      //
      if(e.buttons === 0 && configMap.stage.map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.mouse.swit = 1;
      else if(e.buttons === 0 && configMap.stage.map[configMap.mouse.row][configMap.mouse.col] == 1)configMap.mouse.swit = 0;

      // クリック時の動作
      //「configMap.mouse.swit」を現在位置ブロックに代入する。
      // 例外：クリックしたままの状態で、前回動作した位置ブロックにまだ滞在している場合、同じ位置で再度動作しない。
      //  * configMap.mouse._Col, configMap.mouse._Row：前回動作した位置ブロックの保存。
      //    クリックにて押下されたボタンが放れれば、数値がリセットされる。→同じ位置で移動せず再度クリックしても正常動作。
      if(e.buttons == 1 && !(configMap.mouse._Col == configMap.mouse.col && configMap.mouse._Row == configMap.mouse.row) ){
        configMap.stage.map[configMap.mouse.row][configMap.mouse.col] = configMap.mouse.swit;
        drawDisp();
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
    if(configMap.stage.map[configMap.mouse.row][configMap.mouse.col] === 0)configMap.stage.map[configMap.mouse.row][configMap.mouse.col] = 1;
    else configMap.stage.map[configMap.mouse.row][configMap.mouse.col] = 0;
    drawDisp();
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
        .css("margin", (-configMap.disp_state.wid/2) + " 0 0 " + (-configMap.disp_state.wid/2) )
        .animate({width: configMap.disp_state.wid + "px"}, 1000)
        .animate({height: configMap.disp_state.hei + "px" }, 1000)
      .parent().next() //Footer
        .animate({width: 100 + "%"}, 1000)
        .css("bottom","0")
        .animate({height: 100 + "px" }, {
          duration: "1000",
          complete: function(){
            main.stagelist.mapMake(configMap.stage, "_1");
            configMap.ball_state.X = (configMap.stage.start.col * configMap.block_size) + configMap.ball_state.radius;
            configMap.ball_state.Y = (configMap.stage.start.row * configMap.block_size) + configMap.ball_state.radius;
            configMap.stage.state.running = setInterval(drawDisp, 30);
          }
        });

    // 要素の追加
    nav( $("#nav") );

    // エレメント取得
    mainCanvas = document.getElementById("main-disp-window");
    // イベントバインド
    mainCanvas.addEventListener('mousemove', onMouseMoveCanvas, false);
    mainCanvas.addEventListener('mousedown', onMouseClickCanvas, false);
    $("#rad-range").on('input', onRadChange);

  };
  //
  // --------------------initModule----------------------end


  return {initModule: initModule};

}());

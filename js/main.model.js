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
        // testplaytools-------------------------start
        + '<div id=\"gram-range\">gram: '
          + '<textarea id=\"output-gram\" rows=\"1\" cols=\"3\">1.5<\/textarea>'
          + '<input type=\"range\" id=\"_gram-range\" max=\"60" min=\"1\" step=\"0.1\" value=\"1.5\"><\/input>'
        + '<\/div>'
        + '<div id=\"rebound-range\">reb: '
          + '<textarea id=\"output-rebound\" rows=\"1\" cols=\"3\">0<\/textarea>'
          + '<input type=\"range\" id=\"_rebound-range\" max=\"2.0" min=\"0\" step=\"0.1\" value=\"0\"><\/input>'
        + '<\/div>'
        // testplaytools-------------------------end
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
      state: {
        now_stage: 1,
        itemGcolor: {}
      }
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
      speedX: 0,
      speedY: 0,
      _speedX: 0,
      _speedY: 0,
      gravity: 9.8,
      isOnWall: [false,false,false,false], //up, right, down,  left
      vx: 0,
      vy: 0,
      radius: 7,
      gram: 1.5,
      powerX: 0,
      powerY: 0,
      rebound: 0
    }
  },
  initModule, drawDisp, nav, onMouseMove, onMouseClick,
  mainCanvas, style, mainCont, onRadChange, updateStatus,
  gameStart;
  //
  // ------------------difine---------------------end

  // --------------------gameStart----------------------start
  //

  gameStart = function(){
    $("#rad-range").on('input', onRadChange);
    configMap.ball_state.speedX = 0;
    configMap.ball_state.speedY = 0;
    configMap.ball_state.X = (configMap.stage.start.col * configMap.block_size) + (configMap.block_size / 2);
    configMap.ball_state.Y = (configMap.stage.start.row * configMap.block_size) + (configMap.block_size / 2);
    configMap.stage.state.isStarting = {};
    configMap.stage.state.running = setInterval(drawDisp, 15);
  };

  //
  // --------------------gameStart----------------------end

  // --------------------updateStatus----------------------start
  //
  updateStatus = function(){

    // ボールの現在位置ブロックを算出
    configMap.ball_state.col = Math.floor(configMap.ball_state.X / configMap.block_size);
    configMap.ball_state.row = Math.floor(configMap.ball_state.Y / configMap.block_size);

    // ゴール判定
    if( configMap.ball_state.col == configMap.stage.goal.col && configMap.ball_state.row == configMap.stage.goal.row && !configMap.stage.state.isStarting  ){
      //goal();
      clearInterval(configMap.stage.state.running);
      delete configMap.stage.state.running;
      configMap.disp_state.rad = 0;
      $("#rad-range").remove();
      $("#main-disp-window") //Window
        .animate({height: 0 + "px"}, 1000)
        .animate({width: 0 + "px" },{
          duration: "0",
          complete: function(){
            configMap.stage.state.now_stage++;
            main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage);
            drawDisp();
            $(this) //Window
              .css("transform", "rotate(" + configMap.disp_state.rad + "deg)")
              .animate({width: configMap.disp_state.wid + "px"}, 0)
              .animate({height: configMap.disp_state.hei + "px" },{
                duration: "1000",
                complete: function(){
                  $("#main-disp").append('<input type=\"range\" id=\"rad-range\" max=\"360\" min=\"-360\" value=\"0\"></input>');
                  gameStart();
                }
              });

          }
        });

      return false;
    }

    //アイテム獲得判定
    if( !configMap.stage.state.isStarting && configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] < 0 ){
      // Rebound+ item
      if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -1){ // a little
        configMap.ball_state.rebound += 0.2;
        if(configMap.ball_state.rebound > 2.0)configMap.ball_state.rebound = 2.0;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -2){ // middle
        configMap.ball_state.rebound += 0.4;
        if(configMap.ball_state.rebound > 2.0)configMap.ball_state.rebound = 2.0;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -3){ // high burst
        configMap.ball_state.rebound += 1.0;
        if(configMap.ball_state.rebound > 2.0)configMap.ball_state.rebound = 2.0;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -4){ // max burst
        configMap.ball_state.rebound = 2.0;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      // Rebound- item
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -5){
        configMap.ball_state.rebound -= 0.25;
        if(configMap.ball_state.rebound < 0)configMap.ball_state.rebound = 0;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }
      // Gram+ item
      if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -6){ // a little
        configMap.ball_state.gram += 0.5;
        if(configMap.ball_state.gram > 2.0)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -7){ // middle
        configMap.ball_state.gram += 3.0;
        if(configMap.ball_state.gram > 2.0)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -8){ // high
        configMap.ball_state.gram += 5.0;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -9){ // more high
        configMap.ball_state.gram += 10;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }

    }


    // ボールの位置更新
    // 下向きの重力に合わせてsin,cosを設定。（ball_state.X: speed（下向き） の sin, ball_state.Y: speed（下向き） の cos）
    configMap.ball_state.vx = configMap.ball_state.X;
    configMap.ball_state.vy = configMap.ball_state.Y;

    configMap.ball_state.speedX += Math.sin(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity * .07;
    configMap.ball_state.speedY += Math.cos(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity * .07;
    if(configMap.ball_state.speedX >= configMap.block_size / 2)configMap.ball_state.speedX = configMap.block_size / 2;
    else if(configMap.ball_state.speedX <= -(configMap.block_size / 2))configMap.ball_state.speedX = -configMap.block_size / 2;
    if(configMap.ball_state.speedY >= configMap.block_size / 2)configMap.ball_state.speedY = configMap.block_size / 2;
    else if(configMap.ball_state.speedY <= -(configMap.block_size / 2))configMap.ball_state.speedY = -configMap.block_size / 2;

    configMap.ball_state.vx += configMap.ball_state.speedX;
    configMap.ball_state.vy += configMap.ball_state.speedY;
    configMap.ball_state.powerX = Math.abs(configMap.ball_state.gram * configMap.ball_state.speedX);
    configMap.ball_state.powerY = Math.abs(configMap.ball_state.gram * configMap.ball_state.speedY);

    // 「mainCanvas」からスケールアウトしないように値を調整。
    if(configMap.ball_state.vx < configMap.ball_state.radius){
      configMap.ball_state.vx = configMap.ball_state.radius;
      configMap.ball_state.isOnWall[3] = true;

      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }else if(configMap.ball_state.vx > mainCanvas.width - configMap.ball_state.radius){
      configMap.ball_state.vx = mainCanvas.width - configMap.ball_state.radius;
      configMap.ball_state.isOnWall[1] = true;

      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }
    if(configMap.ball_state.vy < configMap.ball_state.radius){
      configMap.ball_state.vy = configMap.ball_state.radius;
      configMap.ball_state.isOnWall[0] = true;

      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }else if(configMap.ball_state.vy > mainCanvas.height - configMap.ball_state.radius){
      configMap.ball_state.vy = mainCanvas.height - configMap.ball_state.radius;
      configMap.ball_state.isOnWall[2] = true;

      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }

    // ブロックを通過しない判定
    // ボール輪郭360度がブロックの輪郭を超えようとした場合の処理
    for(var i = 0; i< 360; i++){

      // ボール先端（ボールのX,Y＋半径）の「Col」「Row」を算出
      configMap.ball_state._col = Math.floor((configMap.ball_state.vx + (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius)) / configMap.block_size);
      configMap.ball_state._row = Math.floor((configMap.ball_state.vy + (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius)) / configMap.block_size);

      // Canvasの枠に接する場合、「configMap.ball_state._row」が未定義のインデックスを指さないように調整
      if( 0 > configMap.ball_state._row )configMap.ball_state._row = 0;
      if( 0 > configMap.ball_state._col )configMap.ball_state._col = 0;
      if( configMap.ball_state._col >= configMap.stage.map[0].length )configMap.ball_state._col = configMap.stage.map[0].length -1;
      if(configMap.ball_state._row >= configMap.stage.map.length)configMap.ball_state._row = configMap.stage.map.length -1;

      // ボール輪郭にブロックがあるかどうか判定。ブロック4面のどの面からの接触かによって場合分け。
      // ・4面それぞれの方向からの衝突に加え、角に衝突した場合の処理を、以下の条件で追加。
      // 「現在位置ブロックの縦横方向にブロックが存在せず、且つ斜め方向にブロックがある場合」
      // ・衝突の角度によっては、「vx」、「vy」を生かす。
      // 条件：
      //  衝突の角度がちょうど45度の場合　→　「vx」、「vy」どちらも殺す
      //  45度よりX軸寄り　→　「vx」のみ殺す
      //  45度よりY軸寄り　→　「vy」のみ殺す
      //
      if(configMap.ball_state._col > configMap.ball_state.col){ // right
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] >= 1){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
          configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);
          configMap.ball_state.isOnWall[1] = true;

          // ブロック破壊判定　横
          if(configMap.ball_state.powerX > configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] * configMap.block_size){
            configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 1;
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] = 0;
          }

          // 壁に張り付く
          // configMap.ball_state.speedX = configMap.ball_state._speedX;
          // configMap.ball_state.speedY = configMap.ball_state._speedY;
        } else {

          if(configMap.ball_state._row < configMap.ball_state.row ){  //up
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i <= 45){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i >= 45){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          }else if(configMap.ball_state._row > configMap.ball_state.row ){  //down
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i >= 315){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i <= 315){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180) )) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          }
        }
      }
      if(configMap.ball_state._col < configMap.ball_state.col){ //left
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] >= 1){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
          configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);
          configMap.ball_state.isOnWall[3] = true;

          // ブロック破壊判定　横
          if(configMap.ball_state.powerX > configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] * configMap.block_size){
            configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 1;
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] = 0;
          }

          // 壁に張り付く
          // configMap.ball_state.speedX = configMap.ball_state._speedX;
          // configMap.ball_state.speedY = configMap.ball_state._speedY;

        } else {
          if(configMap.ball_state._row < configMap.ball_state.row ){ //up
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i >= 135){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i <= 135){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          }else if(configMap.ball_state._row > configMap.ball_state.row ){ //down
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i <= 225){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i >= 225){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }


            }
          }
        }
      }
      if(configMap.ball_state._row > configMap.ball_state.row){ //down
        if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] >= 1){
          configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
          configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);
          configMap.ball_state.isOnWall[2] = true;

          // ブロック破壊判定　縦
          if(configMap.ball_state.powerY > configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] * configMap.block_size){
            configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 1;
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] = 0;
          }

          // 壁に張り付く
          // configMap.ball_state.speedX = configMap.ball_state._speedX;
          // configMap.ball_state.speedY = configMap.ball_state._speedY;

        } else {
          if(configMap.ball_state._col > configMap.ball_state.col){ //right
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i >= 315){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i <= 315){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          } else if(configMap.ball_state._col < configMap.ball_state.col){ //left
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i <= 225){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i >= 225){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }


            }
          }
        }
      }
      if(configMap.ball_state._row < configMap.ball_state.row){ //up
        if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] >= 1){
          configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
          configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);
          configMap.ball_state.isOnWall[0] = true;

          // ブロック破壊判定　縦
          if(configMap.ball_state.powerY > configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] * configMap.block_size){
            configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 1;
            if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] = 0;
          }

          // 壁に張り付く
          // configMap.ball_state.speedX = configMap.ball_state._speedX;
          // configMap.ball_state.speedY = configMap.ball_state._speedY;


        }else {
          if(configMap.ball_state._col > configMap.ball_state.col){ //right
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i <= 45){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i >= 45){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          } else if(configMap.ball_state._col < configMap.ball_state.col){ //left
            if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 1 && configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] >= 1){
              if(i >= 135){
                configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
                configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * configMap.ball_state.radius);

              }
              if(i <= 135){
                configMap.ball_state.vy = configMap.ball_state._row * configMap.block_size + configMap.block_size;
                configMap.ball_state.vy -= (Math.sin(i * Math.PI / 180) * configMap.ball_state.radius);

              }

              // ブロック破壊判定　斜め
              if( ( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size * 2){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
              }

            }
          }
        }
      }

    }



    if( configMap.ball_state.isOnWall[0] || configMap.ball_state.isOnWall[2] ){
      configMap.ball_state.speedY = configMap.ball_state.speedY * -configMap.ball_state.rebound;
      if(configMap.ball_state.rebound > 0.5)configMap.ball_state.rebound -= .01
    }
    if( configMap.ball_state.isOnWall[1] || configMap.ball_state.isOnWall[3] ){
      configMap.ball_state.speedX = configMap.ball_state.speedX * -configMap.ball_state.rebound;
      if(configMap.ball_state.rebound > 0.5)configMap.ball_state.rebound -= .01
    }

    for(var i = 0; i < 4; i++)configMap.ball_state.isOnWall[i] = false;

    // ボールの位置を移動
    configMap.ball_state.X = configMap.ball_state.vx;
    configMap.ball_state.Y = configMap.ball_state.vy;

  };

  //
  // --------------------updateStatus----------------------end

  // --------------------nav----------------------start
  //
  nav = function( $container ){
    var onOutputMap, onGramChange, onReboundChange;

    // -----------onOutputMap------------start
    // 「configMap.stage.map」を配列表示で出力する。
    //
    onOutputMap = function(e){
      var $output =
      $(this)
        .parent()
        .find("#output-map-text");

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

    // --------onGramChange----------start
    //
    onGramChange = function(e){
      configMap.ball_state.gram = $(this).val();

      $(this)
        .parent()
        .find("#output-gram")
        .text(configMap.ball_state.gram);

    };
    //
    // --------onGramChange----------end

    // --------onReboundChange----------start
    //
    onReboundChange = function(e){
      configMap.ball_state.rebound = $(this).val();

      $(this)
        .parent()
        .find("#output-rebound")
        .text(configMap.ball_state.rebound);

    };
    //
    // --------onReboundChange----------end



    $container
      .append('<div><textarea id="output-map-text" rows=\"16\" cols=\"36\"><\/textarea><\/div>')
      .find("#output-map")
        .bind('click', onOutputMap)
      .parents()
      .find("#_gram-range")
        .on('input', onGramChange)
      .parents()
      .find("#_rebound-range")
        .on('input', onReboundChange);

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
      if(configMap.stage.state.isStarting.reset < 360){
        configMap.stage.state.isStarting.reset += 2;
        mainCont.fillStyle = "#" //inner color
                            + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                            + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                            + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16));

        if(Math.floor(configMap.ball_state.gram / 5) >= 5){ //frame color
          mainCont.strokeStyle = "#000";
        } else {
          mainCont.strokeStyle = "#" + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                                    + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                                    + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16));
        }

        mainCont.lineWidth = 2;

        mainCont.beginPath();
        mainCont.arc(configMap.ball_state.X, configMap.ball_state.Y, configMap.ball_state.radius, 0, (Math.PI*2) * (configMap.stage.state.isStarting.reset / 360), false);
        mainCont.fill();
        mainCont.stroke();

        // draw goal
        mainCont.fillStyle = "#d00";
        mainCont.strokeStyle = "#500";
        mainCont.beginPath();
        mainCont.arc((configMap.stage.goal.col * configMap.block_size) + configMap.block_size / 2, (configMap.stage.goal.row * configMap.block_size) + configMap.block_size / 2, configMap.ball_state.radius, 0, (Math.PI*2) * (configMap.stage.state.isStarting.reset / 360), false);
        mainCont.fill();
        mainCont.stroke();
      } else {
        delete configMap.stage.state.isStarting.reset;
        delete configMap.stage.state.isStarting;
        clearInterval(configMap.stage.state.running);
        configMap.stage.state.running = setInterval(drawDisp, 30);
      }


    };

    // draw stage.map
    mainCont.lineWidth = 2;
    mainCont.lineJoin = "bavel";
    for(var i=0; i < configMap.stage.map.length; i++){
      for(var j=0; j < configMap.stage.map[i].length; j++){
        mainCont.fillStyle = "#" //inner color
                            + ((11 - configMap.stage.map[i][j]).toString(16))
                            + ((3 - Math.floor(configMap.stage.map[i][j] / 3)).toString(16))
                            + ((0).toString(16));



        if(configMap.stage.map[i][j] >= 1){

          if((configMap.stage.map[i][j]) >= 7){ //frame color
            mainCont.strokeStyle = "#000";
          } else {
            mainCont.strokeStyle = "#" + ((7 - (configMap.stage.map[i][j])).toString(16))
                                + ((2 - Math.floor(configMap.stage.map[i][j] / 3)).toString(16))
                                + ((0).toString(16));
          }

          mainCont.fillRect(j * configMap.block_size, i * configMap.block_size, configMap.block_size, configMap.block_size);
          // draw flame
          mainCont.beginPath();
          mainCont.moveTo(j * configMap.block_size, i * configMap.block_size);
          if(i > 0 && configMap.stage.map[i-1][j] != configMap.stage.map[i][j])mainCont.lineTo((j * configMap.block_size) + configMap.block_size, (i * configMap.block_size));
          else mainCont.moveTo((j * configMap.block_size) + configMap.block_size, (i * configMap.block_size));
          if(j < configMap.stage.map[i].length-1 && configMap.stage.map[i][j+1] != configMap.stage.map[i][j])mainCont.lineTo((j * configMap.block_size) + configMap.block_size, (i * configMap.block_size) + configMap.block_size);
          else mainCont.moveTo((j * configMap.block_size) + configMap.block_size, (i * configMap.block_size) + configMap.block_size);
          if(i < configMap.stage.map.length-1 && configMap.stage.map[i+1][j] != configMap.stage.map[i][j])mainCont.lineTo((j * configMap.block_size), (i * configMap.block_size) + configMap.block_size);
          else mainCont.moveTo((j * configMap.block_size), (i * configMap.block_size) + configMap.block_size);
          if(j > 0 && configMap.stage.map[i][j-1] != configMap.stage.map[i][j])mainCont.lineTo(j * configMap.block_size, i * configMap.block_size);
          mainCont.stroke();


        } else if(configMap.stage.map[i][j] < 0 && !configMap.stage.state.isStarting) {

          // draw Item
          //
          mainCont.lineWidth = 0.3;
          // Rebound+ item
          if(configMap.stage.map[i][j] >= -4){
            mainCont.font = "100 10px/10px 'Helvetica'";
            mainCont.textAlign = "center";
            mainCont.textBaseline = "bottom";
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12 + configMap.stage.map[i][j];

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + "3"
                                    + "3";

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + "3"
                                      + "3";
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }
            mainCont.strokeStyle = "#fff";

            mainCont.strokeText("B +", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 10);


          } else if(configMap.stage.map[i][j] == -5){

            //rebound- item
            mainCont.font = "100 8px/8px 'Helvetica'";
            mainCont.textAlign = "center";
            mainCont.textBaseline = "bottom";
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + "3"
                                    + "3"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + "3"
                                      + "3"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            mainCont.strokeStyle = "#fff";

            mainCont.strokeText("B -", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 10);

          } else if(configMap.stage.map[i][j] >= -10){

            //rebound- item
            mainCont.font = "100 8px/8px 'Helvetica'";
            mainCont.textAlign = "center";
            mainCont.textBaseline = "bottom";
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + "3"
                                    + "3";

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + "3"
                                      + "3";
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            mainCont.strokeStyle = "#fff";

            mainCont.strokeText("M +", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 10);

          }


          mainCont.strokeStyle = "#000";
          mainCont.textBaseline = "top";
          mainCont.fillText("◆", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + ( configMap.block_size / 2 ));
          mainCont.strokeText("◆", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + ( configMap.block_size / 2 ));


        }
      }
    }




    // draw ball
    if(configMap.stage.state.isStarting){
      if( !configMap.stage.state.isStarting.reset ){
        configMap.stage.state.isStarting.reset = 0;

      }
      reset();
    } else if(!configMap.stage.state.isStarting && configMap.stage.state.running){
      updateStatus();
      mainCont.fillStyle = "#" //inner color
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16));

      if(Math.floor(configMap.ball_state.gram / 5) >= 5){ //frame color
        mainCont.strokeStyle = "#000";
      } else {
        mainCont.strokeStyle = "#" + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                            + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                            + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16));
      }

      mainCont.lineWidth = 2;

      mainCont.beginPath();
      mainCont.arc(configMap.ball_state.X, configMap.ball_state.Y, configMap.ball_state.radius, 0, Math.PI*2, true);
      mainCont.fill();
      mainCont.stroke();

      // draw goal
      mainCont.fillStyle = "#d00";
      mainCont.strokeStyle = "#500";
      mainCont.beginPath();
      mainCont.arc((configMap.stage.goal.col * configMap.block_size) + configMap.block_size / 2, (configMap.stage.goal.row * configMap.block_size) + configMap.block_size / 2, configMap.ball_state.radius, 0, Math.PI*2, true);
      mainCont.fill();
      mainCont.stroke();


    }




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
            main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage);
            gameStart();
          }
        });

    // 要素の追加
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

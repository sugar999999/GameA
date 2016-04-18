// main.model.js
// by Sugar999999

main.model = (function(){

  //
  // ------------------difine---------------------start
  //
  var configMap = {
    main_html: String()
      + '<div id=\"header\">- SPIN MAZE RUNNER -<\/div>'
      + '<div id=\"main-disp\">'
        + '<div id=\"main-disp-direction\"><div id="nowStage"><\/div>'
        + '<\/div><canvas id=\"main-disp-window\"><\/canvas>'
        + '<input type=\"range\" id=\"rad-range\" max=\"270\" min=\"-270\" value=\"0\" step=\"1\"><\/input>'
        + '<div id=\"main-disp-status\"><\/div>'
      + '<\/div>'
      + '<div id=\"footer\">Copyright by Sugar999<\/div>'
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
        + '<div id=\"disp-rad-range\">rad-range: '
          + '<textarea id=\"output-rad-range\" rows=\"1\" cols=\"3\">1<\/textarea>'
          + '<input type=\"range\" id=\"_rad-range\" max=\"90" min=\"1\" step=\"1\" value=\"1\"><\/input>'
        + '<\/div>'
        + '<div id=\"disp-rad-max-range\">rad-max: '
          + '<textarea id=\"output-rad-max\" rows=\"1\" cols=\"3\">270<\/textarea>'
          + '<input type=\"range\" id=\"_rad-max\" max=\"360" min=\"135\" step=\"45\" value=\"270\"><\/input>'
          + 'turnMode: <input type=\"checkbox\" id=\"_turnMode\"><\/input>'
        + '<\/div>'
        // testplaytools-------------------------end
      + '<\/div>',

    goal_html: String()
      + '<div id=\"goal-effect\">'
      + '<\/div>',

    gameStart_html: String()
      + '<div id=\"gameStart-effect\">'
      + '<\/div>',

    stageStart_html: String()
      + '<div id=\"stageStart-effect\">'
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
        row: 0,
        area: 0
      },
      state: {
        now_stage: 1,
        itemGcolor: {},
        now_area: 1
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
      hei: 352,
      rad_range: 1,
      rad_max: 270,
      mode: 0,
      power: 0
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
      gram: 0.5,
      powerX: 0,
      powerY: 0,
      rebound: 0.1,
      friction: .005
    },
    game_mode: null
  },


  initModule, drawDisp, nav, onMouseMove, onMouseClick,
  mainCanvas, style, mainCont, onRadChange, updateStatus,
  gameStart, warpArea, onRadSlideReset;

  //
  // ------------------difine---------------------end

  // ------------------uriAnchorManage---------------start
  //
  uriAnchorManage = function() {

    main.start.changeAnchorSchema('mode', configMap.game_mode);
    main.start.changeAnchorSchema('stage', configMap.stage.state.now_stage);
    main.start.changeAnchorSchema('area', configMap.stage.state.now_area);
    main.start.changeAnchorSchema('col', configMap.ball_state.col);
    main.start.changeAnchorSchema('row', configMap.ball_state.row);
    main.start.changeAnchorSchema('pass', configMap.stage.map.toString(16));

    main.start.changeAnchorPart({
      mode: configMap.game_mode,
      stage: configMap.stage.state.now_stage,
      area: configMap.stage.state.now_area,
      col: configMap.ball_state.col,
      row: configMap.ball_state.row,
      pass: configMap.stage.map.toString(16)
    });
  };
  //
  // ------------------uriAnchorManage---------------end

  // --------------------gameStart----------------------start
  //

  gameStart = function(){

    configMap.ball_state.speedX = 0;
    configMap.ball_state.speedY = 0;
    configMap.ball_state.X = (configMap.stage.start.col * configMap.block_size) + (configMap.block_size / 2);
    configMap.ball_state.Y = (configMap.stage.start.row * configMap.block_size) + (configMap.block_size / 2);
    configMap.ball_state.col = Math.floor(configMap.ball_state.X / configMap.block_size);
    configMap.ball_state.row = Math.floor(configMap.ball_state.Y / configMap.block_size);
    configMap.ball_state.gram = 0.5;
    configMap.ball_state.gravity = 9.8;
    configMap.ball_state.rebound = .1;
    configMap.ball_state.radius = 7;
    configMap.stage.state.isStarting = {};

    $("#nowStage").text("Stage " + configMap.stage.state.now_stage);

    $("#main")
      .append(configMap.stageStart_html)
      .find("#stageStart-effect")
      .text("Stage " + configMap.stage.state.now_stage)
      .animate({left: 50 + "%"}, {
        duration: "300",
        complete: function(){
          configMap.stage.state.isStarting.$effectContainer = $(this);
        }
      });
    $("#rad-range")
      .on('mouseup', onRadSlideReset)
      .on('input', onRadChange);

    configMap.stage.state.running = setInterval(drawDisp, 15);
    uriAnchorManage();
  };

  //
  // --------------------gameStart----------------------end

  // -------------------------goal-------------------------start
  //
  goal = function(){
    clearInterval(configMap.stage.state.running);
    delete configMap.stage.state.running;
    $("#rad-range").remove();
    if(configMap.disp_state.rad != 360 && configMap.disp_state.rad !== 0){

      if(configMap.disp_state.mode == 0) var $target = $("#main-disp-window");
      else var $target = $("#main-disp-direction");

        var dispreset = setInterval(function(){
          configMap.disp_state.rad++;
          $target //Window
          .css("transform", "rotate(" + configMap.disp_state.rad + "deg)");
          if(configMap.disp_state.rad == 360 || configMap.disp_state.rad === 0)clearInterval(dispreset);
        }, 3);
    }

    if(configMap.stage.state.now_stage < 2){ // stage 数
      $("#main")
        .find("#goal-effect")
        .text("Stage " + configMap.stage.state.now_stage +"\nCLEAR")
        .animate({left: 50 + "%"}, 300);

      $("#main-disp-window") //Window
        .animate({height: 0 + "px"}, 1000)
        .animate({width: 0 + "px" },{
          duration: "0",
          complete: function(){
            configMap.stage.state.now_stage++;
            main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage, 1);
            drawDisp();
            $(this) //Window
              .animate({width: configMap.disp_state.wid + "px"}, 0)
              .animate({height: configMap.disp_state.hei + "px" },{
                duration: "1000",
                complete: function(){
                  $("#goal-effect")
                    .animate({left: 150 + "%"}, {
                      duration: "300",
                      complete: function(){
                        $(this).remove();
                      }
                    });
                  $("#main-disp").append('<input type=\"range\" id=\"rad-range\" max=\"' + configMap.disp_state.rad_max + '\" min=\"-' + configMap.disp_state.rad_max + '\" value=\"0\" step=\"' + configMap.disp_state.rad_range + '\"></input>');
                  gameStart();
                }
              });

          }
        });
    } else {
      $("#main")
        .find("#goal-effect")
        .text("Stage " + configMap.stage.state.now_stage +"\nCLEAR")
        .animate({left: 50 + "%"}, 300);

      setTimeout(function(){
        $("#main")
          .find("#goal-effect")
          .html("<span>Congraturations!<\/span>\nAll Stage CLEAR")
          .animate({left: 50 + "%"}, 300);

        //全クリ後、更新するとタイトル画面に戻る処理
        //configmap.stage.state.allCrear = true;
        //uriAnchorManage();
      }, 2000);

    }


  };
  //
  // -----------------------goal-------------------------end

  // -----------------------warpArea-----------------------start
  //
  warpArea = function( no, direction ){
    clearInterval(configMap.stage.state.running);
    delete configMap.stage.state.running;
    if(direction == "U" || direction == "D")$("#main-disp-window").animate({height: 0 + "px"}, {
        duration: 10,
        complete: function(){
          main.stagelist.saveMap(configMap.stage, "_" + configMap.stage.state.now_stage, configMap.stage.state.now_area);
          main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage, no);
          drawDisp();
          $(this) //Window
            .animate({height: configMap.disp_state.hei + "px" },{
              duration: 10,
              complete: function(){
                configMap.stage.state.running = setInterval(drawDisp, 30);
                if(direction == "U")configMap.ball_state.Y = (Math.abs(configMap.ball_state.row - (configMap.stage.map.length)) * configMap.block_size) - (configMap.ball_state.radius + 1);
                else if(direction == "D")configMap.ball_state.Y = (Math.abs(configMap.ball_state.row - (configMap.stage.map.length-1)) * configMap.block_size) + (configMap.ball_state.radius + 1);


              }
            });

        }
      });
    else $("#main-disp-window").animate({width: 0 + "px" },{
        duration: 10,
        complete: function(){
          main.stagelist.saveMap(configMap.stage, "_" + configMap.stage.state.now_stage, configMap.stage.state.now_area);
          main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage, no);
          drawDisp();
          $(this) //Window
            .animate({width: configMap.disp_state.hei + "px" },{
              duration: 10,
              complete: function(){
                configMap.stage.state.running = setInterval(drawDisp, 30);
                if(direction == "L")configMap.ball_state.X = (Math.abs(configMap.ball_state.col - configMap.stage.map[0].length) * configMap.block_size) + (configMap.ball_state.radius + 1);
                else if(direction == "R")configMap.ball_state.X = (Math.abs(configMap.ball_state.col - (configMap.stage.map[0].length-1)) * configMap.block_size) - (configMap.ball_state.radius + 1);

              }
            });

        }
      });


  }
  //
  // -----------------------warpArea-----------------------end

  // --------------------updateStatus----------------------start
  //
  updateStatus = function(){

    // gram 有効数字修正
    configMap.ball_state.gram = Math.round(configMap.ball_state.gram * 10) / 10;

    // ボールの現在位置ブロックを算出
    configMap.ball_state.col = Math.floor(configMap.ball_state.X / configMap.block_size);
    configMap.ball_state.row = Math.floor(configMap.ball_state.Y / configMap.block_size);

    // ゴール判定
    if( configMap.stage.goal.area == configMap.stage.state.now_area && configMap.ball_state.col == configMap.stage.goal.col && configMap.ball_state.row == configMap.stage.goal.row && !configMap.stage.state.isStarting  ){
      goal();

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

      // Gram+ item
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -6){ // a little
        configMap.ball_state.gram += .5;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -7){ // middle
        configMap.ball_state.gram += 3.0;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -8){ // high
        configMap.ball_state.gram += 5.0;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      }else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -9){ // more high
        configMap.ball_state.gram += 10;
        if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;

      // Gravity change item
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -10){ // reverse
        configMap.ball_state.gravity *= -1;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -11){ // half
        configMap.ball_state.gravity /= 2;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -12){ // double
        configMap.ball_state.gravity *= 2;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;

      // radius change item
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -13){ // small
        configMap.ball_state.radius = 3;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -14){ // normal
        configMap.ball_state.radius = 7;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -15){ // big
        configMap.ball_state.radius = 9;
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;

      // gram burst
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -16){ // kg burst
        if(!configMap.ball_state.gram_burst){
          var _gram = configMap.ball_state.gram, gram = 0;
          configMap.ball_state.gram_burst = setInterval(function(){
            configMap.ball_state.gram += .1;
            if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
            gram += .1;
            if(gram >= 20){
              clearInterval(configMap.ball_state.gram_burst);
              configMap.ball_state.gram_burst = setInterval(function(){
                if(gram + _gram <= 60) configMap.ball_state.gram -= .1;
                gram -= .1;
                if(gram <= 0){
                  clearInterval(configMap.ball_state.gram_burst);
                  delete configMap.ball_state.gram_burst;
                }
              },15);
            }
          },15);
          configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
        }

      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -17){ // kg super burst
        if(!configMap.ball_state.gram_burst){
          var _gram = configMap.ball_state.gram, gram = 0;
          configMap.ball_state.gram_burst = setInterval(function(){
            configMap.ball_state.gram += .1;
            if(configMap.ball_state.gram > 60)configMap.ball_state.gram = 60;
            gram += .1;
            if(gram >= 40){
              clearInterval(configMap.ball_state.gram_burst);
              configMap.ball_state.gram_burst = setInterval(function(){
                if(gram + _gram <= 60) configMap.ball_state.gram -= .1;
                gram -= .1;
                if(gram <= 0){
                  clearInterval(configMap.ball_state.gram_burst);
                  delete configMap.ball_state.gram_burst;
                }
              },15);
            }
          },15);
          configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;
        }

      // clinging
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -18){ // clinging
        if(!configMap.ball_state.isClinging){
          configMap.ball_state.isClinging = setTimeout(function(){ delete configMap.ball_state.isClinging; } ,15000);

        } else {
          delete configMap.ball_state.isClinging;
          configMap.ball_state.isClinging = setTimeout(function(){ delete configMap.ball_state.isClinging; } ,15000);
        }

        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;

      // jet
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -19){ // Right
        clearInterval(configMap.ball_state.jet_right);
        delete configMap.ball_state.jet_right;
        configMap.ball_state.jet_right = setInterval(function(){
          configMap.ball_state.speedX = 999;
          configMap.ball_state.speedY = 0;
          configMap.ball_state.powerX = 4000 * configMap.ball_state.gram;
        }, 1);
        setTimeout(function(){
          clearInterval(configMap.ball_state.jet_right);
          delete configMap.ball_state.jet_right;
        }, 2000);
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;

      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -20){ // left
        clearInterval(configMap.ball_state.jet_left);
        delete configMap.ball_state.jet_left;
        configMap.ball_state.jet_left = setInterval(function(){
          configMap.ball_state.speedX = -999;
          configMap.ball_state.speedY = 0;
          configMap.ball_state.powerX = 4000 * configMap.ball_state.gram;
        }, 1);
        setTimeout(function(){
          clearInterval(configMap.ball_state.jet_left);
          delete configMap.ball_state.jet_left;
        }, 2000);
        configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] = 0;



    // Trap
      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -100){ // Right
        clearInterval(configMap.ball_state.jet_right);
        delete configMap.ball_state.jet_right;
        configMap.ball_state.jet_right = setInterval(function(){
          configMap.ball_state.speedX = 99;
          configMap.ball_state.speedY = 0;
          configMap.ball_state.powerX = 5000;
        }, 1);
        setTimeout(function(){
          clearInterval(configMap.ball_state.jet_right);
          delete configMap.ball_state.jet_right;
        }, 1500);

      } else if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] == -101){ // left
        clearInterval(configMap.ball_state.jet_left);
        delete configMap.ball_state.jet_left;
        configMap.ball_state.jet_left = setInterval(function(){
          configMap.ball_state.speedX = -99;
          configMap.ball_state.speedY = 0;
          configMap.ball_state.powerX = 5000;
        }, 1);
        setTimeout(function(){
          clearInterval(configMap.ball_state.jet_left);
          delete configMap.ball_state.jet_left;
        }, 1500);
      }


    }





    // ボールの位置更新
    // 下向きの重力に合わせてsin,cosを設定。（ball_state.X: speed（下向き） の sin, ball_state.Y: speed（下向き） の cos）
    configMap.ball_state.vx = configMap.ball_state.X;
    configMap.ball_state.vy = configMap.ball_state.Y;

    if(!configMap.ball_state.jumping){
      if(!configMap.ball_state.jet_left && !configMap.ball_state.jet_right){
        configMap.ball_state.speedX += Math.sin(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity * .07;
        configMap.ball_state.speedY += Math.cos(configMap.disp_state.rad * Math.PI / 180) * configMap.ball_state.gravity * .07;
      }
    } else delete configMap.ball_state.jumping;

    if(configMap.ball_state.speedX >= configMap.block_size / 2)configMap.ball_state.speedX = configMap.block_size / 2;
    else if(configMap.ball_state.speedX <= -(configMap.block_size / 2))configMap.ball_state.speedX = -configMap.block_size / 2;
    if(configMap.ball_state.speedY >= configMap.block_size / 2)configMap.ball_state.speedY = configMap.block_size / 2;
    else if(configMap.ball_state.speedY <= -(configMap.block_size / 2))configMap.ball_state.speedY = -configMap.block_size / 2;

    configMap.ball_state.vx += configMap.ball_state.speedX;
    configMap.ball_state.vy += configMap.ball_state.speedY;
    if(!configMap.ball_state.jet_right && !configMap.ball_state.jet_left){
      configMap.ball_state.powerX = Math.abs(configMap.ball_state.gram * configMap.ball_state.speedX) * (configMap.ball_state.radius / 2);
    }
    configMap.ball_state.powerY = Math.abs(configMap.ball_state.gram * configMap.ball_state.speedY) * (configMap.ball_state.radius / 2);

    // 「mainCanvas」からスケールアウトしないように値を調整。
    if(configMap.ball_state.vx < configMap.ball_state.radius){
      configMap.ball_state.vx = configMap.ball_state.radius;

      // area移動判定
      if( typeof configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] === 'string'){
        warpArea( Number(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col].slice(4)), "L" );
      }
      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }else if(configMap.ball_state.vx > mainCanvas.width - configMap.ball_state.radius){
      configMap.ball_state.vx = mainCanvas.width - configMap.ball_state.radius;


      // area移動判定
      if( typeof configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] === 'string'){
        warpArea( Number(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col].slice(4)), "R" );
      }
      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }
    if(configMap.ball_state.vy < configMap.ball_state.radius){
      configMap.ball_state.vy = configMap.ball_state.radius;


      // area移動判定
      if( typeof configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] === 'string'){
        warpArea( Number(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col].slice(4)), "U" );
      }
      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }else if(configMap.ball_state.vy > mainCanvas.height - configMap.ball_state.radius){
      configMap.ball_state.vy = mainCanvas.height - configMap.ball_state.radius;


      // area移動判定
      if( typeof configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col] === 'string'){
        warpArea( Number(configMap.stage.map[configMap.ball_state.row][configMap.ball_state.col].slice(4)), "D" );
      }
      // 壁に張り付く
      // configMap.ball_state.speedX = configMap.ball_state._speedX;
      // configMap.ball_state.speedY = configMap.ball_state._speedY;
    }

    // ブロックを通過しない判定
    // ボール輪郭360度がブロックの輪郭を超えようとした場合の処理
    for(var i = 0; i< 360; i++){

      // ボール先端（ボールのX,Y＋半径）の「Col」「Row」を算出
      configMap.ball_state._col = Math.floor((configMap.ball_state.vx + (Math.cos(i * Math.PI / 180) * (configMap.ball_state.radius))) / configMap.block_size);
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
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] >= 1 ){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size;
          configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * (configMap.ball_state.radius));

          configMap.ball_state.isOnWall[1] = true;

          // ブロック破壊判定　横
          if(configMap.ball_state._col != configMap.stage.map[configMap.ball_state.row].length-1){
            if(configMap.ball_state.powerX > configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col]*configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] * configMap.block_size){
              if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 5;
              } else configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 1;

              if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] = 0;
            }
          }

          if(configMap.ball_state.isClinging){
          // 壁に張り付く
            configMap.ball_state.speedX = configMap.ball_state._speedX;
            configMap.ball_state.speedY = configMap.ball_state._speedY;
          }

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
              if(configMap.ball_state._col != configMap.stage.map[configMap.ball_state.row].length-1){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
              if(configMap.ball_state._col != configMap.stage.map[configMap.ball_state.row].length-1){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180) )) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col]* configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
              }

            }
          }
        }
      }
      if(configMap.ball_state._col < configMap.ball_state.col){ //left
        if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] >= 1){
          configMap.ball_state.vx = configMap.ball_state._col * configMap.block_size + configMap.block_size;
          configMap.ball_state.vx -= (Math.cos(i * Math.PI / 180) * (configMap.ball_state.radius - .01));
          configMap.ball_state.isOnWall[3] = true;

          // ブロック破壊判定　横
          if(configMap.ball_state._col !== 0){
            if(configMap.ball_state.powerX > configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] * configMap.block_size){
              if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 5;
              } else configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] -= 1;
              if(configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state.row][configMap.ball_state._col] = 0;
            }
          }

          if(configMap.ball_state.isClinging){
          // 壁に張り付く
            configMap.ball_state.speedX = configMap.ball_state._speedX;
            configMap.ball_state.speedY = configMap.ball_state._speedY;
          }

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
              if(configMap.ball_state._col !== 0){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
              if(configMap.ball_state._col !== 0){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
          if(configMap.ball_state._row != configMap.stage.map.length-1){
            if(configMap.ball_state.powerY > configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] * configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] * configMap.block_size){
              if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 5;
              } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 1;
              if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] = 0;
            }
          }

          if(configMap.ball_state.isClinging){
          // 壁に張り付く
            configMap.ball_state.speedX = configMap.ball_state._speedX;
            configMap.ball_state.speedY = configMap.ball_state._speedY;
          }

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
              if(configMap.ball_state._row != configMap.stage.map.length-1){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
              if(configMap.ball_state._row != configMap.stage.map.length-1){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
          if(configMap.ball_state._row !== 0){
            if(configMap.ball_state.powerY > configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] * configMap.block_size){
              if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 5;
              } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] -= 1;
              if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state.col] = 0;
            }
          }

          if(configMap.ball_state.isClinging){
          // 壁に張り付く
            configMap.ball_state.speedX = configMap.ball_state._speedX;
            configMap.ball_state.speedY = configMap.ball_state._speedY;
          }


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
              if(configMap.ball_state._row !== 0){
                if(( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
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
              if(configMap.ball_state._row !== 0){
                if( ( configMap.ball_state.powerX * (Math.cos(i * Math.PI / 180)) + configMap.ball_state.powerY * (Math.cos(i * Math.PI / 180)) ) > configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] *configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] * configMap.block_size){
                  if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
                    configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 5;
                  } else configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] -= 1;
                  if(configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] < 0)configMap.stage.map[configMap.ball_state._row][configMap.ball_state._col] = 0;
                }
              }

            }
          }
        }
      }

    }



    if( configMap.ball_state.isOnWall[0] || configMap.ball_state.isOnWall[2] ){




      if( configMap.ball_state.isOnWall[0] && configMap.ball_state.X > mainCanvas.width / 2){
        if(configMap.disp_state.power > 15){ //右回転
          configMap.ball_state.speedY += configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if( configMap.ball_state.isOnWall[0] && configMap.ball_state.X < mainCanvas.width / 2) {
        if(configMap.disp_state.power < -15){ //左回転
          configMap.ball_state.speedY += -configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if( configMap.ball_state.isOnWall[2] && configMap.ball_state.X < mainCanvas.width / 2){
        if(configMap.disp_state.power > 15){ //右回転
          configMap.ball_state.speedY += -configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if( configMap.ball_state.isOnWall[2] && configMap.ball_state.X > mainCanvas.width / 2) {
        if(configMap.disp_state.power < -15){ //左回転
          configMap.ball_state.speedY += configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }

      if(!configMap.ball_state.jumping){
        if(!configMap.ball_state.isClinging){
          // 跳ね返り
          configMap.ball_state.speedY *= -(configMap.ball_state.rebound);
          if(configMap.ball_state.rebound > 0.5)configMap.ball_state.rebound -= .01
        }

      }

      // 摩擦
      if(configMap.ball_state.speedX > 0){
        configMap.ball_state.speedX -= configMap.ball_state.friction;
        if(configMap.ball_state.speedX < 0)configMap.ball_state.speedX = 0;
      } else if(configMap.ball_state.speedX < 0){
        configMap.ball_state.speedX += configMap.ball_state.friction;
        if(configMap.ball_state.speedX > 0)configMap.ball_state.speedX = 0;
      }

    }
    if( configMap.ball_state.isOnWall[1] || configMap.ball_state.isOnWall[3] ){



      if(configMap.ball_state.isOnWall[3]　&& configMap.ball_state.Y < mainCanvas.height / 2){
        if(configMap.disp_state.power > 15){ //右回転
          configMap.ball_state.speedX += configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if(configMap.ball_state.isOnWall[3] && configMap.ball_state.Y > mainCanvas.height / 2) {
        if(configMap.disp_state.power < -15){ //左回転
          configMap.ball_state.speedX += -configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if(configMap.ball_state.isOnWall[1]　&& configMap.ball_state.Y < mainCanvas.height / 2){
        if(configMap.disp_state.power < -15){ //左回転
          configMap.ball_state.speedX += configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }
      if(configMap.ball_state.isOnWall[1] && configMap.ball_state.Y > mainCanvas.height / 2) {
        if(configMap.disp_state.power > 15){ //右回転
          configMap.ball_state.speedX += -configMap.disp_state.power * ( 1 - configMap.ball_state.gram * .01 );
          configMap.ball_state.jumping = true;
        }
      }

      if(!configMap.ball_state.jumping && Math.abs(configMap.ball_state.speedX) > 1){
        if(!configMap.ball_state.isClinging){
          // 跳ね返り
          configMap.ball_state.speedX *= -(configMap.ball_state.rebound);
          if(configMap.ball_state.rebound > 0.5)configMap.ball_state.rebound -= .01
        }

      }

      // 摩擦
      if(configMap.ball_state.speedY > 0){
        configMap.ball_state.speedY -= configMap.ball_state.friction;
        if(configMap.ball_state.speedY < 0)configMap.ball_state.speedY = 0;
      } else if(configMap.ball_state.speedY < 0){
        configMap.ball_state.speedY += configMap.ball_state.friction;
        if(configMap.ball_state.speedY > 0)configMap.ball_state.speedY = 0;
      }

    }


    //status 表示
    $("#main-disp-status")
      .html('<span>Weight: <\/span>' + configMap.ball_state.gram + '<br>')
      .append('<span>X: <\/span>' + Math.floor(configMap.ball_state.X) + '<br>')
      .append('<span>Y: <\/span>' + Math.floor(configMap.ball_state.Y) + '<br>')
      .append('<span>col: <\/span>' + configMap.ball_state.col + '<br>')
      .append('<span>row: <\/span>' + configMap.ball_state.row + '<br>')
      .append('<span>dispRad: <\/span>' + configMap.disp_state.rad + '<br>')
      .append('<span>dispPower: <\/span>' + configMap.disp_state.power + '<br>')
      .append('<span>isJumping: <\/span>' + configMap.ball_state.jumping + '<br>')
      .append('<span>isOnWall: <\/span>' + configMap.ball_state.isOnWall.toString() + '<br>');

    //Reset
    for(var i = 0; i < 4; i++)configMap.ball_state.isOnWall[i] = false;
    configMap.disp_state.power = 0;

    // ボールの位置を移動
    configMap.ball_state.X = configMap.ball_state.vx;
    configMap.ball_state.Y = configMap.ball_state.vy;

  };

  //
  // --------------------updateStatus----------------------end

  // --------------------nav----------------------start
  //
  nav = function( $container ){
    var onOutputMap, onGramChange, onReboundChange,
    onDispRadMaxChange, onDispRadRangeChange, navExtend, changeMode;

    // -----------navExtend-------------start
    //
    navExtend = function(e){
      var pos = $(this).css("bottom");

      if(configMap.stage.state.isStarting)return false;

      if(pos == "0px"){
        $(this).animate({bottom: -45 + "%"},30);
        clearInterval(configMap.stage.state.running);
        if(configMap.game_mode == 'game')configMap.stage.state.running = setInterval(drawDisp, 30);
      }else{
        clearInterval(configMap.stage.state.running);
        delete configMap.stage.state.running;
        $(this).animate({bottom: 0 + "px"},30);
      }


    };

    //
    // -----------navExtend-------------end

    // -----------onOutputMap------------start
    // 「configMap.stage.map」を配列表示で出力する。
    //
    onOutputMap = function(e){
      var $output =
      $(this)
        .append('<div><textarea id="output-map-text" rows=\"16\" cols=\"36\"><\/textarea><\/div>')
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

      return false;
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

      return false;
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

      return false;
    };
    //
    // --------onReboundChange----------end

    // -----------onDispRadRangeChange-------------start
    //
    onDispRadRangeChange = function(e) {
      configMap.disp_state.rad_range = $(this).val();
      $("#rad-range").remove();
      $("#main-disp").append('<input type=\"range\" id=\"rad-range\" max=\"' + configMap.disp_state.rad_max + '\" min=\"-' + configMap.disp_state.rad_max + '\" value=\"0\" step=\"' + configMap.disp_state.rad_range + '\"></input>');
      $("#rad-range").on('input', onRadChange);

      $(this)
        .parent()
        .find("#output-rad-range")
        .text(configMap.disp_state.rad_range);

      return false;
    };

    //
    // -----------onDispRadRangeChange-------------end

    // -----------onDispRadMaxChange-------------start
    //
    onDispRadMaxChange = function(e) {
      configMap.disp_state.rad_max = $(this).val();
      $("#rad-range").remove();
      $("#main-disp").append('<input type=\"range\" id=\"rad-range\" max=\"' + configMap.disp_state.rad_max + '\" min=\"-' + configMap.disp_state.rad_max + '\" value=\"0\" step=\"' + configMap.disp_state.rad_range + '\"></input>');
      $("#rad-range").on('input', onRadChange);

      $(this)
        .parent()
        .find("#output-rad-max")
        .text(configMap.disp_state.rad_max);

      return false;
    };

    //
    // -----------onDispRadMaxChange-------------end

    // -----------changeMode---------------start
    //

    changeMode = function(e){
      if(configMap.disp_state.mode == 1){
        configMap.disp_state.mode = 0;
        $("#main-disp-direction").html('');
        $("#main-disp-direction").css("transform", "rotate(" + 0 + "deg)");
        $("#main-disp-window").css("transform", "rotate(" + configMap.disp_state.rad + "deg)");
      }else{
        configMap.disp_state.mode = 1;
        $("#main-disp-direction").html('<div id=\"TOP\">TOP<\/div>'
          + '<div id=\"LEFT\">LEFT<\/div>'
          + '<div id=\"RIGHT\">RIGHT<\/div>'
          + '<div id=\"BOTTOM\">▼<\/div>');
        $("#main-disp-window").css("transform", "rotate(" + 0 + "deg)");
        $("#main-disp-direction").css("transform", "rotate(" + configMap.disp_state.rad + "deg)");
      }

    };

    //
    // -----------changeMode---------------end

    $container
      .bind('click', navExtend)
      .find("#output-map")
        .bind('click', onOutputMap)
      .parents()
      .find("#_gram-range")
        .on('input', onGramChange)
      .parents()
      .find("#_rebound-range")
        .on('input', onReboundChange)
      .parents()
      .find("#_rad-range")
        .on('input', onDispRadRangeChange)
      .parents()
      .find("#_rad-max")
        .on('input', onDispRadMaxChange)
      .parents()
      .find("#_turnMode")
        .on('click', changeMode);

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

    // ステージスタート時の初回のみの演出
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
        if(configMap.stage.goal.area == configMap.stage.state.now_area){
          mainCont.fillStyle = "#d00";
          mainCont.strokeStyle = "#500";
          mainCont.beginPath();
          mainCont.arc((configMap.stage.goal.col * configMap.block_size) + configMap.block_size / 2, (configMap.stage.goal.row * configMap.block_size) + configMap.block_size / 2, configMap.ball_state.radius, 0, (Math.PI*2) * (configMap.stage.state.isStarting.reset / 360), false);
          mainCont.fill();
          mainCont.stroke();
        }
      } else {
        configMap.stage.state.isStarting.$effectContainer
          .animate({left: 150 + "%"}, {
            duration: "300",
            complete: function(){
              $(this).remove();
            }
          });
        delete configMap.stage.state.isStarting.reset;
        delete configMap.stage.state.isStarting.$effectContainer;
        delete configMap.stage.state.isStarting;
        clearInterval(configMap.stage.state.running);
        configMap.stage.state.running = setInterval(drawDisp, 30);
      }


    };

    // draw stage.map
    for(var i=0; i < configMap.stage.map.length; i++){
      for(var j=0; j < configMap.stage.map[i].length; j++){

        if( configMap.stage.map[i][j] >= 10){
          mainCont.fillStyle = "#610";

        }else if(configMap.stage.map[i][j] <= -100){
          mainCont.fillStyle = "#500";
        }else {
          mainCont.fillStyle = "#" //inner color
                              + ((11 - configMap.stage.map[i][j]).toString(16))
                              + ((3 - Math.floor(configMap.stage.map[i][j] / 3)).toString(16))
                              + ((0).toString(16));
        }


        if(configMap.stage.map[i][j] >= 1 || configMap.stage.map[i][j] <= -100){
          mainCont.lineWidth = 2;
          mainCont.lineJoin = "bavel";
          if((configMap.stage.map[i][j]) >= 7){ //frame color
            if( configMap.stage.map[i][j] == 99)mainCont.strokeStyle = "#300";
            else mainCont.strokeStyle = "#000";
          } else if( configMap.stage.map[i][j] <= -100 ){
            mainCont.strokeStyle = "transparent";
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

          if(configMap.stage.map[i][j] <= -100){
            mainCont.lineWidth = 0.3;
            mainCont.strokeStyle = "#fff";
            mainCont.font = "100 15px/15px 'Helvetica'";
            mainCont.textAlign = "center";
            mainCont.textBaseline = "middle";
            if(configMap.stage.map[i][j] == -100){
              mainCont.strokeText(">>", j * configMap.block_size + configMap.block_size / 2, i * configMap.block_size + configMap.block_size / 2);
            } else if(configMap.stage.map[i][j] == -101){
              mainCont.strokeText("<<", j * configMap.block_size + configMap.block_size / 2, i * configMap.block_size + configMap.block_size / 2);
            }
          }



        } else if(configMap.stage.map[i][j] < 0 && !configMap.stage.state.isStarting) {

          // draw Item
          //
          mainCont.lineWidth = 0.3;
          mainCont.strokeStyle = "#fff";
          mainCont.font = "100 10px/10px 'Helvetica'";
          mainCont.textAlign = "center";
          mainCont.textBaseline = "bottom";
          // Rebound+ item
          if(configMap.stage.map[i][j] >= -4){

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


            mainCont.strokeText("+≪|", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);


          } else if(configMap.stage.map[i][j] == -5){

            //rebound- item
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


            mainCont.strokeText("-≪|", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -9){

            //gram+ item
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


            mainCont.strokeText("+ kg", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -12){

            //gravity reverse item
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            if(configMap.stage.map[i][j] == -10)mainCont.strokeText("G↑↓", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            else if(configMap.stage.map[i][j] == -11)mainCont.strokeText("G↓/2", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            else if(configMap.stage.map[i][j] == -12)mainCont.strokeText("G↓x2", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -15){

            //radius change item
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            if(configMap.stage.map[i][j] == -13)mainCont.strokeText("●→S", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            else if(configMap.stage.map[i][j] == -14)mainCont.strokeText("●→M", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            else if(configMap.stage.map[i][j] == -15)mainCont.strokeText("●→L", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -17){

            //radius change item
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            if(configMap.stage.map[i][j] == -16)mainCont.strokeText("☆kg", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            if(configMap.stage.map[i][j] == -17)mainCont.strokeText("★kg", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -18){

            //radius change item
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            if(configMap.stage.map[i][j] == -18)mainCont.strokeText("○|>>", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

          } else if(configMap.stage.map[i][j] >= -20){

            //radius change item
            if(!configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]){
              configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] = 12;

              mainCont.fillStyle = "#"
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                    + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);

            } else {
              if(configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]] >= 1){
                configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]]--;

                mainCont.fillStyle = "#"
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16)
                                      + configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]].toString(16);
              } else {
                delete configMap.stage.state.itemGcolor["itemNo" + -configMap.stage.map[i][j]];
              }

            }

            if(configMap.stage.map[i][j] == -19)mainCont.strokeText("=>>", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            if(configMap.stage.map[i][j] == -20)mainCont.strokeText("<<=", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size);
            mainCont.strokeText("▼", j * configMap.block_size + ( configMap.block_size / 2 ), i * configMap.block_size + 11);

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
      if(configMap.ball_state.jet_right || configMap.ball_state.jet_left){
        mainCont.fillStyle = "#fff";
      }else if(Math.floor(configMap.ball_state.gram / 3) >= 12){ //frame color
        mainCont.fillStyle = "#700";
      } else if(Math.floor(configMap.ball_state.gram / 3) >= 10) {
        mainCont.fillStyle = "#620";
      } else {
      mainCont.fillStyle = "#" //inner color
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16))
                          + ((12 - Math.floor(configMap.ball_state.gram / 3)).toString(16));
      }

      if(Math.floor(configMap.ball_state.gram / 5) >= 5){ //frame color
        mainCont.strokeStyle = "#000";
      } else {
        mainCont.strokeStyle = "#" + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                            + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16))
                            + ((5 - Math.floor(configMap.ball_state.gram / 5)).toString(16));
      }

      if(configMap.ball_state.gram_burst)mainCont.strokeStyle = "#b00";
      else if(configMap.ball_state.isClinging)mainCont.strokeStyle = "#0b0";
      else if(configMap.ball_state.jet_right || configMap.ball_state.jet_left)mainCont.strokeStyle = "#fff";

      mainCont.lineWidth = 2;
      mainCont.lineJoin = "bavel";

      mainCont.beginPath();
      mainCont.arc(configMap.ball_state.X, configMap.ball_state.Y, configMap.ball_state.radius, 0, Math.PI*2, true);
      mainCont.fill();
      mainCont.stroke();
      if(configMap.ball_state.jet_right){
        mainCont.lineWidth = 4;
        mainCont.beginPath();
        mainCont.strokeStyle = "#eee"
        mainCont.arc(configMap.ball_state.X - configMap.ball_state.radius, configMap.ball_state.Y, configMap.ball_state.radius * 2, -Math.PI*4/6, Math.PI*4/6, false);
        mainCont.stroke();
        mainCont.lineWidth = 2;
      } else if(configMap.ball_state.jet_left){
        mainCont.lineWidth = 4;
        mainCont.beginPath();
        mainCont.strokeStyle = "#eee"
        mainCont.arc(configMap.ball_state.X - configMap.ball_state.radius, configMap.ball_state.Y, configMap.ball_state.radius * 2, -Math.PI*2/6, Math.PI*2/6, true);
        mainCont.stroke();
        mainCont.lineWidth = 2;
      }


      // draw goal
      if(configMap.stage.goal.area == configMap.stage.state.now_area){
        mainCont.fillStyle = "#d00";
        mainCont.strokeStyle = "#500";
        mainCont.beginPath();
        mainCont.arc((configMap.stage.goal.col * configMap.block_size) + configMap.block_size / 2, (configMap.stage.goal.row * configMap.block_size) + configMap.block_size / 2, configMap.ball_state.radius, 0, Math.PI*2, true);
        mainCont.fill();
        mainCont.stroke();

      }

    }

    //draw status
    $("#header")
      .html('<span>≪|</span>:' + Math.floor(configMap.ball_state.rebound*10*100)/100 + '%, <span>G↓</span> x' + Math.floor(configMap.ball_state.gravity/9.8 * 100) + '%, <span>kg</span>:' + Math.floor(configMap.ball_state.gram * 10)/10 +'kg');


  };

  //
  // ------------------------drawDisp--------------------------end

  // --------------------onRadChange----------------------start
  //
  onRadChange = function(e){
    //configMap.disp_state.power = configMap.disp_state.power - ($(this).val() - configMap.disp_state.rad) <= 0 ? $(this).val() - configMap.disp_state.rad : 0 ;
    configMap.disp_state.power = $(this).val() - configMap.disp_state.rad;
    configMap.disp_state.rad = $(this).val();
    if(configMap.disp_state.mode == 0){
      $("#main-disp-window").css("transform", "rotate(" + 1 * configMap.disp_state.rad + "deg)");
    }else{
      $("#main-disp-direction").css("transform", "rotate(" + -1 * configMap.disp_state.rad + "deg)");
    }

  };
  //
  // --------------------onRadChange----------------------start
  // -------------------onRadSlideReset-------------------start
  //
  onRadSlideReset = function(e){
    configMap.disp_state.power = 0 - $(this).val();
    configMap.disp_state.rad = 0;
    $(this)
      .val(configMap.disp_state.rad);

    if(configMap.disp_state.mode == 0){
      $("#main-disp-window").css("transform", "rotate(" + 1 * configMap.disp_state.rad + "deg)");
    }else{
      $("#main-disp-direction").css("transform", "rotate(" + -1 * configMap.disp_state.rad + "deg)");
    }

  };
  //
  // -------------------onRadSlideReset-------------------end

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
        uriAnchorManage();
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
    configMap.stage.map[configMap.mouse.row][configMap.mouse.col] = configMap.mouse.swit;
    drawDisp();
    uriAnchorManage();
  };
  //
  // --------------------onMouseClickCanvas----------------------end


  // --------------------initModule----------------------start
  //
  initModule = function($container, mode, stage, pass){

    var duration = 0, _passMap = [];

    configMap.stage.state.now_stage = stage;

    configMap.game_mode = mode;
    // メイン要素の描画
    if(configMap.stage.state.now_stage === 0 && configMap.game_mode == 'game'){
      duration = 1000;
      configMap.stage.state.now_stage = 1;
    }
    $container
      .html(configMap.main_html)
      .append(configMap.goal_html)
      .find("#header")
        .animate({width: 100 + "%"}, duration)
        .animate({height: 50 + "px"}, duration)
      .next() //Main
        .animate({width: 100 + "%"}, duration)
        .animate({height: 500 + "px"}, duration)
      .find("#main-disp-window") //Window
        .css("margin", (-configMap.disp_state.wid/2) + " 0 0 " + (-configMap.disp_state.wid/2) )
        .animate({width: configMap.disp_state.wid + "px"}, duration)
        .animate({height: configMap.disp_state.hei + "px" }, duration)
      .parents().find("#main-disp").next() //Footer
        .animate({width: 100 + "%"}, duration)
        .css("bottom","0")
        .animate({height: 100 + "px" }, {
          duration: duration,
          complete: function(){
            // エレメント取得
            mainCanvas = document.getElementById("main-disp-window");
            if(mode == 'game'){
              main.stagelist.mapMake(configMap.stage, "_" + configMap.stage.state.now_stage, 1);
              if(pass == configMap.stage.map.toString(16) || pass == null)gameStart();
              else return false;
            } else if(mode == 'edit'){

              if(pass != null){
                _passMap = pass.split(",");
                for(var i = 0; i < configMap.stage.map.length ; i++){
                  for(var j = 0; j < configMap.stage.map[i].length ; j++){
                    configMap.stage.map[i][j] = _passMap[i*configMap.stage.map[i].length + j];

                  }
                }
                drawDisp();
              }
              uriAnchorManage();
              $("#rad-range").remove();
              mainCanvas.addEventListener('mousemove', onMouseMoveCanvas, false);
              mainCanvas.addEventListener('mousedown', onMouseClickCanvas, false);
            }
          }
        });

    // 要素の追加
    nav( $("#nav") );




  };
  //
  // --------------------initModule----------------------end


  return {initModule: initModule};

}());

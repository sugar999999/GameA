// ReadMe.js
// by Sugar999999

var ReadMe = (function(){

  var configMap = {
    main_html: String()
      + '<div id=\"title\">SPIN MAZE RUNNNER<div>READ ME<\/div><\/div>'
      + '<div id=\"menu\"><div class=\"header\"> - MENU - <\/div>'
      + '<div class=\"menu\" id=\"menu-mokuteki\"> \>\> 目的  <\/div>'
      + '<div class=\"menu\" id=\"menu-sousa\"> \>\> 操作方法  <\/div>'
      + '<div class=\"menu\" id=\"menu-item\"> \>\> アイテム  <\/div>'
      + '<div id=\"credit\">ゲームの動作環境：<br>Google Chrome Version 49以降推奨<br><br>(C) 2016 Sugar999<\/div>'
      + '<\/div>'
      + '<div id=\"content\"><div class=\"header\"><\/div>'
      + '<div id=\"content-main\"><\/div>'
      + '<\/div>',
    content_mokuteki_html: String()
      + '<h1>・360度回転するダンジョンを操作してゴールを目指せ！<\/h1><hr><br>'
      + '<p>このゲームはボールを転がしてゴールを目指すシンプルなゲームです。<br>'
      + 'ボールにはステータスが存在し、アイテムを取ることによって各ステータス値を増減させることができます。<br>'
      + '各ステージは、クリアのためにステータスアップが必要な設計になっています。<br>'
      + 'アイテムを回収し、ボールを成長させながらゴールを目指してください。<\/p>'
      + '<hr><h1>・ゲーム画面解説<\/h1><center><table><tr><td>'
      + '・ボール：<img width="90%" src=\"./ReadMe/ball.png\"><\/td><td>'
      + '・ゴール：<img width="90%" src=\"./ReadMe/goal.png\"><\/td><\/tr><\/table><\/center><br>'
      + '・ステータス表示：<center><img height="50%" src=\"./ReadMe/status.png\"><\/center><br>'
      + '※上記のように数値で表示しているステータスの他に、「ボールの大きさ」など目に見えるステータスもあります。<br><br>'
      + '<h1>・ゲームのやり直し<\/h1><br>'
      + '<p>ブラウザ操作の「ページの更新（F5キー）」で現在のステージを最初からやり直せます。<br>'
      + 'アイテム回収順序のミスでクリア困難になった場合など、ページを更新してやり直しください。<\/p>',
    content_sousa_html: String()
      + '<h1>・操作方法について<\/h1><hr><br>'
      + '<p>操作方法について簡単にご説明いたします。<br>'
      + '必要な操作は1つだけです。「スライダーを動かす。」<br>'
      + 'これひとつだけでこのゲームのすべてを遊ぶことができます。<br>'
      + '<hr><\/p>'
      + '<h1>・回転方法<\/h1><center><img height="50%" src=\"./ReadMe/maindisp.png\"><\/center><br><br>'
      + '<p>上図のように、スライダーのつまみを左方向に動かせば、ダンジョンが左に傾きます。<br>'
      + '回転の限界は左右それぞれ270度回転までです。必要な場面で限界を迎えて回転できなくならないように、'
      + '現在のつまみの位置を見ながら、コンスタントにスライダーを中央にリセットしていくことをおすすめします。<br>'
      + 'なお、動かしたスライダーのつまみを離せば、自動的に角度0（スライダーの中央）までリセットされる仕組みになっています。<br><\/p>'
      + '<h1>・ブロックの破壊<\/h1><center>'
      + '<table><tr><td><img width="100%" src=\"./ReadMe/block1.png\"><\/td><td><img width="100%" src=\"./ReadMe/block2.png\"><\/td><\/tr><\/table>'
      + '<\/center><br><p>ブロックには強度が存在し、ボールのパワーがブロックの強度を上回れば、ブロックを破壊し、先に進むことができます。<br>'
      + 'ボールが持つパワーは、衝突時のボールのスピードと重さによって決まります。<br>ブロックの強度は色の濃さで判別可能です。<br>'
      + '今のボールの重さでそのブロックが破壊できるかどうか、体当たりして試してみてください。<\/p>'
      + '<h1>・遠心力でボールを弾く<\/h1><center><table><tr><td><img width="100%" src=\"./ReadMe/attack1.png\"><\/td><td><img width="100%" src=\"./ReadMe/attack2.png\"><\/td><\/tr><\/table>'
      + '<\/center><br><p>上図、左の状態からつまみを離すと、左への強い回転とともに、ダンジョンの傾きが0にリセットされます。<br>'
      + 'その勢いにより、ダンジョン外側で壁に密接して留まっていたボールが弾かれます。<br>'
      + 'これを利用して、通常の落下の勢いだけでは破壊しにくい位置にあるブロックを破壊することができます。<br><\/p>',
    content_item_html: String()
      + '<h1>・基本的なアイテム一覧<\/h1><hr><br>'
      + '<p>ここではこのゲームで登場する基本的なアイテムをご紹介します。<br>'
      + 'ここに載っていないアイテムもありますので、プレイヤーの皆さんが実際に拾ってみて<br>'
      + 'その効果を確かめてください。<br>'
      + '<hr><\/p>'
      + '重量UP：<img height="100px" src=\"./ReadMe/kg.png\"><br>'
      + '<p>ボールの重量が上昇します。<\/p>'
      + 'リバウンドUP：<img height="100px" src=\"./ReadMe/rebound.png\"><br>'
      + '<p>ボールの跳ね返り度が上昇します。　※<\/p>'
      + 'リバウンドDOWN：<img height="100px" src=\"./ReadMe/rebound-.png\"><br>'
      + '<p>ボールの跳ね返り度が減少します。<\/p>'
      + '重力2倍：<img height="100px" src=\"./ReadMe/gx2.png\"><br>'
      + '<p>重力が2倍になります。（落下の加速度が2倍）<\/p>'
      + '重力逆転：<img height="100px" src=\"./ReadMe/grev.png\"><br>'
      + '<p>重力が上下逆さまになります。<\/p>'
      + '重量バースト：<img height="100px" src=\"./ReadMe/kgburst.png\"><br>'
      + '<p>一定時間、ボールの重量が大幅に上昇します。<\/p>'
      + '<br><br><p>※ボールは50％以上の跳ね返り度を保持できません。跳ね返り度が50％を超えている場合、跳ね返るたびに跳ね返り度が減少します。<\/p>'
      + '',

  },
  stateMap = {},

  initModule, onMenuDisp, contentDisp;

  contentDisp = function(name){
    if(name == "mokuteki")$(".header","#content").html('THE PURPOSE<hr>');
    else if(name == "sousa")$(".header","#content").html('HOW TO PLAY<hr>');
    else if(name == "item")$(".header","#content").html('ITEM<hr>');

    $("#content-main")
      .animate({right: -100 + "%"}, {
        duration:"500",
        complete: function(){
          $(this)
            .html(configMap['content_' + name + '_html'])
            .animate({right: 0}, 500);
        }
      });

  };

  onMenuDisp = function(e){
    var name = $(this).attr("id");
    name = name.slice(5);
    if(!stateMap[name]){
      for(var a in stateMap){
        delete stateMap[a];
      }
      stateMap[name] = true;
      contentDisp(name);
    }

  };

  initModule = function( $container ){
    $container
      .html(configMap.main_html)
      .find("#content").find(".header").html('THE PURPOSE<hr>')
      .next().html(configMap['content_mokuteki_html'])
      .parents()
      .find("#menu")
      .children(".menu")
      .each(function(){
        $(this).bind('click', onMenuDisp);
      });

  };

  return {initModule: initModule};

}());

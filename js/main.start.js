// main.start.js
// by Sugar999999

main.start = (function(){

  var initModule;

  initModule = function($container){
    $container
      .append('<div id=\"header\">Game<\/div>')
      .append('<div id=\"main-disp\">Main<\/div>')
      .append('<div id=\"footer\">Footer<\/div>')
      .find("#header")
        .animate({width: 100 + "%"}, 1000)
        .animate({height: 50 + "px"}, 1000)
      .next() //Main
        .animate({width: 100 + "%"}, 1000)
        .animate({height: 500 + "px"}, 1000)
      .next() //Footer
        .animate({width: 100 + "%"}, 1000)
        .css("bottom","0")
        .animate({height: 100 + "px" }, 1000);

  };

  return {initModule: initModule};

}());

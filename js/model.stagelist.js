// model.stagelist.js
// by sugar999999

main.stagelist = (function () {

  var stage = {
    _1: {
      map:
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
    [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,1],
    [0,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1],
    [0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]],
      start: {
        col: 0,
        row: 0
      },
      goal: {
        col: 1,
        row: 9
      }
    }
  },

  mapmMake;


  mapMake = function( list, target ){
    for(var i = 0; i < list.map.length; i++){
      for(var j = 0; j < list.map[i].length; j++){
        list.map[i][j] = stage[target].map[i][j];
      }
    }
    list.start.col = stage[target].start.col;
    list.start.row = stage[target].start.row;
    list.goal.col = stage[target].goal.col;
    list.goal.row = stage[target].goal.row;
  };

  return{mapMake: mapMake};

}());

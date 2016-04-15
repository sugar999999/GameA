// main.start.js
// by Sugar999999

main.start = (function(){

  var configMap = {
    anchor_schema_map: {}
  },
  stateMap = {
    anchor_map: {},
    $container: null
  },

  initModule, onHashChange, copyAnchorMap, ChangeAnchorPart,
  changeAnchorSchema;


    //------------copyAnchorMap-------------start
    //
    copyAnchorMap = function(){
      return $.extend( true, {}, stateMap.anchor_map );
    };
    //
    //------------copyAnchorMap-------------end

    //------------changeAnchorSchema---------------start
    //
    changeAnchorSchema = function( name, val ){
      delete configMap.anchor_schema_map[name];
      configMap.anchor_schema_map[name] = {};
      configMap.anchor_schema_map[name][val] = true;

      $.uriAnchor.configModule({
        schema_map : configMap.anchor_schema_map
      });
    };

    //
    //------------changeAnchorSchema---------------end

    //------------changeAnchorPart-----------start
    //
    changeAnchorPart = function( arg_map ){
      var
        anchor_map_revise = copyAnchorMap(),
        bool_return = true,
        key_name, key_name_dep;

        KEYVAL:
        for ( key_name in arg_map ){
          if ( arg_map.hasOwnProperty( key_name ) ) {
            if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }

            anchor_map_revise[key_name] = arg_map[key_name];

            key_name_dep = '_' + key_name;
            if( arg_map[key_name_dep] ) {
              anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
            }
            else {
              delete anchor_map_revise[key_name_dep];
              delete anchor_map_revise['_s' + key_name_dep];
            }
          }
        }

        try{
          $.uriAnchor.setAnchor( anchor_map_revise );
        }
        catch ( error ){
          $.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
          bool_return = false;
        }

        return bool_return;
    };
    //
    //------------changeAnchorPart-----------end

    //-----------onHashChange----------------start
    //
    onHashChange = function( event ){
      var
        anchor_map_previous = copyAnchorMap(),
        anchor_map_proposed,
        _s_stage_previous, _s_stage_proposed,
        s_x_proposed = {};

      try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
      catch ( error ){
        $.uriAnchor.setAnchor( anchor_map_previous, null, true );
        return false;
      }
      stateMap.anchor_map = anchor_map_proposed;

      return false;
    };

    //
    //-----------onHashChange----------------end

  //-------------initModule----------------------start
  //
  initModule = function($container){

    $.uriAnchor.configModule({
      schema_map : configMap.anchor_schema_map
    });
    $(window)
      .bind( 'hashchange', onHashChange )
      .trigger( 'hashchange');

    var gameMode, editMode;

    gameMode = function(){
      main.model.initModule( $container, 'game', 0, null);
    };

    editMode = function(){
      main.model.initModule( $container, 'edit', 0, null);
    };

    if(!stateMap.anchor_map.mode || !stateMap.anchor_map.stage || !stateMap.anchor_map.area || !stateMap.anchor_map.pass){
      $container
        .html('<div id=\"title\">A MAZE IN BALL RUNNNIG<\/div><div id=\"title-menu\"><\/div>')
        .find("#title")
        .animate({height: 200 + "px"}, {
          duration: "1500",
          complete: function(){
            $(this)
              .next()
              .html('<span id=\"game\">GAME START<\/span><br><span id=\"edit\">EDIT MODE<\/span>')
              .find("#game")
              .bind('click', gameMode)
              .next().next()
              .bind('click', editMode)
              .parent()
              .css("height", "200px");

          }});
    } else {
      if(stateMap.anchor_map.mode == 'game') main.model.initModule( $container, 'game', Number(stateMap.anchor_map.stage), stateMap.anchor_map.pass);
      else if(stateMap.anchor_map.mode == 'edit') main.model.initModule( $container, 'edit', 0, stateMap.anchor_map.pass);
    }





  };
  //
  //-------------initModule----------------------end

  return {
    initModule: initModule,
    changeAnchorPart: changeAnchorPart,
    changeAnchorSchema: changeAnchorSchema
  };

}());

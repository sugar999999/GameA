// main.start.js
// by Sugar999999

main.start = (function(){

  var configMap = {
    anchor_schema_map: {

    }
  },
  stateMap = {
    anchor_map: {
      stageNo: 0,
      gram: 0,
      rebound: 0
    },
    $container: null
  },

  initModule, onHashChange, copyAnchorMap, ChangeAnchorPart;

  //------------copyAnchorMap-------------start
  //
  copyAnchorMap = function(){
    return $.extend( true, {}, stateMap.anchor_map );
  };
  //
  //------------copyAnchorMap-------------end

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
  onHashChange = function( e ){


  };

  //
  //-----------onHashChange----------------end

  //-------------initModule----------------------start
  //
  initModule = function($container){

    main.model.initModule( $container );

    $.uriAnchor.configModule({
      schema_map : configMap.anchor_schema_map
    });
    $(window)
      .bind( 'hashchange', onHashChange )
      .trigger( 'hashchange');
  };
  //
  //-------------initModule----------------------end

  return {initModule: initModule};

}());

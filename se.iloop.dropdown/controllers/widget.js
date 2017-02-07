
var args = arguments[0] || {};
var Rows = null;
var Styles = null;
var isExpanded = false;
var initialMessage = null;

function setRows(_rows){
  Rows = _rows;
  for (index = 0; index < Rows.length; ++index) {
    var row = Rows[index];
    _.extend(row, {
      'rowIndex': index,
      'styles': Styles.row || null
    })
    var rowController = Widget.createController('row', row)
    rowController.on('didClickRow', handleRowClick);
    $.container.add(rowController.getView());
  }
}

function handleRowClick(row){
    log('handleRowClick from widget.js')
    if(!isExpanded){
      isExpanded = !isExpanded;
      return expandMenu();
    }else{
      contractMenu();
    }
    isExpanded = !isExpanded;
    $.topRowTitle.text = row.title ? row.title : initialMessage;
    //Trigger the event set up in the containing controller and pass along the row.
    $.trigger('didClickRow', row);
}

function expandMenu(){
  $.container.animate({height: (Rows.length+1) * Styles.row.height, duration: 100});
}

function contractMenu(){
  // $.topRow.show();
  $.container.animate({height: Styles.row.height, duration: 100});
}

function setStyles(){
  $.container.width = Styles.row.width;
  $.container.height = Styles.row.height;
  $.topRow.height = Styles.row.height;
  $.topRow.width = Styles.row.width;
  if(Styles.dropdown){
    $.topRow.backgroundColor = Styles.dropdown.backgroundColor;
    $.topRowTitle.color = Styles.dropdown.color;
  }
}


$.topRow.addEventListener('click', handleRowClick);

//Expose contract function to be able to contract the menu from containing controller.
exports.contract = function(){
  contractMenu();
};

//Expose expand function to be able to expand the menu from containing controller.
exports.expand = function(){
  expandMenu();
};


exports.init = function (_config) {
  if(!_config){return Ti.API.error('Collapsible: Missing config');}
  if(!_config.rows){return Ti.API.error('Collapsible: Missing rows');}
  if(!_config.styles || !_config.styles.row || !_config.styles.row.width || !_config.styles.row.height){return Ti.API.error('Collapsible: Missing styles. Required minimum is. styles.row.width & styles.row.height');}
  Styles = _config.styles;
  setStyles();
  initialMessage = _config.initialMessage;
  $.topRowTitle.text = initialMessage;
  setRows(_config.rows);
};

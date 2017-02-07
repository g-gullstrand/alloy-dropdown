// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.title.text = args.title ? args.title : '';

if(args.styles){
  $.container.height = args.styles.height;
  $.container.backgroundColor = args.styles.backgroundColor;
  $.title.color = args.styles.color;
  $.title.font = args.styles.font;
}

function handleRowClick() {
  $.trigger('didClickRow', { title: args.title, index: args.rowIndex });
};

function setActiveColor(event) {
  if(args.styles){
    var selectionColor = args.styles.selectionColor || '#ccc'
  }
  this.setBackgroundColor(selectionColor);
}
function setDefaultColor(){
  if(args.styles){
    var backgroundColor = args.styles.backgroundColor || '#fff'
  }
  this.setBackgroundColor(backgroundColor);
}
$.container.addEventListener('click', handleRowClick);

$.container.addEventListener('touchstart', setActiveColor);
$.container.addEventListener('touchend', setDefaultColor);

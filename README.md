# alloy-dropdown
Appcelerator Alloy dropdown widget.

## Usage

1. Add the widget folder to your `app/widgets` folder 

2. Add the widget as a dependency in your `app/config.json`
    ```
    "dependencies": {
        "se.iloop.dropdown": "1.0"
    }
    ```
    
3. Create a view where you want the dorpdown menu. Make sure this view has style `layout: 'vertial' `
    Add the widget as a child of the view.
    
    ```
    <View class="container">
			<Widget id="collapsible" src="se.iloop.dropdown"></Widget>
			<Label id="sampleLabel">I will be pushed down</Label>
		</View>
    ```   
    
    ```
    ".container": {
      layout: "vertical",   //**Important**
      width: "80%",
      height: Titanium.UI.FILL
    }
    ```

4. In the containing controller file. Add the following methods to setup and customise the dropdown. Example setup:
  
  ```
  var rows = [
    {'title': 'Option 1'},
    {'title': 'Option 2'},
    {'title': 'Option 3'},
    {'title': 'Option 4'},
  ];

  function didClickRow(row) {
    // Do something with the value from the clicked option
    Ti.API.info(row) // Logs {title: 'tilteName', index: 3}
  }

  function init(){
    var config = {
      initialMessage: 'Please choose',
      rows: rows,
      styles: {
        dropdown: { // Optional 
          backgroundColor: '#e1e1e1',
          color: '#000'
        },
        row: {
          height: 40, 
          width: Ti.UI.FILL,
          backgroundColor: '#d87', // Optional 
          selectionColor: '#ddd', // Optional 
          color: '#fff', // Optional 
          font: { // Optional 
            fontSize: 16
          }
        }
      }
    }
    $.dropdown.init(config);
  }

  $.dropdown.on('didClickRow', didClickRow);

  $.win.addEventListener('open', init);

  ```

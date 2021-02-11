function(properties, context) {
    
 // console.log("checking for existing taggers/tributes")
 // console.log(window.taggers)
    
  if (properties.trigger_character === null) {
      console.error("Set a Trigger character to use the Setup mentions action. This is the character that a user types in the input to trigger the dropdown list of mentions to appear, like @ or #. We've selected @ as a default trigger.")
      properties.trigger_character = '@';
  }
    
  if (properties.KeysToType === null ||
      properties.ValuesToDisplay === null) {
      if (properties.KeysToType === null) {
          console.error("Add a list to the \"When user selects...\" field to use the Setup mentions action. This is the list of texts displayed in the dropdown list of mentions, not the text that replaces the dropdown text.")
      }
      if (properties.ValuesToDisplay === null) {
          console.error("Add a list to the \"Replace with...\" field to use the Setup mentions action. This is the list of texts replaced when an option is selected, not the text that is displayed in the dropdown.")
      }
      return;
  }
    

  var attachTo = [];
  if(properties.attachToAll === "None") {
    attachTo = (properties.IdAttributes.split(',')).map(function (x) {
      return '#'+x.trim();
    });
  };
  if(properties.attachToAll === "Input") attachTo = ['input'];
  if(properties.attachToAll === "Multiline Input") attachTo = ['textarea'];
  //console.log(attachTo);

    var keyCollection = (properties.KeysToType.split(',')).map(function (x) {
        return x.trim();
    });
    //console.log(keyCollection);

    var valueCollection = (properties.ValuesToDisplay.split(',')).map(function (x) {
        return x.trim();
    });
    //console.log(valueCollection);

    var collection = keyCollection.map(function(key,num){
        return {key: key, value: valueCollection[num]};
    });
        
  attachTo.forEach(function(idOrHTMLTag) { // list of texts, like ['input'] or ['#input1','#input2']
    if (window.taggers[idOrHTMLTag + properties.trigger_character] === undefined) {
      var tribute = new Tribute({
        trigger: properties.trigger_character || '@',
        values: collection
      }); 
      tribute.attach($(idOrHTMLTag));
//      console.log('attached to '+ idOrHTMLTag); 
      window.taggers[idOrHTMLTag + properties.trigger_character] = tribute;
    }
    else {
//      console.log(typeof collection);
//      console.log(JSON.stringify(collection)); 
      window.taggers[idOrHTMLTag + properties.trigger_character].append(0,collection, true);
    }
  });
}
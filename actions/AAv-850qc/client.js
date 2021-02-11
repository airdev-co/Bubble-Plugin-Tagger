function(properties, context) {
    if (window.taggers !== undefined && 
        window.taggers !== {}) {
        
        var clear = [];
          if(properties.clearall === "None" &&
            properties.IdAttributes !== null &&
            properties.IdAttributes.trim() !== "") {
            clear = (properties.IdAttributes.split(',')).map(function (x) {
              return '#'+x.trim();
            });
          };
        if (properties.clearall !== "None") {
            if (properties.clearall === "Input") {
                clear.push('input');
            }
            if (properties.clearall === "Multiline Input") {
                clear.push('textarea');
            }
        }
        clear.forEach(function(idOrHTMLElement) {
            if (window.taggers[idOrHTMLElement + properties.trigger_character] !== undefined &&
                window.taggers[idOrHTMLElement + properties.trigger_character] !== null) {
                window.taggers[idOrHTMLElement + properties.trigger_character].detach($(idOrHTMLElement)); //clear the element/get rid of the listener
                delete window.taggers[idOrHTMLElement + properties.trigger_character];
            }
        });
    }
}
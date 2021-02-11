function(instance, context) {

	var emails = [];
    var urls = [];
    var hashtags = [];
    var mentions = [];
    var unprocessed = [];
  	var bbCodedText = null;

  
  	instance.publishState('emails',emails);
    instance.publishState('urls',urls);
    instance.publishState('hashtags',hashtags);
    instance.publishState('mentions',mentions);
    instance.publishState('linkifiedtext',null);
    instance.publishState('html_text',null);
    instance.publishState('bbcode',bbCodedText);

    
}
function(instance, properties, context) {
  
  	var emails = [];
    var urls = [];
    var hashtags = [];
    var mentions = [];
    var unprocessed = [];
  	var bbCodedText = null;
    
  if(properties.source==null) {
  try{
    instance.publishState('emails',emails);
    instance.publishState('urls',urls);
    instance.publishState('hashtags',hashtags);
    instance.publishState('mentions',mentions);
    instance.publishState('linkifiedtext',null);
    instance.publishState('html_text',null);
    instance.publishState('bbcode',bbCodedText);
  }catch (err) {
    instance.publishState('linkifiedtext',err.toString());
  }
  } else if(properties.source!==undefined) {
  try{
    //console.log(properties.source);
    //console.log(linkify.find('Any links to http://github.com here? If not, contact test@example.com'));
    var foundItems = linkify.find(properties.source);
    var prefix = {
      email: '[color='+properties.bbcode_link_color+']',
      url: '[color='+properties.bbcode_link_color+']',
      hashtag: '[color='+properties.bbcode_link_color+']',
      mention: '[color='+properties.bbcode_link_color+']'
    }
    //var bbCodedText = properties.source;
    var suffix = {
      email: '[/color]',
      url: '[/color]',
      hashtag: '[/color]',
      mention: '[/color]'
    }
    
    foundItems.forEach(function (listItem){
      if(listItem.type=='email') emails.push(listItem.value);
      else if(listItem.type=='url') urls.push(listItem.value);
      else if(listItem.type=='hashtag') hashtags.push(listItem.value);
      else if(listItem.type=='mention') mentions.push(listItem.value);
      else unprocessed.push(listItem);
    });
  	instance.publishState('emails',emails);
    instance.publishState('urls',urls);
    instance.publishState('hashtags',hashtags);
    instance.publishState('mentions',mentions);
    instance.publishState('linkifiedtext',JSON.stringify(unprocessed));
    var linkifiedHTML = linkifyHtml(properties.source);
    instance.publishState('html_text',linkifiedHTML);
    
    //emails.forEach()
    
    //function addPrefixSuffix(text)
    //bbCodedText = replaceAll(bbCodedText,listItem.value,prefix['email']+listItem.value+suffix['email']);  

    var sourceText = replaceAll(linkifiedHTML,'\n','-linebreak-');
    bbCodedText = htmlToBBCode(sourceText);
    bbCodedText = replaceAll(bbCodedText,'[url','[color='+properties.bbcode_link_color+'][url');
    bbCodedText = replaceAll(bbCodedText,'[/url]','[/url][/color]');
    bbCodedText = replaceAll(bbCodedText,'-linebreak-','\n');
    //console.log(bbCodedText);
    instance.publishState('bbcode',bbCodedText);
  }catch (err) {
    instance.publishState('linkifiedtext',err.toString());
  }
       
   function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   }
    
   function replaceAll(str, term, replacement) {
 	 return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
	}
    
   function htmlToBBCode (html) {

  	html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "[code]$2[/code]");

	html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n[h]$2[/h]\n");

	//paragraph handling:
	//- if a paragraph opens on the same line as another one closes, insert an extra blank line
	//- opening tag becomes two line breaks
	//- closing tags are just removed
	// html += html.replace(/<\/p><p/<\/p>\n<p/gi;
	// html += html.replace(/<p[^>]*>/\n\n/gi;
	// html += html.replace(/<\/p>//gi;

	html = html.replace(/<br(.*?)>/gi, "\n");
	html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\[code]$2\[\/code]");
	html = html.replace(/<b>/gi, "[b]");
	html = html.replace(/<i>/gi, "[i]");
	html = html.replace(/<u>/gi, "[u]");
	html = html.replace(/<\/b>/gi, "[/b]");
	html = html.replace(/<\/i>/gi, "[/i]");
	html = html.replace(/<\/u>/gi, "[/u]");
	html = html.replace(/<em>/gi, "[b]");
	html = html.replace(/<\/em>/gi, "[/b]");
	html = html.replace(/<strong>/gi, "[b]");
	html = html.replace(/<\/strong>/gi, "[/b]");
	html = html.replace(/<cite>/gi, "[i]");
	html = html.replace(/<\/cite>/gi, "[/i]");
	html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
	html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
	html = html.replace(/<link(.*?)>/gi, "");
	html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "[*]$2");
	html = html.replace(/<ul(.*?)>/gi, "[list]");
	html = html.replace(/<\/ul>/gi, "[/list]");
	html = html.replace(/<div>/gi, "\n");
	html = html.replace(/<\/div>/gi, "\n");
	html = html.replace(/<td(.*?)>/gi, " ");
	html = html.replace(/<tr(.*?)>/gi, "\n");

	html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "[img]$2[/img]");
	html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "[url=$2]$4[/url]");

	html = html.replace(/<head>(.*?)<\/head>/gmi, "");
	html = html.replace(/<object>(.*?)<\/object>/gmi, "");
	html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
	html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
	html = html.replace(/<title>(.*?)<\/title>/gmi, "");
	html = html.replace(/<!--(.*?)-->/gmi, "\n");

	html = html.replace(/\/\//gi, "/");
	html = html.replace(/http:\//gi, "http://");

	html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
	html = html.replace(/\r\r/gi, ""); 
	html = html.replace(/\[img]\//gi, "[img]");
	html = html.replace(/\[url=\//gi, "[url=");

	html = html.replace(/(\S)\n/gi, "$1 ");

	return html;
}
}
}
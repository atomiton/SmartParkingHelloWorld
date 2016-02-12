/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.add('formatplugin',
{
    init: function (editor) {
        var pluginName = 'formatplugin';
        editor.ui.addButton('Formatplugin',
            {
                label: 'Format Json',
                command: 'OpenWindow',
                icon: CKEDITOR.plugins.getPath('newplugin')// + 'mybuttonicon.gif'
            });
        var cmd = editor.addCommand('OpenWindow', { exec: showMyDialog });
    }
});
CKEDITOR.plugins.add('nextplugin',
    {
        init: function (editor) {
            var pluginName = 'nextplugin';
            editor.ui.addButton('Nextplugin',
                {
                    label: 'Next',
                    command: 'NextJson',
                    icon: CKEDITOR.plugins.getPath('newplugin')// + 'mybuttonicon.gif'
                });
            var cmd = editor.addCommand('NextJson', { exec: nextData });
           // CKEDITOR.instances.yourEditorInstance.commands.NextJson.disable();
        }
    });

CKEDITOR.on("instanceReady", function(editor,event)
{

    editor.editor.getCommand('NextJson').setState(CKEDITOR.TRISTATE_DISABLED);
    //$( "#cke_14" )[0].setAttribute('aria-disabled', true);
});
function repeat(s, count) {
    return new Array(count + 1).join(s);
}

function formatJson(json) {
    var i           = 0,
        il          = 0,
        tab         = "&nbsp;&nbsp;&nbsp;",
        newJson     = "",
        indentLevel = 0,
        inString    = false,
        currentChar = null;

    for (i = 0, il = json.length; i < il; i += 1) {
        currentChar = json.charAt(i);

        switch (currentChar) {
            case '{':
            case '[':
                if (!inString) {
                    newJson += currentChar + "</br>" + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    newJson += currentChar;
                }
                break;
            case '}':
            case ']':
                if (!inString) {
                    indentLevel -= 1;
                    newJson += "</br>" + repeat(tab, indentLevel) + currentChar;
                } else {
                    newJson += currentChar;
                }
                break;
            case ',':
                if (!inString) {
                    newJson += ",</br>" + repeat(tab, indentLevel);
                } else {
                    newJson += currentChar;
                }
                break;
            case ':':
                if (!inString) {
                    newJson += ": ";
                } else {
                    newJson += currentChar;
                }
                break;
            case ' ':
            case "\n":
               // newJson=newJson;
            case "\t":
                if (inString) {
                    newJson += currentChar;
                }
                break;
            case '"':
                if (i > 0 && json.charAt(i - 1) !== '\\') {
                    inString = !inString;
                }
                newJson += currentChar;
                break;
            default:
                newJson += currentChar;
                break;
        }
    }

    return newJson;
}

function showMyDialog(e) {
	
	var  htmlToPlaintext = function(text) {
		  return String(text).replace(/<[^>]+>/gm, '');
		}
	var data = e.getData();
	data = htmlToPlaintext(data)
//	alert(data);
    //e.setData("test");
    if(data!='')
    {
        //data = JSON.parse(data);
        console.log(formatJson(Encoder.htmlDecode(data)));
        try{
        	JSON.parse(Encoder.htmlDecode(data));
        	e.setData(formatJson(Encoder.htmlDecode(data)));
        }catch(e){
        	return;
        }
        //e.insertHtml(formatJson(Encoder.htmlDecode(data)));
        //e.setData(JSON.stringify(data,null,"  "));
        //data = JSON.parse(data);
        //e.insertHtml(Encoder.htmlEncode(JSON.stringify(data,null,"  ")));
    }


	//e.setData("test");

	console.log(JSON.stringify(data,null," "));
}


function nextData(e){
    var  htmlToPlaintext = function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    }
   // var apis=TQL.URL.getTutorialApiArray();
   // var i=angular.element(document.getElementById("homecontrollerid")).scope().getNextAPICount();
    //* if(i+1 <= apis.length){
        angular.element(document.getElementById("homecontrollerid")).scope().runAjax();
    //}
    /*else{
        angular.element(document.getElementById("homecontrollerid")).scope().set404Text();
    }*/

}
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	
	config.extraPlugins = 'formatplugin,nextplugin,syntaxhighlight';

	// Se the most common block elements.
	//config.format_tags = 'p;h1;h2;h3;pre';
    config.format_tags = 'pre';

	// Make dialogs simpler.
	config.removeDialogTabs = 'image:advanced;link:advanced';
//	config.toolbar = 'MyToolbar';
    config.removePlugins = 'elementspath';
    config.resize_enabled = false;
    config.forcePasteAsPlainText = true;
};

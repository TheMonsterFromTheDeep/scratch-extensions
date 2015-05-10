﻿//MFD Complete: TheMonsterFromTheDeep Complete
//Uses hax in order to organize multiple extensions under multiple categories

var MFD = 
{
	loadedExtensions: [],
	message: "No loaded extensions",
	status: 0,
	updateMessage: function() { 
		var newMsg = "No loaded extensions";
		this.status = 0;
		var empty = true; 
		for (var i = 0; i < this.loadedExtensions.length; i++) { 
			if(this.loadedExtensions[i] != "unloaded")
			{
				if(empty)
				{
					empty = false;
					newMsg = "Loaded extensions: " + this.loadedExtensions[i];
					this.status = 2; 
				}
				else
				{
					newMsg += ", " + this.loadedExtensions[i];
				}
			}
		}
		this.message = newMsg;
	},
	loadExtension: function(name) { this.loadedExtensions[this.loadedExtensions.length] = name; this.updateMessage(); },
	unloadExtension: function(name) { for(var i = 0; i < this.loadedExtensions.length; i++) { if(this.loadedExtensions[i] == name) { this.loadedExtensions[i] = "unloaded"; } } this.updateMessage(); }
};

(function(ext) { ext._shutdown = function() {};
ext._getStatus = function() { return {status: MFD.status, msg: MFD.message }; }; //This extension is essentially a blank extension built in order to provide the text seperator
var descriptor = {blocks: []}; ScratchExtensions.register('MFD Complete Extension', descriptor, ext); })({});



//MFD: Internetting
//Includes functions for HTTP requests & linking to other projects
(function(ext) { 
	var extName = 'MFD: Internetting';
	ext._shutdown = function() { MFD.unloadExtension(extName); };
	ext._getStatus = function() { return {status: 2, msg: 'Ready'}; };

	var confirmWindowOpen = false;

	var myCSS="#scratch { z-index: 0; } #MFDConfirmationContainer { position: absolute; top: 0px; left: 0px; z-index: 2; width: 100%; height: 100%; } #MFDConfirmationWindow { width: 600px; padding: 6px 20px; background-color: #fff; border: solid #fff 1px; border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; margin: 10px auto 0 auto; }";

	function generateExtraCSS()
	{
		var s = document.createElement("style");
		s.appendChild(document.createTextNode(myCSS));
		document.head.appendChild(s);
	}
	
	function generateConfirmWindow(id)
	{if(!confirmWindowOpen){
	
		var projectURL = "https://scratch.mit.edu/projects/" + id;
		var imgURL = "https://cdn2.scratch.mit.edu/get_image/project/" + id + "_480x360.png";
		
		var con = document.createElement("div");
		con.setAttribute("id", "MFDConfirmationContainer");
		document.body.appendChild(con);

		var w = document.createElement("div"); //Create the window
		w.setAttribute("id", "MFDConfirmationWindow");

		var image = document.createElement("img"); //Create a preview image of the project
		image.setAttribute("src", imgURL);
		w.appendChild(image);

		var link = document.createElement("a");
		link.setAttribute("href", projectURL);
		w.appendChild(link);

		con.appendChild(w);
	}}

	ext.openProject = function(id)
	{
		generateConfirmWindow(id);
	}

	var descriptor = {
		blocks: [
			[' ', 'open project id %n', 'openProject', '41391442'], //The default number will eventually point to a project about this extension
		]
	}; 

	ScratchExtensions.register(extName, descriptor, ext); //All the titles begin with "MFD:" in case other extensions with similar names are also used
	MFD.loadExtension(extName);
	generateExtraCSS();
})({});
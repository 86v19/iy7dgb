var element = document.getElementById("rive");
var bot = new RiveScript();

// Load an individual file.
bot.loadFile("testsuite.rive").then(loading_done).catch(loading_error);

// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multeeiple file names), the success function is called only when ALL
// the files have finished loading.
function loading_done() {
  element.setAttribute("placeholder","");
  element.value = "iy7dgb ";

  // Now the replies must be sorted!
  bot.sortReplies();

  // And now we're free to get a reply from the brain!
  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function(event) {
  // If the user presses the "End" key on the keyboard
  if (event.key === "End") {
    	event.preventDefault();
  	let username = "local-user";
	  	bot.reply(username, element.value).then(function(reply) {
		element.value = "";
      		element.value = text;
	  	});
	}
  }
}); 
  

// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  alert("Error when loading files: " + error);
}

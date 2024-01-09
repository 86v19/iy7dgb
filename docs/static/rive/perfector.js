/* RiveScript Playground
 * Perfector
 * This code is released under the GNU General Public License version 2.
 */
$(document).keyup(function(event) {
    if ($("#perfector").is(":focus") && event.key == "Enter") {
	    try {
		rs = new RiveScript({
				debug:   debugMode,
				onDebug: onDebug
			});
		
			// Load our files from the brain/ folder.
			rs.loadFile([
				"perfector/brain/begin.rive",
				"perfector/brain/admin.rive",
				"perfector/brain/clients.rive",
				"perfector/brain/eliza.rive",
				"perfector/brain/myself.rive",
				"perfector/brain/rpg.rive",
				"perfector/brain/javascript.rive"
			]).then(onReady).catch(onError);
		    
	 	var message = document.getElementById("perfector").value;
		document.getElementById("perfector").value = "";
		document.getElementById("perfector").value = rs.(message);
		} catch (error) {
			document.getElementById("perfector").value = "Fyi: " + error;
		setTimeout(() => {
  			document.getElementById("perfector").value = "I am awesome.";
		}, "6666");

		}
	setTimeout(() => {
  		document.getElementById("perfector").value = "I am awesome.";
	}, "6666");

});

/* RiveScript Playground
 * Perfector
 * This code is released under the GNU General Public License version 2.
 */
$(document).keyup(function(event) {
    if ($("#rive").is(":focus") && event.key == "Enter") {
	    try {
		rs = new RiveScript({
				debug:   debugMode,
				onDebug: onDebug
			});
		
			// Load our files from the brain/ folder.
			rs.loadFile([
				"begin.rive",
				"admin.rive",
				"clients.rive",
				"eliza.rive",
				"myself.rive",
				"rpg.rive",
				"javascript.rive"
			]).then(onReady).catch(onError);
	    }
    }
});

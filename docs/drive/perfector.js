/* RiveScript Playground
 * Perfector
 * This code is released under the GNU General Public License version 2.
 */
$(document).ready(function () {
	$("#perfector").attr("placeholder", "Hello world.");
}

$(document).keyup(function(event) {
    if ($("#perfector").is(":focus") && event.key == "Enter") {
	    try {
		let perfector = new RiveScript();
	 	var message = document.getElementById("perfector").value;
		document.getElementById("perfector").value = "";
		document.getElementById("perfector").value = perfector(message);
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

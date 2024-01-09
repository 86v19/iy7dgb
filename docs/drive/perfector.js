/* RiveScript Playground
 * Perfector
 * This code is released under the GNU General Public License version 2.
 */

// The RiveScript bot instance, on the window scope so it can be debugged.
window.rs = null;

$(document).ready(function () {
	$("#perfector").removeAttr("disabled");
	$("#perfector").attr("placeholder", "Hello World");
}

$(document).keyup(function(event) {
    if ($("#perfector").is(":focus") && event.key == "Enter") {
	var ok = false;
		if (isRunning) {
			ok = teardownBot();
		}
		else {
			ok = initBot();
			try {
				sendMessage();
			} catch (e) {
				window.alert(e);
			}
		}

		if (ok) {
			isRunning = !isRunning;
		}
    }
});

	// Code to initialize the bot when the Run button is clicked.
	function initBot() {
		// Get their source code.
		var code = $message.val();
		if (code.length === 0) {
			window.alert("You didn't enter any RiveScript code to run!");
			return false;
		}

		// Update DOM props.
		$btnRun.text("Stop running");
		$codeEditor.prop("disabled", true);
		$optUTF8.prop("disabled", true);
		$message.prop("disabled", false);
		$message.focus();

		// Reinitialize the history and debug output.
		$history.empty();
		$debugOut.empty();

		// Initialize the RiveScript bot.
		window.rs = new RiveScript({
			debug: $optDebug.prop("checked"),
			utf8: $optUTF8.prop("checked"),
			onDebug: onDebug
		});
		window.rs.setHandler("coffeescript", new RSCoffeeScript(window.rs));
		window.rs.setHandler("coffee", new RSCoffeeScript(window.rs));

		var hasErrors = false;
		window.rs.stream(code, function (error) {
			window.alert("Error in your RiveScript code:\n\n" + error);
			hasErrors = true;
		});

		if (hasErrors) {
			teardownBot();
			return false;
		}

		window.rs.sortReplies();

		return true;
	};

	// Handle the user sending a message to the running bot.
	async function sendMessage() {
		// Get their message.
		var text = $message.val();
		$message.val("");
		if (text.length === 0) {
			return;
		}

		if (window.rs === null) {
			// No bot? Weird.
			window.alert("Weird error: no RiveScript bot is currently active.");
			return;
		}


		// Add the user's message to the history.
		appendHistory("user", text);

		// Get the reply.
		// Save their original message as the uservar origMessage for
		// object macros to have access to.
		await window.rs.setUservar("web-user", "origMessage", text);
		window.rs.reply("web-user", text).then(onReply);
	};

	// Handle a reply being returned by the bot.
	function onReply(reply) {
		if (reply.indexOf("<noreply>") > -1) {
			return;
		}
		appendHistory("bot", reply);
	};

	// Code to tear the bot down when the user wants to edit the code some more.
	function teardownBot() {
		$btnRun.text("Run");
		$codeEditor.prop("disabled", false);
		$message.prop("disabled", true);
		$optUTF8.prop("disabled", false);
		$codeEditor.focus();

		window.rs = null;

		return true;
	};

	// Catch debug messages from the bot to add to the debug log.
	function onDebug(message) {
		if ($optDebug.prop("checked")) {
			$debugOut.append('<li>' + message + '</li>');
			$debugPanel.scrollTop($debugPanel[0].scrollHeight);
		}
	};

	// Add a history item (user or bot message) to the dialogue panel.
	function appendHistory(className, text) {
		$history.append('<li class="' + className + '">' + text.replaceAll("\n", "<br>") + '</li>');
		$historyPanel.animate({ scrollTop: $historyPanel[0].scrollHeight }, 1000);
	}
});

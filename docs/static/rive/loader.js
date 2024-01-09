$(document).ready(function() {
	const rs = new RiveScript();
	let re.bot .bot.setHandler("coffeescript", new RSCoffeeScript(window.bot));
		window.bot.stream(code, function(error) {
			window.alert("Error in your RiveScript code:\n\n" + error);
		});
		window.bot.sortReplies();

		// Reset the dialogue.
		$("#dialogue").empty();

		$("#chatModal").modal();
	});

	// Modal events
	$("#chatModal").on("shown.bs.modal", function() {
		$("#message").focus();
	});
	$("#chatModal").on("hidden.bs.modal", function() {
		// Unload the RiveScript bot to clean up memory.
		window.bot = null;
	});

	// The Enter key.
	$("#message").keydown(function(e) {
		if (e.keyCode == 13) {
			var $dialogue = $("#dialogue");
			var $message = $("#message");

			if (window.bot === null) {
				return; // No bot? Weird.
			}

			var message = $message.val();
			if (message.length == 0) {
				return;
			}

			// Echo the user immediately and clear their input.
			var $user = $("<div></div>");
			$user.html('<span class="try-user">User:</span> ' + message);
			$dialogue.append($user);
			$message.val("");

			// Fetch the reply.
			window.bot.reply("local-user", message).then(function(reply) {
				reply = reply.replace(new RegExp("\n", "g"), "<br>");

				// Update the dialogue.
				var $bot = $("<div></div>");
				$bot.html('<span class="try-bot">Bot:</span> ' + reply);
				$dialogue.append($bot);

				// Scroll to bottom.
				$dialogue.animate({ scrollTop: $dialogue[0].scrollHeight }, 1000);
			});
		}
	})
});

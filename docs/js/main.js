$(document).ready(function () {
	$('#domain-name').hide();
	$('#short-hand').hide();
	$('#copy-msg').hide();
	$('#short-url').hide();
	$('#copy-icon').hide();

	$('#cross-btn').click(function () {
		$('#banner').hide();
	})

	$('#copy-icon').click(function () {
		const shortUrl = $('#short-url').text();
		console.log(shortUrl);
		// shortURL.setSelectionRange(0, 99999);
		document.execCommand('Copy');
		showToast('URL coppied to clipboard');
	})

	$('#shorten-btn').click(function () {
		if ($('#custom-checkbox').is(':checked')) {
			if (!$('#long-url').val().trim()) {
				showToast('Please enter proper URL');
			} else if (!$('#short-hand').val().trim()) {
				showToast('Please enter proper custom URL')
			} else {
				const longUrl = $('#long-url').val().trim();
				const shortHand = $('#short-hand').val().trim();

				  $.ajax({
					"url": "https://trims.tk/create",
					"method": "POST",
					"timeout": 0,
					"headers": {
					  "Content-Type": "application/json"
					},
					"data": JSON.stringify({"url" : longUrl, "shortHand" : shortHand, "custom" : true}),
					success: function () {
						$('#copy-msg').show();
						$('#short-url').show();
						$('#copy-icon').show();
					},
					error: function() {
						showToast('Error occurred');
					}
				});
			}
		} else if (!$('#long-url').val().trim()) {
			showToast('Please enter proper URL');
		} else {
			const longUrl = $('#long-url').val().trim();

			  $.ajax({
				"url": "https://trims.tk/create",
				"method": "POST",
				"timeout": 0,
				"headers": {
				  "Content-Type": "application/json"
				},
				"data": JSON.stringify({"url" : longUrl, "shortHand" : "", "custom" : false}),
				success: function () {
					$('#copy-msg').show();
					$('#short-url').show();
					$('#copy-icon').show();
				},
				error: function() {
					showToast('Error occurred');
				}
			  });
		}
	});

	$('#custom-checkbox').change(function () {
		if (this.checked) {
			$('#domain-name').show();
			$('#short-hand').show();
		} else {
			$('#domain-name').hide();
			$('#short-hand').hide();
		}
	});
});

function showToast(message) {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");

	x.innerHTML=message;

	// Add the "show" class to DIV
	x.className = "show";

	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
(function () {
	if (!document.querySelector(".opdrachten")) {
		alert("Verkeerde pagina, ga naar opdrachten!");
	} else {
		var rows = document.querySelector(".opdrachten").querySelectorAll("tr");
		var documents = [];
		for (var i = 2; i < rows.length; i++) {
			var links = rows[i].querySelectorAll("td")[3].querySelectorAll("a");
			for (var j = 0; j < links.length; j++) {
				var element = links[j];
				var link = element.getAttribute("href").split("/").pop();
				element.setAttribute("download", link);
				documents.push({
					element: element,
					file: link
				});
			}
		}

		var cache;
		if (typeof(localStorage) !== "undefined") {
			cache = localStorage.getItem("bk-cache");
			if (!cache) {
				cache = [];
			} else {
				cache = JSON.parse(cache);
			}
		} else {
			cache = false;
		}

		var amount = parseInt(prompt("Hoeveel opdrachten downloaden", "5"), 10);
		if (isNaN(amount)) alert("Ongeldige invoer");
		while(amount > 0 && documents.length > 0) {
			var entry = documents.shift();
			if (!cache) {
				entry.element.click();
			} else if (cache.indexOf(entry.file) == -1) {
				cache.push(entry.file);
				entry.element.click();
			}
			amount = amount - 1;
		}
		if (typeof(localStorage) !== "undefined") {
			localStorage.setItem("bk-cache", JSON.stringify(cache));
		}
	}
})()

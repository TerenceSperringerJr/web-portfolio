"use strict";

(function() {
	let search_query = location.search.substring(1),
		search_pairs = search_query.split(/[=&]/),
		page = "about",
		iframe = document.getElementById("page-source"),
		navigator = document.getElementById("side-navigator"),
		page_content = document.getElementById("page-content"),
		resource;

	function transformPageContent() {
		while (page_content.firstChild) {
			page_content.removeChild(page_content.firstChild);
		}

		if (iframe.contentWindow.location.origin === location.origin) {
			let page_body = iframe.contentDocument.body,
				links = page_body.getElementsByTagName("a");

			iframe.hidden = true;

			//convert from relative to absolute urls
			for (let img of iframe.contentDocument.images) {
				img.src = img.src;
			}

			for (let link of links) {
				link.href = link.href;
			}

			while (page_body.firstChild) {
				page_content.appendChild(page_body.firstChild);
			}

			page_content.hidden = false;
		}
		else {
			page_content.hidden = true;
			iframe.hidden = false;
		}
	}

	function updateNavigator() {
		navigator.contentDocument.getElementById(page + "-nav-link").classList.add("clicked");
	}

	iframe.onload = transformPageContent;

	for(let parameter = 0; parameter < search_pairs.length; parameter += 2) {
		switch(search_pairs[parameter]) {
			case 'page':
				page = search_pairs[parameter + 1];
			break;

			case 'resource':
				resource = search_pairs[parameter + 1];
			break;

			default:
			break;
		}
	}

	if(resource) {
		iframe.src = resource;
	}
	else {
		iframe.src = page + ".html";
		navigator.onload = updateNavigator;
	}

	return;
})();

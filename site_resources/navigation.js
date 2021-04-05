"use strict";

(function() {
	let search_query = location.search.substring(1),
		search_pairs = search_query.split(/[=&]/),
		page = "about",
		iframe = document.getElementById("page-source"),
		page_content = document.getElementById("page-content"),
		resource;

	function transferPageContent() {
		let page_body = iframe.contentDocument.body;

		while(page_content.hasChildNodes()) {
			page_content.removeChild(page_content.firstChild);
		}

		while(page_body.hasChildNodes()) {
			page_content.appendChild(page_body.firstChild);
		}
	}

	//iframe.onload = transferPageContent;

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
	}

	return;
})();

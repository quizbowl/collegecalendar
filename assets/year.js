document.getElementById('collapse').onclick = function() {
	document.body.dataset.toggle =
		(document.body.dataset.toggle) ? '' : 'toggle';
	this.innerText =
		(this.innerText == 'Show fewer rows') ? 'Show more rows' : 'Show fewer rows';
}

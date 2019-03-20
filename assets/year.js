document.getElementById('collapse').onclick = function() {
	document.body.dataset.toggle =
		(document.body.dataset.toggle) ? '' : 'toggle';
	this.innerText =
		(this.innerText == 'Show fewer rows') ? 'Show more rows' : 'Show fewer rows';
}
document.addEventListener("keypress", function onPress(event) {
	if (event.keyCode === 72 || event.keyCode === 104) // h
		document.getElementById('collapse').onclick();
});

function mapPins(f) {
	return Array.from(document.getElementsByClassName('pin')).map(f);
}

function getFromLocalStorage() {
	try {
		var str = window.localStorage['pinned'] || '[]';
		var a = JSON.parse(str);

		mapPins(function (p) {
			if (a.includes(p.dataset.region)) {
				p.dataset.toggle = 'toggle';
				p.innerText = '★';
			}
			else {
				p.closest('tr').classList.add('toggle');
			}
		});
	} catch (e) {}
}

function setLocalStorage() {
	try {
		var a = {};
		mapPins(function (p) {
			if (p.dataset.toggle == 'toggle')
				a[p.dataset.region] = 0;
		});
		window.localStorage['pinned'] = JSON.stringify(Object.keys(a));
	} catch (e) {}
}

window.onload = function () {
	getFromLocalStorage();

	mapPins(function(el) {
		el.onclick = function(e) {
			var on = (el.dataset.toggle == 'toggle');
			var els = document.querySelectorAll('.pin[data-region="' + el.dataset.region + '"]');

			els.forEach(function(el_) {
				el_.dataset.toggle = (on) ? '' : 'toggle';
				el_.innerText = (on) ? '☆' : '★';
				el_.closest('tr').classList[(on) ? 'add' : 'remove']('toggle');
			})
			setLocalStorage();
			e.preventDefault();
		};
	});
}

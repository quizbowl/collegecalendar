// Get colleges from query string
var site = new URLSearchParams(window.location.search).get('site');
var show = new URLSearchParams(window.location.search).get('show');
var collegesHighlight = show ? show.split(',').map(d => d.trim().split('@')) : undefined;

var width = 1458,
	height = 900;

var projection = albersUsaUk()
		.scale(1700)
		.translate([width / 2, height / 2]);

var path = d3.geo.path()
		.projection(projection);
// var path_short = path;
var path_short = d => path(d).replace(/\.(\d\d)\d*/g, '.$1');

var svg = d3.select("#svg-container").append("svg")
		.attr("width", width)
		.attr("height", height);

// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height);

svg.append("path")
	.datum({type: "Sphere"})
	.attr("class", "sphere")
	.attr("d", path_short);

/*var graticule = d3.geo.graticule()
	.step([2, 2]);

svg.append("path")
	.datum(graticule)
	.attr("class", "graticule")
	.attr("d", path_short);
*/

var color = d3.scale.category20b();

d3.json("us.json", function(error, us) {
	if (error) throw error;
d3.json("uk.json", function(error, uk) {
	if (error) throw error;
d3.json("canada.json", function(error, ca) {
	if (error) throw error;
d3.tsv("colleges.tsv", function(error, colleges) {
	if (error) throw error;
	var colleges = colleges.map(function(d) {
		var cleanD = {};
		d3.keys(d).forEach(function(k) {
			cleanD[k] = d[k].trim();
		});
		cleanD.coordinates = [+d.long, +d.lat];
		return cleanD;
	});

	function arr2objByKeyF(arr, keyF) {
		return arr.reduce((o, geometry) => Object.assign(o, {[keyF(geometry)]: geometry}), {})
	}

	var maps = {
		'us': [us, arr2objByKeyF(us.objects.states.geometries.concat(us.objects.counties.geometries), g => g.id)],
		'ca': [ca, arr2objByKeyF(ca.objects.canada_divisions.geometries, g => g.properties.CDUID)],
		'uk': [uk, arr2objByKeyF(uk.objects.subunits.geometries, g => g.id)],
	};

	var regions = mapdata.regions.map(function(region) {
		var children_polys = region.children.map((child) => maps[region.map][1][child] );
		var merged_poly = topojson.merge(maps[region.map][0], children_polys);
		region.poly = merged_poly;

		return region;
	});

	var main = svg.append("g")
			.attr("class", "main");

	// main.append("path")
	// 		.datum(topojson.feature(us, us.objects.states))
	// 		.attr("class", "state state-only")
	// 		.attr("d", path_short);

	main.append("path")
			.datum(topojson.feature(us, us.objects.land))
			.attr("class", "state-boundary")
			.attr("d", path_short);

	main.append("path")
			.datum(topojson.feature(uk, uk.objects.subunits))
			.attr("class", "state-boundary")
			.attr("d", path_short);

	main.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "state-boundary")
			.attr("d", path_short);

	main.selectAll('.selected3')
		.data(regions)
		.enter()
			// .append("view")
			// .attr("id", d => d.id)
			// .attr("viewBox", function (d) {
			// 	// return '0 0 1000 1000';
			// 	var bounds = path.bounds(d.poly),
			// 		width = bounds[1][0] - bounds[0][0],
			// 		height = bounds[1][1] - bounds[0][1];
			// 	return [
			// 		bounds[0][0],
			// 		bounds[0][1],
			// 		width,
			// 		height
			// 	].join(" ");
			// })
			.append("path")
			.attr("id", d => d.id)
			.attr("class", "state selected2")
			.attr("d", d => path_short(d.poly))
			.attr("fill", function(d, i) { return color(d.color); })
			// .attr("fill", function(d, i) { return d.color; });
	// BC
	// main.append("path")
			// .attr("class", "state selected2")
			// .attr("d", path(topojson.merge(ca, ca.objects.canada_divisions.geometries.filter(d => d.properties.CDUID.startsWith('5915') ) )))
			// .attr("fill", color(10));


const voronoi = d3.geom.voronoi()
	.x(d => projection(d.coordinates)[0])
	.y(d => projection(d.coordinates)[1])
	// .clipExtent([[0, 0], [width, height]]);

	main.selectAll(".stateText")
		.data(regions)
		.enter()
			.append("text")
			.attr("x", function(d) {
				return path.centroid(d.poly)[0] + d.label[0];
			})
			.attr("y", function(d) {
				return path.centroid(d.poly)[1] + 12 + d.label[1];
			})
			.attr("text-anchor", "middle")
			.attr('class', 'region-label-region region-label')
			.text(d => d.name);
	main.selectAll(".stateText")
		.data(regions)
		.enter()
			.append("text")
			.attr("x", function(d) {
				return path.centroid(d.poly)[0] + d.label[0];
			})
			.attr("y", function(d) {
				return path.centroid(d.poly)[1] - 12 + d.label[1];
			})
			.attr("text-anchor", "middle")
			.attr('class', 'region-label')
			.text(d => d.parent);
	main.selectAll(".stateText")
		.data(regions)
		.enter()
			.append("text")
			.attr("x", function(d) {
				return path.centroid(d.poly)[0] + d.label[0];
			})
			.attr("y", function(d) {
				return path.centroid(d.poly)[1] - 30 + d.label[1];
			})
			.attr("text-anchor", "middle")
			.attr('class', 'region-label region-label-region region-label-id')
			.text(d => d.id);

	var circleClasses = {
		2: 'circle-large',
		1: 'circle-small',
		0: 'circle-inactive',
	}
	var circleRadii = {
		2: 4,
		1: 2,
		0: 2,
	}
	main.selectAll('.place')
		.data(colleges)
		.enter()
		.append('circle')
		.attr('class', d => circleClasses[d.active])
		.attr('transform', d => 'translate(' + projection(d.coordinates) +')')
		.attr('r', d => circleRadii[d.active]);

/* subtended = radius * angle (s = rθ) */
var EARTH_RADIUS = 3959;                         // miles
var radiusMiles  = 100;                          // miles (radius of circle to draw)
var angleRadians = radiusMiles / EARTH_RADIUS;   // angle subtended in radians
var angleDegrees = angleRadians * 180 / Math.PI; // angle subtended in degrees

// TODO defining paddingTopBottom here outside the function for some reason is what makes the
// label-arrow not be drawn (due to NaN in path) during the highlight-labeling pass
// very janky/half unintentional feature in case that's what you want to do
function makePlaceLabel(selection, element, hover) {
	var marginLeftRight = 8; // adjust the padding values depending on font and font size
	var paddingLeftRight = 6; // adjust the padding values depending on font and font size
	var paddingTopBottom = 4;
	selection.each((d) => {
		var pcoords = projection(d.coordinates);
		var g = element.select('g.place-label-group');
		if (g.empty()) {
			g = element.append('g').attr('class', 'place-label-group');
		}
		var id = d.college
		var text = g.append('text')
			.datum(d.point)
			.attr('data-college', id)
			.attr('class', 'place-label ' + (hover ? 'place-label-1' : ' highlight'))
			.attr('transform', 'translate(' + pcoords + ')')
			.attr("x", - marginLeftRight - 3 * paddingLeftRight / 2)
			// .attr("x", function(d) { return d.coordinates[0] > -88 ? 6 : -6; })
			.attr("dy", ".35em")
			.style("text-anchor", 'end')
			// .style("text-anchor", function(d) { return d.coordinates[0] > -88 ? "start" : "end"; })
			.text(d.college);

		var bb = text[0][0].getBBox();

		pcoords[0] = Math.round(pcoords[0]) + .5; pcoords[1] = Math.round(pcoords[1]);
		g.insert("path", `text[data-college=${CSS.escape(id)}]`)
			.datum(d.point)
			.attr('class', 'place-label-rect ' + (hover ? 'place-label-1' : 'highlight'))
			.attr('fill', 'blue')
			.attr('transform', 'translate(' + pcoords + ')')
			.attr('d', 'M ' + (- marginLeftRight) + ' 0 ' +
					   'l ' + (- paddingLeftRight) + ' ' + (- bb.height / 2 - paddingTopBottom / 2) +
					   'l ' + (- Math.round(bb.width) - 3 * paddingLeftRight / 2) + ' 0 ' +
					   'l 0 ' + (bb.height + paddingTopBottom) + ' ' +
					   'l ' + (+ Math.round(bb.width) + 3 * paddingLeftRight / 2) + ' 0 ' +
					   'Z')

		if (d.mirrorDate) {
			g.append('text')
				.datum(d.point)
				.attr('class', 'place-label place-label-date')
				.attr('transform', 'translate(' + pcoords + ')')
				.attr("x", - marginLeftRight - bb.width - 3 * paddingLeftRight /2)
				.attr("dy", "1.85em")
				.style("text-anchor", 'start')
				.text(d.mirrorDate);
		}
	});
}

main.selectAll('.voronoi')
  .data(voronoi(colleges))
  .enter().append('g')
	.attr('fill', 'none')
	// .attr('stroke', '#40a94235')
	.attr('pointer-events', 'all')
  .append('path')
	.attr('d', d => d ? 'M' + d.join('L') + 'Z' : null)
	.on('mouseover', (d) => {
		// make a selection of one element with d.point as its data
		var selection = d3.select(this);
		selection.datum(d.point);
		makePlaceLabel(selection, svg, true);
	})
	.on('mouseout', (d) => {
	  svg.selectAll(".place-label-1").remove();
	});

/*	.on('mouseover', (d) => {
		// distanceLimitedVoronoi

var circle  = d3.geo.circle().angle  (angleDegrees).origin(d.point.coordinates);
var circle2 = d3.geo.circle().angle(2*angleDegrees).origin(d.point.coordinates);
svg.append("path")
  .datum(circle)
	.attr("d", path)
	.attr("class", "radius");
svg.append("path")
  .datum(circle2)
	.attr("d", path)
	.attr("class", "radius");

// TODO label circles with 100 and 200 mi
// TODO circles overlap college name labels in mouseover precedence?
svg.append("text")
	.datum(d.point)
	.attr('class', 'place-label place-label-1')
	.attr('transform', d => 'translate(' + projection(d.coordinates) + ')')
	.text("100 mi.")
	.attr("class", "radius-label place-label");
	
	  // Pop up information
	})
	.on('mouseout', (d) => {
	  svg.selectAll(".radius").remove();
	  svg.selectAll(".radius-label").remove();
	});
*/
/*
	main.selectAll('.place-label')
		.data(colleges)
		.enter()
		.append('text')
		.attr('class', 'place-label')
		.attr('transform', d => 'translate(' + projection(d.coordinates) +')')
		.attr("x", function(d) { return d.coordinates[0] > -88 ? 6 : -6; })
		.attr("dy", ".35em")
		.style("text-anchor", function(d) { return d.coordinates[0] > -88 ? "start" : "end"; })
		.text(d => d.college);*/

if (collegesHighlight) {
	var collegesInQuery = [];
	var collegesNotMatched = [];

	collegesHighlight.forEach(collegeHighlight => {
		let matched = colleges.find(college =>
			[college.college, college.college_abbr, college.college_long].includes(collegeHighlight[0]) &&
			(collegeHighlight[1] === undefined || college.region === collegeHighlight[1])
		);
		if (matched) {
			matched.mirrorDate = collegeHighlight[2];
			collegesInQuery.push(matched);
		}
		else
			collegesNotMatched.push(collegeHighlight);
	});
	console.log(collegesHighlight, collegesInQuery, collegesNotMatched);

	if (collegesInQuery.length) {
		let highlightLegend = svg.append('g')
			.attr('class', 'legend legend-label-medium')
		let highlightText = highlightLegend.append('text')
			.attr('x', 1042)
			.attr('y', 20)
			.attr('dy', '.35em')
			.text(`Highlighting ${collegesInQuery.length} site${collegesInQuery.length > 1 ? 's' : ''}${site ? ' of ' + site : ''}`)
		if (collegesNotMatched && collegesNotMatched.length > 0) {
			var tooltipText = 'Failed to match:\n' + collegesNotMatched.map(d => `${d[0]}@${d[1]}`).join('\n');
			console.log(tooltipText);
			highlightText.append('title').text(tooltipText);
		}
		highlightLegend.append('text')
			.attr('x', 1042)
			.attr('y', 44)
			.attr('dy', '.35em')
			.text(`Nearest colleges up to 300 miles (as the crow flies)`)
		highlightLegend.append('circle')
			.attr('cx', 1020)
			.attr('cy', 20)
			.attr('class', 'highlight')
			.attr('r', 9)
		highlightLegend.append('circle')
			.attr('cx', 1020)
			.attr('cy', 20)
			.attr('class', 'circle-large')
			.attr('r', 4)
		highlightLegend.append('line')
			.attr('x1', 1000)
			.attr('y1', 45)
			.attr('x2', 1036)
			.attr('y2', 45)
			.attr('class', 'highlight')
			.attr('stroke-dasharray', '5,5')

		highlightLegend.append("foreignObject")
			.attr("width", 30)
			.attr("height", 30)
			.attr("x", 980)
			.attr("y", 33)
		.append("xhtml:input")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.attr("type", "checkbox")
			.attr("checked", true)
	}
	let highlight = main;

	// draw lines from every college to the closest highlighted college
	let maxDistance = d3.geo.distance([-80, 40], [-82, 44.1]); // 301 miles
	function getClosestCollege(d) {
		let minValue, min = -1; index = -1;
		for (const c of collegesInQuery) {
			++index;
			let distance = d3.geo.distance(d.coordinates, c.coordinates);
			if ((min < 0 || distance < minValue) && distance < maxDistance) {
				minValue = distance; min = index;
			}
		}
		return collegesInQuery[min];
	}

	highlight.selectAll('.line')
		.data(colleges)
		.enter()
		.append('line')
		.attr('class', 'highlight')
		.attr('stroke', 'black')
		.each(function(d) {
			var closest = getClosestCollege(d);
			if (!closest)
				return;
			d3.select(this)
				.attr('x1', projection(closest.coordinates)[0])
				.attr('y1', projection(closest.coordinates)[1])
				.attr('x2', projection(d.coordinates)[0])
				.attr('y2', projection(d.coordinates)[1]);
		});

	var labelG = svg.append('g');

	highlight.selectAll('.circle')
		.data(collegesInQuery)
		.enter()
		.append('circle')
		.attr('class', 'highlight')
		.attr('transform', d => 'translate(' + projection(d.coordinates) +')')
		.attr('r', 9)
		.call(makePlaceLabel, labelG, false)
}

	var legend = svg.append('g')
		.attr('class', 'legend')
		// .attr('transform', d => 'translate(' + projection([-71.7, 35]) +')');
		.attr('transform', d => 'translate(' + projection([-118, 27]) +')');
	legend.append('text')
		.attr('class', 'region-label')
		.text('Region');
	legend.append('text')
		.attr('transform', d => 'translate(0,24)')
		.attr('class', 'region-label region-label-region')
		.text('Circuit');

	legend.append('circle')
		.attr('class', 'circle-large')
		.attr('transform', d => 'translate(-16,44)')
		.attr('r', 4);
	legend.append('circle')
		.attr('class', 'circle-small')
		.attr('transform', d => 'translate(-16,68)')
		.attr('r', 2);
	legend.append('circle')
		.attr('class', 'circle-inactive')
		.attr('transform', d => 'translate(-16,92)')
		.attr('r', 2);
	legend.append('text')
		// .attr('class', 'place-label')
		.attr('class', 'legend-label-medium')
		.attr('transform', d => 'translate(0,48)')
		.text('Hosts tournaments (Core/Active)');
	legend.append('text')
		.attr('transform', d => 'translate(0,72)')
		// .attr('class', 'place-label')
		.attr('class', 'legend-label-medium')
		.text('Attends tournaments');
	legend.append('text')
		.attr('transform', d => 'translate(0,96)')
		// .attr('class', 'place-label')
		.attr('class', 'legend-label-medium')
		.text('Inactive');

	legend.append('text')
		.attr('transform', d => 'translate(32,-40)')
		.attr('class', 'legend-label')
		.attr("text-anchor", "middle")
		.text('College quizbowl circuit map');

});
});
});
});

d3.select(self.frameElement).style("height", height + "px");

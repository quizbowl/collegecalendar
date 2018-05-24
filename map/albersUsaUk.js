// A modified d3.geo.albersUsa to include Puerto Rico.
function albersUsaUk() {
	var ε = 1e-6;

	var lower48 = d3.geo.albers();

	// EPSG:3338
	var alaska = d3.geo.conicEqualArea()
			.rotate([154, 0])
			.center([-2, 58.5])
			.parallels([55, 65]);

	// ESRI:102007
	var hawaii = d3.geo.conicEqualArea()
			.rotate([157, 0])
			.center([-3, 19.9])
			.parallels([8, 18]);

	// XXX? You should check that this is a standard PR projection!
	var uk = d3.geo.conicEqualArea()
			.center([0, 54.5])
			.rotate([4.4, 0])
			.parallels([50, 60]);

	var point,
			pointStream = {point: function(x, y) { point = [x, y]; }},
			lower48Point,
			alaskaPoint,
			hawaiiPoint,
			ukPoint;

	function albersUsa(coordinates) {
		var x = coordinates[0], y = coordinates[1];
		point = null;
		(lower48Point(x, y), point)
				// || (alaskaPoint(x, y), point)
				// || (hawaiiPoint(x, y), point)
				|| (ukPoint(x, y), point);
		return point;
	}

	albersUsa.invert = function(coordinates) {
		var k = lower48.scale(),
				t = lower48.translate(),
				x = (coordinates[0] - t[0]) / k,
				y = (coordinates[1] - t[1]) / k;
		return /*(y >= .120 && y < .234 && x >= -.425 && x < -.214 ? alaska
				: y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii
				:*/ (y >= .070 && y < .234 && x >= .290 && x < .450 ? uk
				: lower48).invert(coordinates);
	};

	// A naïve multi-projection stream.
	// The projections must have mutually exclusive clip regions on the sphere,
	// as this will avoid emitting interleaving lines and polygons.
	albersUsa.stream = function(stream) {
		var lower48Stream = lower48.stream(stream),
				// alaskaStream = alaska.stream(stream),
				// hawaiiStream = hawaii.stream(stream),
				ukStream = uk.stream(stream);
		return {
			point: function(x, y) {
				lower48Stream.point(x, y);
				// alaskaStream.point(x, y);
				// hawaiiStream.point(x, y);
				ukStream.point(x, y);
			},
			sphere: function() {
				lower48Stream.sphere();
				// alaskaStream.sphere();
				// hawaiiStream.sphere();
				ukStream.sphere();
			},
			lineStart: function() {
				lower48Stream.lineStart();
				// alaskaStream.lineStart();
				// hawaiiStream.lineStart();
				ukStream.lineStart();
			},
			lineEnd: function() {
				lower48Stream.lineEnd();
				// alaskaStream.lineEnd();
				// hawaiiStream.lineEnd();
				ukStream.lineEnd();
			},
			polygonStart: function() {
				lower48Stream.polygonStart();
				// alaskaStream.polygonStart();
				// hawaiiStream.polygonStart();
				ukStream.polygonStart();
			},
			polygonEnd: function() {
				lower48Stream.polygonEnd();
				// alaskaStream.polygonEnd();
				// hawaiiStream.polygonEnd();
				ukStream.polygonEnd();
			}
		};
	};

	albersUsa.precision = function(_) {
		if (!arguments.length) return lower48.precision();
		lower48.precision(_);
		// alaska.precision(_);
		// hawaii.precision(_);
		uk.precision(_);
		return albersUsa;
	};

	albersUsa.scale = function(_) {
		if (!arguments.length) return lower48.scale();
		lower48.scale(_);
		// alaska.scale(_ * .35);
		// hawaii.scale(_);
		uk.scale(_ * 1);
		return albersUsa.translate(lower48.translate());
	};

	albersUsa.translate = function(_) {
		if (!arguments.length) return lower48.translate();
		var k = lower48.scale(), x = +_[0], y = +_[1];

		lower48Point = lower48
				.translate(_)
				.clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]])
				.stream(pointStream).point;

/*		alaskaPoint = alaska
				.translate([x - .307 * k, y + .201 * k])
				.clipExtent([[x - .425 * k + ε, y + .120 * k + ε], [x - .214 * k - ε, y + .234 * k - ε]])
				.stream(pointStream).point;

		hawaiiPoint = hawaii
				.translate([x - .205 * k, y + .212 * k])
				.clipExtent([[x - .214 * k + ε, y + .166 * k + ε], [x - .115 * k - ε, y + .234 * k - ε]])
				.stream(pointStream).point;
*/
		ukPoint = uk
				.translate([x + .373 * k, y + .153 * k])
				.clipExtent([[x + .290 * k, y + .070 * k], [x + .455 * k, y + .238 * k]])
				.stream(pointStream).point;

		return albersUsa;
	};

	return albersUsa;
}

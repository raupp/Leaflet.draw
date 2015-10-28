L.Polygon.include({
	//verify if a point is inside the polygon. Ignore Polygon holes
	hasPoint: function (point) {
		//probable has a better way to do that without unprojecting
		var vs = this._rings[0];
		point = this._map.latLngToLayerPoint(point);
		var x = point.x, y = point.y;

		var inside = false;
		for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			var xi = vs[i]['x'], yi = vs[i]['y'];
			var xj = vs[j]['x'], yj = vs[j]['y'];

			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	}
});
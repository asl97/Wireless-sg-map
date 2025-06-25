// https://stackoverflow.com/a/68140398
//code in this script tag CC BY-SA 4.0
L.TipCircle = L.Circle.extend({
	initialize: function(latlng, options, legacyOptions) {
		// Create invisible marker
		this._tip = new L.CircleMarker([0,0], {opacity: 0, radius: 0});
		// Initialize as a normal Circle
		L.Circle.prototype.initialize.call(this, latlng, options, legacyOptions);
	},
	redraw: function() {
		L.Circle.prototype.redraw.call(this);
		this._setTip();
	},
	onAdd: function() {
		L.Circle.prototype.onAdd.call(this);
		this._setTip();
		this._tip.addTo(map);
	},
	onRemove: function() {
		this._tip.remove();
		L.Circle.prototype.onRemove.call(this);
	},
	_setTip: function() {
		// Set the location for the tooltip to latitude of the bottom of the circle's
		// bounding box, and the longitude of its centre.
		this._tip.setLatLng([
			this.getBounds()._southWest.lat,
			this.getLatLng().lng]);
		// Set the label to the circle's radius in metres
		const tipText = String(this.getRadius())+"M";
	
		// Remove any old tooltip and attach the new one
		this._tip.unbindTooltip();
		this._tip.bindTooltip(tipText, {
			direction: 'center',
			permanent: true,
			className: 'circleTip'
		});
	}
});
L.tipCircle = (latlng, options, legacyOptions) => new L.TipCircle(latlng, options, legacyOptions);
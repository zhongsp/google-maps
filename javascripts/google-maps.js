var GoogleMaps = (function(document) {
  'use strict';

  return function(domId, googleMapConfig) {
    var cfg = googleMapConfig || {},
      styledMapType;

    this.markerImage = cfg.markerImage || 'images/google-marker.png';
    this.defaultPlace = null;
    this.zoom = cfg.zoom || 16;
    this.styles=cfg.styles || [{featureType:'water',elementType:'all',stylers:[{hue:'#e9ebed'},{saturation:-78},{lightness:67},{visibility:'simplified'}]},{featureType:'landscape',elementType:'all',stylers:[{hue:'#ffffff'},{saturation:-100},{lightness:100},{visibility:'on'}]},{featureType:'road',elementType:'geometry',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:53},{visibility:'on'}]},{featureType:'poi',elementType:'all',stylers:[{hue:'#E7DAC0'},{saturation:3},{lightness:22},{visibility:'on'}]},{featureType:'road.local',elementType:'all',stylers:[{hue:'#e9ebed'},{saturation:-90},{lightness:-8},{visibility:'simplified'}]},{featureType:'transit',elementType:'all',stylers:[{hue:'#FFEA81'},{saturation:100},{lightness:1},{visibility:'on'}]},{featureType:'administrative.locality',elementType:'all',stylers:[{hue:'#2c2e33'},{saturation:7},{lightness:19},{visibility:'on'}]},{featureType:'road',elementType:'labels',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:53},{visibility:'simplified'}]},{featureType:'road.arterial',elementType:'labels',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:26},{visibility:'on'}]},{featureType:'landscape.man_made',elementType:'geometry',stylers:[{hue:'#E7DAC0'},{saturation:24},{lightness:-7},{visibility:'on'}]}];
    this.markers = [];

    this.addMarker = function(pos) {
      var LatLng = new google.maps.LatLng(pos.lat, pos.lng),
        title = pos.markerTitle || 'Marker';

      this.markers.push(new google.maps.Marker({
        position: LatLng,
        icon: this.markerImage,
        animation: google.maps.Animation.DROP,
        title: title
      }));
    };

    this.gotoPlace = function(pos) {
      this.map.panTo(new google.maps.LatLng(pos.lat, pos.lng));
    };

    this.startup = function() {
      var i, j;

      // Init Markers
      i = cfg.places.length;
      if (i) {
        while(i-- > 0) {
          this.addMarker(cfg.places[i]);

          if (cfg.places[i].isDefault) {
            this.defaultPlace = cfg.places[i];
          }
        }
      }

      // Custom Map styles
      styledMapType = new google.maps.StyledMapType(this.styles, {
        name: 'Styled'
      });

      // Create Google Map
      this.map = new google.maps.Map(document.getElementById(domId), {
        mapTypeControlOptions: {
          mapTypeIds: ['Styled', google.maps.MapTypeId.SATELLITE]
        },
        center: new google.maps.LatLng(this.defaultPlace.lat, 
                  this.defaultPlace.lng),
        zoom: this.zoom,
        mapTypeId: 'Styled'
        // scrollwheel: false
      });
      this.map.mapTypes.set('Styled', styledMapType);

      // Set markers to Map'
      j = this.markers.length;
      if (j) {
        while(j-- > 0) {
          this.markers[j].setMap(this.map);
        }
      }

    };
  };

})(document);
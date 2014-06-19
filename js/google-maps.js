var GoogleMaps = (function(document) {
  'use strict';

  return function(domId, googleMapConfig) {
    var cfg = googleMapConfig || {};

    var i = 0,
      styledMapType,
      image = 'images/google-marker.png',
      places = [
        ['melbourne', new google.maps.LatLng(-37.83232752310328, 144.93427991867065)],
        ['dalian', new google.maps.LatLng(38.847000, 121.509789)]
      ];

    this.defaultPlace = cfg.defaultPlace || places[0][1];
    this.zoom = cfg.zoom || 16;

    this.addPlace = function(name, lat, lng) {
      places.push([name, new google.maps.LatLng(lat, lng)]);
    };

    this.addMarker = function(position, title) {
      title = title || 'Marker Title';

      return new google.maps.Marker({
        position: position,
        map: this.map,
        icon: image,
        animation: google.maps.Animation.DROP,
        title: title
      });
    };

    this.styles=cfg.styles || [{featureType:'water',elementType:'all',stylers:[{hue:'#e9ebed'},{saturation:-78},{lightness:67},{visibility:'simplified'}]},{featureType:'landscape',elementType:'all',stylers:[{hue:'#ffffff'},{saturation:-100},{lightness:100},{visibility:'on'}]},{featureType:'road',elementType:'geometry',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:53},{visibility:'on'}]},{featureType:'poi',elementType:'all',stylers:[{hue:'#E7DAC0'},{saturation:3},{lightness:22},{visibility:'on'}]},{featureType:'road.local',elementType:'all',stylers:[{hue:'#e9ebed'},{saturation:-90},{lightness:-8},{visibility:'simplified'}]},{featureType:'transit',elementType:'all',stylers:[{hue:'#FFEA81'},{saturation:100},{lightness:1},{visibility:'on'}]},{featureType:'administrative.locality',elementType:'all',stylers:[{hue:'#2c2e33'},{saturation:7},{lightness:19},{visibility:'on'}]},{featureType:'road',elementType:'labels',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:53},{visibility:'simplified'}]},{featureType:'road.arterial',elementType:'labels',stylers:[{hue:'#E7DAC0'},{saturation:-55},{lightness:26},{visibility:'on'}]},{featureType:'landscape.man_made',elementType:'geometry',stylers:[{hue:'#E7DAC0'},{saturation:24},{lightness:-7},{visibility:'on'}]}];

    this.map = new google.maps.Map(document.getElementById(domId), {
      mapTypeControlOptions: {
        mapTypeIds: ['Styled', google.maps.MapTypeId.SATELLITE]
      },
      center: this.defaultPlace,
      zoom: this.zoom,
      mapTypeId: 'Styled'
    });

    styledMapType = new google.maps.StyledMapType(this.styles, {
      name: 'Styled'
    });

    this.map.mapTypes.set('Styled', styledMapType);

    while(i < places.length) {
      this.addMarker(places[i][1]);
      i += 1;
    }
  };

})(document);
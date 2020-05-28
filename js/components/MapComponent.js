let MapComponent = (function () {
  let citiesComponent = CitiesComponent(new CitiesModel());
  let locations = citiesComponent.GetLocations();

  let all = locations['All'];

  let mapSelector = 'map-container';

  let mymap = {
    setView(x,y) {}
  };

  if(jQuery('#' + mapSelector).length > 0) {

    mymap = L.map(mapSelector).setView(all, all[2]);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);

    for (let l in locations) {
      if (l != 'All')
        L.marker(locations[l]).addTo(mymap);
    }

    let popup = L.popup();
    mymap.on('click', function (e) {
      //console.log(e);
      popup
          .setLatLng(e.latlng)
          .setContent("Position " + e.latlng.toString())
          .openOn(mymap);
    });
  }
  // map

  //Log.trace(cityArr);

  function MapComponent(vueModel) {

    if (typeof vueModel.data == "undefined")
      vueModel.data = {};

    if (typeof vueModel.methods == "undefined")
      vueModel.methods = {};

    if (typeof vueModel.watch == "undefined")
      vueModel.watch = {};

    let cities = new citiesComponent(vueModel);

    CopyObjects(vueModel.watch, {
      citiesSelector: function (val, oldVal) {

        let selObjs = cities.GetCityByName(val);

        if(selObjs.length == 0)
          return;

        let obj = selObjs[0];

        //Log.trace(obj);

        mymap.setView(obj.location, obj.zoom);
      }
    });

    this.model = vueModel;
  }

  return MapComponent;
})();

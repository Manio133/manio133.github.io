let MapComponent = function (model) {
  model = model || new CitiesModel();

  //let citiesComponent = CitiesComponent(model, "mapCities", "mapCitySelector");
  let locations = model.GetLocations();

  const zoom = 10;

  function InitMap(all) {

    //let all = locations['All'];

    let mapSelector = 'map-container';

    let mymap = {
      setView(x, y) {
      }
    };

    if (jQuery('#' + mapSelector).length > 0) {

      if(typeof all == "undefined" || all.length < 2) {
        all = [56.9500885,24.0319015, zoom];
      }

      if(all.length < 3)
      {
        all[2] = zoom;
      }

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

      locations.forEach( l => {
        if (l != 'All') {
          L.marker(l.GetGeoPos()).bindPopup(l.GetString).addTo(mymap);
          //Log.trace(l.GetGeoPos());
        }
      });

      // let popup = L.popup();
      // mymap.on('click', function (e) {
      //   console.log(e);
      //   //let titleArr = locations.filter( x=> x.GetGeoPos());
      //   popup
      //       .setLatLng(e.latlng)
      //       .setContent("Position " + e.latlng.toString())
      //       .openOn(mymap);
      // });
    }

    return mymap;
  }
  // map

  //Log.trace(cityArr);

  function MapComponent(vueModel, geoPosAll) {

    let _this = this;

    VueModelInitial(vueModel);

    ///let citiesComponentObj = new citiesComponent(vueModel);

    let mymap = null;

    // CopyObjects(vueModel.watch, {
    //   mapCitySelector: function (val, oldVal) {
    //     //_this.setView(citiesComponentObj.GetCityByName(val));
    //     _this.setView(citiesComponentObj.GetCityByName(val));
    //   }
    // });

    vueModel.methods.SelLocation = function(e) {
      let index = parseInt(e.target.attributes["data-index"].value);
      Log.trace(locations[index].GetGeoPos())

      _this.setView(locations[index].GetGeoPos());
    }

    vueModel.userInitsCallbacks.push(()=> {
      mymap = InitMap(geoPosAll);
    });

    this.model = vueModel;

    this.setView = function(geoPos) {

      // if(selObjs.length == 0)
      //   return;
      //
      // let obj = selObjs[0];
      //
      // //Log.trace(obj);
      //
      // if(mymap != null)
      //   mymap.setView(obj.location, obj.zoom);

      if(mymap != null) {
        mymap.setView(geoPos, 12);
      }

    }
  }

  return MapComponent;
}

import React, { PureComponent } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl
} from "react-map-gl";
import cityList from "../icons/city_list2.json";
import Geocoder from "react-map-gl-geocoder";

// "styles": {
//     "basic": "mapbox://styles/mapbox/basic-v10",
//     "dark": "mapbox://styles/mapbox/dark-v10",
//     "light": "mapbox://styles/mapbox/light-v10",
//     "outdoor": "mapbox://styles/mapbox/outdoors-v11",
//     "satellite": "mapbox://styles/mapbox/satellite-v9",
//     "streets": "mapbox://styles/mapbox/streets-v11",
//     "parcels": "mapbox://styles/robert-op/ck5y8yjpy11r41ilhnybzc4kw",
//     "lightparcels": "mapbox://styles/robert-op/ck7g51r2d3pon1ip8nybylji1"
//   },
class Map extends PureComponent {
  state = {
    viewport: {
      latitude: Number(this.props.lat),
      longitude: Number(this.props.lon),
      zoom: 5
    }
  };

  mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleMapChange = country => {
    this.setState({
      viewport: {
        latitude: country.CapitalLatitude,
        longitude: country.CapitalLongitude
      }
    });
  };

  render() {
    const { handleMapChange } = this.props;
    return (
      <ReactMapGL
        {...this.state.viewport}
        ref={this.mapRef}
        width='100%'
        height='100%'
        onViewportChange={viewport => this.setState({ viewport })}>
        <div className='absolute display-inline'>
          <NavigationControl className='m-2' />
        </div>
        <div className='m-2 float-right'>
          <GeolocateControl />
        </div>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        />

        {cityList.map((country, index) => {
          // console.log(country.CountryName);

          return (
            <Marker
              key={index}
              longitude={Number(country.CapitalLongitude)}
              latitude={Number(country.CapitalLatitude)}>
              {/* <img src='' alt='' /> */}
              <span
                className='cursor-pointer'
                onClick={() => handleMapChange(country)}>
                <img
                  className='map-pin m-auto'
                  src={process.env.PUBLIC_URL + "/pin.png"}
                  alt='pin'
                />
                <h1 className='cursor-pointer text-center'>
                  {country.CapitalName}
                </h1>
              </span>
            </Marker>
          );
        })}
      </ReactMapGL>
    );
  }
}
export default Map;

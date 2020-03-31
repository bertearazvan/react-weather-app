import React, { Component } from "react";
import StickyHeadTable from "./TablePagination";
import SearchBar from "./SearchBar";
import CityListJSON from "../icons/city_list.json";

function createData(geonameid, name, subcountry, country) {
  return { geonameid, name, subcountry, country };
}

const rows = [];

CityListJSON.forEach(city => {
  rows.push(
    createData(city.geonameid, city.name, city.subcountry, city.country)
  );
});

export default class CityList extends Component {
  state = {
    rows: rows   
  };
  onCityChange = citylist => {
    this.setState({ rows: citylist });
  };

  render() {
    return (
      <div className='max-w-5xl flex items-center w-full h-screen m-auto '>
        <div className='w-full'>
          <div className='flex-1 mt-16 sm:mt-auto relative'>
            <SearchBar handleSearchCity={this.onCityChange} />
          </div>
          <div className='flex min-w-5xl w-full mt-10 flex-1 items-center'>
            <StickyHeadTable rows={this.state.rows} />
          </div>
        </div>
      </div>
    );
  }
}

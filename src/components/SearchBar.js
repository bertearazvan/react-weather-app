import React, { Component } from "react";
import cities from "../icons/city_list.json";

let cityJSON = cities;

class SearchBar extends Component {
  state = {
    loading: true,
    foundCities: [],
    searchedString: ""
  };

  onSearching = event => {
    this.setState({ searchedString: event.target.value });
    var cities = cityJSON.filter(function(city) {
      let FullString = city.name + city.country + city.subcountry;
      return FullString.toLowerCase().includes(
        event.target.value.toLowerCase()
      );
    });

    this.setState({ foundCities: cities });
  };

  render() {
    const { loading, foundCities } = this.state;

    if (loading) {
      return (
        <div className='grid w-full grid-cols-1'>
          <div className='flex justify-center'>
            <div className=' w-10/12 sm:w-6/12 border border-gray-600 rounded-lg shadow-md'>
              <input
                type='text'
                id='searchBar'
                className='searchBar w-10/12 p-2 bg-transparent'
                placeholder='Search by city...'
                onKeyUp={event => this.onSearching(event)}
              />

              <button
                onClick={() => this.props.handleSearchCity(foundCities)}
                className='searchBtn'
                style={{ width: "15%" }}>
                View
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default SearchBar;

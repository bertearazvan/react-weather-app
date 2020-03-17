import React, { Component } from "react";
import cities from "cities.json";

let cityJSON = cities;

class SearchBar extends Component {
  state = {
    loading: true,
    foundCities: [],
    searchedString: "",
    currentSelect: Object
  };

  setSearch = city => {
    this.setState({ currentSelect: city });
    document.getElementById("searchBar").value =
      city.name + ", " + city.country;
    this.setState({ searchedString: "" });
  };

  onSearching = event => {
    this.setState({ searchedString: event.target.value });
    if (event.target.value.length > 2) {
      var cities = cityJSON.filter(function(city) {
        let FullString = city.name + ", " + city.country;
        return FullString.includes(event.target.value);
      });

      this.setState({ foundCities: cities });
    } else {
      this.setState({ foundCities: [] });
    }
  };

  render() {
    const { loading, searchedString, currentSelect, foundCities } = this.state;

    if (loading) {
      return (
        <div
          className='grid absolute w-full'
          style={{ gridTemplateColumns: "1fr", marginTop: "-20px" }}>
          <div className='flex justify-center'>
            <div className='w-6/12 border border-gray-600 rounded-lg shadow-md'>
              <input
                type='text'
                id='searchBar'
                className='searchBar w-10/12 p-2 bg-transparent'
                placeholder='Search by city...'
                onKeyUp={event => this.onSearching(event)}
              />

              <button
                onClick={() => this.props.handleSearchCity(currentSelect)}
                className='searchBtn'
                style={{ width: "15%" }}>
                View
              </button>
            </div>
          </div>
          <div className='flex justify-center'>
            <div
              className='border w-6/12 border-gray-600 p-2 bg-white overflow-y-auto'
              style={{
                maxHeight: "10vh",
                borderRadius: "0px 0px .5rem .5rem",
                borderTop: "0px",
                display: searchedString.length < 3 ? "none" : "block"
              }}>
              {foundCities.length !== 0 ? (
                foundCities.map((city, index) => {
                  return (
                    <p
                      className='searchResult'
                      key={("item-", index)}
                      cityid={city.geonameid}
                      onClick={() => this.setSearch(city)}>
                      {city.name}, {city.country}
                    </p>
                  );
                })
              ) : (
                <p>Sorry, no items</p>
              )}
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

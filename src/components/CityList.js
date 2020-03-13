import React, { Component } from "react";
import StickyHeadTable from "./TablePagination";

export default class CityList extends Component {
  render() {
    return (
      <div className='flex relative max-w-5xl w-full h-screen m-auto items-center'>
        <StickyHeadTable />
      </div>
    );
  }
}

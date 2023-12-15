import React from "react";
import { restrauntList, swiggy_api_url, img_cdn_url } from "./Config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
//-------------------- Prototype of Cards ----------------------------------------------------------------//
// Here i am destructuring the things that are passed restaurant.info
// and i am only using necessary things
const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  lastMileTravelString,
  locality,
  avgRating,
  costForTwo,
  sla,
}) => {
  return (
    <div className="w-[250px] m-5 rounded-lg  shadow-2xl border-0.5  border-gray-10  overflow-hidden hover:scale-95 cursor-pointer">
      <img
        className="rounded-3xl p-3"
        src={img_cdn_url + cloudinaryImageId}
        alt=""
      />
      <div className="font-bold text-xl ml-2 ">{name}</div>
      <div className="pl-2 text-sm font-light">{cuisines.join(", ")}</div>
      <div className="flex justify-around mb-3 mt-2">
        <div className="ml-2  bg-green-500 pr-2 text-white font-bold rounded-md">
          ⭐{avgRating}
        </div>
        {"•"}
        <div className="font-medium ml-1 mr-1">
          {sla?.lastMileTravelString ?? "2.0 km"}
        </div>
        {"•"}
        <div className="font-medium ml-1 mr-3">
          {costForTwo ?? "₹200 for two"}
        </div>
      </div>
    </div>
  );
};
//--------------------------Filter data function------------------------------//
// this will filter data from all restraunts on basis of search Input
function filterData_function(restraunts, searchInput) {
  const filterDataa = restraunts.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filterDataa;
}
//----------------------------------------------------------------------------//

const Body = () => {
  //------------------------ State Variables ---------------------------------//
  const [all_restaurants, setAll_restaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  //---------------------------   Call for API  ------------------------------//
  async function call_swiggy_api() {
    const data = await fetch(swiggy_api_url);
    const json = await data.json();
    setAll_restaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }
  useEffect(() => {
    // call for swiggy api
    call_swiggy_api();
  }, []);
  //--------------------------------------------------------------------------//
  if (all_restaurants.length == 0) {
    return <Shimmer />;
  } else
    return (
      <>
        {/*-----------------------  Search Bar --------------------------------*/}
        <div className="flex justify-center h-12 m-6">
          <input
            className="pl-[14px] w-[300px] border border-black rounded-l-lg"
            type="text"
            value={searchText}
            placeholder="Search for restaurants and food...."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="h-12 bg-green-500 w-[60px] rounded-r-lg text-sm"
            onClick={() => {
              // filter the data
              const data = filterData_function(all_restaurants, searchText);
              // update the state of restaurants list
              setFilteredRestaurants(data);
            }}
          >
            Search
          </button>
        </div>
        {/*------------------------ Restaurant Cards--------------------------- */}
        <div className="flex flex-wrap justify-center m-2 ">
          {filteredRestaurants.map((cur_restaurant) => {
            return (
              <a href="https://www.google.com/">
                <RestaurantCard
                  {...cur_restaurant.info}
                  key={cur_restaurant.info.id}
                />
              </a>
            );
          })}
        </div>
        {/*---------------------------------------------------------------------*/}
      </>
    );
};

export default Body;

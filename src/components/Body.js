import React from "react";
import { restrauntList, swiggy_api_url, img_cdn_url } from "./Config";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
{
  console.log(Shimmer);
}
//-------------------- Prototype of Cards ----------------------------------------------------------------//
// Here i am destructuring the things that are passed restaurant.infor
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
    <div className=" w-[250px] m-5 rounded-lg  shadow-2xl border-0.5  border-gray-10  overflow-hidden hover:scale-95">
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
//----------------------------------------------------------------------------//
const Body = () => {
  //------------------------ State Variables ---------------------------------//
  const [restaurants, setRestaurants] = useState([]);
  //--------------------------------------------------------------------------//
  //---------------------------   Call for API  ------------------------------//
  async function call_swiggy_api() {
    const data = await fetch(swiggy_api_url);
    const json = await data.json();
    setRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log(json);
  }
  useEffect(() => {
    // call for swiggy api
    call_swiggy_api();
  }, []);
  //--------------------------------------------------------------------------//
  if (restaurants.length == 0) {
    return <Shimmer />;
  } else
    return (
      <>
        {/*-----------------------  Search Bar --------------------------------*/}
        <input
          type="text"
          value=""
          placeholder="Search for restaurants and food"
        />
        <button>Search</button>
        {/*---------------------------------------------------------------------*/}
        {/*------------------------ Restaurant Cards--------------------------- */}
        <div className="flex flex-wrap justify-center space-x-3">
          {restaurants.map((cur_restaurant) => {
            return (
              <RestaurantCard
                {...cur_restaurant.info}
                key={cur_restaurant.info.id}
              />
            );
          })}
        </div>
        {/*---------------------------------------------------------------------*/}
      </>
    );
};

export default Body;

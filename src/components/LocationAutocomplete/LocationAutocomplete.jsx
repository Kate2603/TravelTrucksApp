import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/filters/filtersSlice";

const cityList = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro"];

const LocationAutocomplete = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = e => {
    const value = e.target.value;
    setInput(value);
    setSuggestions(
      cityList.filter(city => city.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleSelect = city => {
    setInput(city);
    setSuggestions([]);
    dispatch(setLocation(city));
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter location"
        className="input"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 z-10 w-full">
          {suggestions.map(city => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;

"use client";
import { useFetchAreasQuery } from "@/store/slices/areaApi";
import { useState, useEffect } from "react";

const SearchableDropdown = ({ value, onChange, onBlur }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data } = useFetchAreasQuery();
  const getAreaName = (areaCode) => {
    const area = data.areaList.find((area) => area.code === areaCode);
    return area?.name;
  };
  // Debounce timeout to delay API calls
  let debounceTimeout;

  useEffect(() => {
    if (value === "" || value === undefined || value === null) {
      setSearchTerm(value);
    }
  }, [value]);

  const fetchOptions = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/users?q=${query}`
      );
      const data = await response.json();
      setOptions(data.userData); // Assuming the API returns results in `data.results`
    } catch (err) {
      setError("Failed to fetch options");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);

    // Clear the previous debounce timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout to fetch data after a short delay
    debounceTimeout = setTimeout(() => {
      if (value) {
        fetchOptions(value);
      } else {
        setOptions([]); // Clear options if input is empty
      }
    }, 500); // Adjust delay as needed
  };

  const handleOptionClick = (option) => {
    const value = option.name + "-" + option.memberCode;
    setSearchTerm(value); // Or another field based on API response
    onChange(option);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative  w-2/3">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 200);
          onBlur();
        }}
        className="form-select w-full"
      />

      {isDropdownOpen && (
        <ul
          className="bg-background"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {loading ? (
            <li style={{ padding: "8px" }}>Loading...</li>
          ) : error ? (
            <li style={{ padding: "8px", color: "red" }}>{error}</li>
          ) : options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div className="grid w-fit p-4">
                  <strong>{option.name}</strong>
                  <span>Member Code: {option.memberCode}</span>
                  <span>Mobile: {option.mobile}</span>
                  <span className="capitalize">
                    Area: {getAreaName(option.area)}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li style={{ padding: "8px" }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;

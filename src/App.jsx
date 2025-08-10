import { useState, useEffect, useCallback } from "react";
import readXlsxFile from "read-excel-file";
import SAINTEKOldTable from "./tables/SAINTEKOldTable";
import SAINTEKTable from "./tables/SAINTEKTable";

// A utility function to delay the execution of a function.
// This prevents the search logic from running on every keystroke,
// improving performance, especially with large datasets.
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function convertDateString(dateString) {
  // Split the input string into day, month, and year parts
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  // Months are 0-indexed in JavaScript, so subtract 1
  const month = parseInt(parts[1], 10) - 1;
  // Convert two-digit year to a four-digit year (e.g., 25 -> 2025)
  const year = 2000 + parseInt(parts[2], 10);

  // Create a new Date object
  const date = new Date(year, month, day);

  // Use Intl.DateTimeFormat for locale-aware formatting
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export default function App() {
  const date = ["3-8-25", "27-7-25"];

  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);

  // The path is relative to the `public` folder
  function changeData(val) {
    setSearchTerm("");
    setSelectedDate(val);
    readData(`/data/${date[val]}/saintek.xlsx`);
  }

  function readData(filePath) {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");

        return response.blob();
      })
      .then((blob) => readXlsxFile(blob))
      .then((rows) => {
        setData(rows);
        setFilteredData(rows);
      })
      .catch((err) => {
        console.error("Error reading the Excel file:", err);
      });
  }

  useEffect(() => {
    readData(`/data/${date[selectedDate]}/saintek.xlsx`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures this effect runs only once

  // The debounced search function. We wrap it in `useCallback` to prevent
  // it from being re-created on every render, which is crucial for
  // the debounce timer to work correctly.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((newSearchTerm) => {
      // If the search bar is empty, show all data.
      if (!newSearchTerm) {
        setFilteredData(data);
      } else {
        // Filter the data based on the search term.
        // Assuming column indices: 2 (Nama Siswa), 1 (No. Peserta), and 18 (Lembaga).
        const newData = data.filter(
          (student) =>
            student[2]?.toString().toLowerCase().includes(newSearchTerm) ||
            student[1]?.toString() === newSearchTerm,
        );
        setFilteredData(newData);
      }
    }, 300), // 300ms delay. Adjust as needed.
    [data], // Recreate the debounced function if the `data` state changes.
  );

  // The onChange handler for the input field.
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // Call the debounced function with the lowercase search term.
    debouncedSearch(newSearchTerm.toLowerCase());
  };

  return (
    <div className="relative h-screen overflow-x-auto bg-[url(assets/bg.png)] bg-cover bg-center py-4 pr-2 pl-2.5 bg-blend-multiply">
      <div className="flex-column flex flex-wrap items-center justify-between space-y-4 pb-4 sm:flex-row sm:space-y-0">
        <div>
          <button
            id="dateDropdownButton"
            data-dropdown-toggle="dateDropdown"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              className="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
              />
            </svg>
            {convertDateString(date[selectedDate])}
            <svg
              className="ms-2.5 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dateDropdown"
            className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: "absolute",
              inset: "auto auto 0px 0px",
              margin: 0,
              transform: "translate3d(522.5px, 3847.5px, 0px)",
            }}
          >
            <ul
              className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dateDropdownButton"
            >
              {date.map((str, key) => (
                <li key={key}>
                  <div
                    className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {
                      if (key != selectedDate) changeData(key);
                    }}
                  >
                    <input
                      id={`date-` + key}
                      type="radio"
                      defaultValue=""
                      name="filter-radio"
                      // defaultChecked={key == 0}
                      defaultChecked={key == selectedDate}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label
                      htmlFor={`date-` + key}
                      className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {convertDateString(str)}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            id="typeDropdownButton"
            data-dropdown-toggle="typeDropdown"
            className="ml-2 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              className="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            Last 30 days
            <svg
              className="ms-2.5 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="typeDropdown"
            className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: "absolute",
              inset: "auto auto 0px 0px",
              margin: 0,
              transform: "translate3d(522.5px, 3847.5px, 0px)",
            }}
          >
            <ul
              className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="typeDropdownButton"
            >
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    defaultValue=""
                    name="filter-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="filter-radio-example-1"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last 1day
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    defaultChecked=""
                    id="filter-radio-example-2"
                    type="radio"
                    defaultValue=""
                    name="filter-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="filter-radio-example-2"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last 7 days
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-3"
                    type="radio"
                    defaultValue=""
                    name="filter-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="filter-radio-example-3"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last 30 days
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-4"
                    type="radio"
                    defaultValue=""
                    name="filter-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="filter-radio-example-4"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last month
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    defaultValue=""
                    name="filter-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="filter-radio-example-5"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last year
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0">
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Cari Nama Siswa / No. Peserta"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {selectedDate == 0 ? (
        <SAINTEKTable data={filteredData} />
      ) : (
        <SAINTEKOldTable data={filteredData} />
      )}
    </div>
  );
}

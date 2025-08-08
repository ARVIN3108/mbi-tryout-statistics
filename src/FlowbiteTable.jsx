import { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
export default function FlowbiteTable() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // The path is relative to the `public` folder
    const filePath = `/data/27-7-25/saintek.xlsx`;

    fetch(filePath)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");

        return response.blob();
      })
      .then((blob) => readXlsxFile(blob))
      .then((rows) => {
        setData(rows);
      })
      .catch((err) => {
        console.error("Error reading the Excel file:", err);
        setData(null);
      });
  }, []); // The empty dependency array ensures this effect runs only once
  return (
    <div className="relative h-screen overflow-x-auto px-6 py-4">
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
                    Last day
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
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Cari Nama Siswa / No. Peserta"
          />
        </div>
      </div>
      <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4 whitespace-nowrap">
              Rank
              <br />
              Se-AU
            </th>
            <th scope="col" className="px-6 py-3">
              No. Peserta
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Siswa
            </th>
            <th scope="col" className="p-4">
              INA
              <br />
              BNR
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Rata
              <br />
              Rata
            </th>
            <th scope="col" className="px-6 py-3">
              Lembaga
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{rowIndex + 1}</td>
                {row.map((cell, cellIndex) => {
                  if (cellIndex == 1 || cellIndex == 17)
                    return <td className="px-6 py-4">{cell}</td>;
                  if (cellIndex == 2)
                    return (
                      <th
                        scope="row"
                        className="px-6 py-4 text-left font-medium whitespace-nowrap text-gray-900 dark:text-white"
                      >
                        {cell}
                      </th>
                    );
                  if (cellIndex >= 3 && cellIndex <= 16)
                    return (
                      <td className="w-4 p-4">
                        {parseFloat(parseFloat(cell).toFixed(2))}
                      </td>
                    );
                  return <td className="w-4 p-4">{cell}</td>;
                })}
              </tr>
            ))}
          <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">154</td>
            <td className="px-6 py-4">3112526001</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="w-4 p-4">1</td>
            <td className="px-6 py-4">Silver</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

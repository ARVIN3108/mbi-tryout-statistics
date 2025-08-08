import { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";

function LocalExcelReader() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The path is relative to the `public` folder
    const filePath = `/data.xlsx`;

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => readXlsxFile(blob))
      .then((rows) => {
        setData(rows);
        setError(null);
      })
      .catch((err) => {
        console.error("Error reading the Excel file:", err);
        setError(
          "Could not read the Excel file. Please ensure it's in the public folder and accessible.",
        );
        setData(null);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div>
      <h2>Data from a Project-Local Excel File</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              {data[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LocalExcelReader;

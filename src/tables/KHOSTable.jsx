export default function KHOSTable({ data }) {
  return (
    <table className="text-center text-sm text-gray-500 opacity-90 rtl:text-right dark:text-gray-400">
      <thead className="border-b-2 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-300">
        <tr>
          <th scope="col" className="rounded-tl-lg p-2">
            No
          </th>
          <th scope="col" className="p-2 whitespace-nowrap">
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
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-5">ISTIMA'</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-6">QIROAH</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-6.5">KITABAH</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-6">NAHWU</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-6">SHOROF</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="p-3.5">
            <br />
            BNR
          </th>
          <th scope="col" className="p-3.5">
            <span className="absolute -mt-0.5 -ml-8.5">BALAGHOH</span>
            <br />
            SLH
          </th>
          <th scope="col" className="p-3.5">
            <br />
            NIL
          </th>
          <th scope="col" className="px-6 py-3">
            Total
          </th>
          <th scope="col" className="rounded-tr-lg px-6 py-3">
            Lembaga
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex != data.length - 1 && "border-b-2"} border-gray-200 bg-white font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600`}
            >
              <td
                className={`w-2 p-2 ${rowIndex == data.length - 1 && "rounded-bl-lg"}`}
              >
                {rowIndex + 1}
              </td>
              {row.map((cell, cellIndex) => {
                if (cellIndex == 1 || cellIndex == 22)
                  return (
                    <td
                      key={cellIndex}
                      className={`px-6 py-4 ${cellIndex == 22 && `text-gray-900 dark:text-white ${rowIndex == data.length - 1 && "rounded-br-lg"}`}`}
                    >
                      {cell}
                    </td>
                  );
                if (cellIndex == 2)
                  return (
                    <th
                      key={cellIndex}
                      scope="row"
                      className="px-6 py-4 text-left whitespace-nowrap text-gray-900 dark:text-white"
                    >
                      {cell}
                    </th>
                  );
                if (cellIndex >= 3 && cellIndex <= 21)
                  return (
                    <td key={cellIndex} className="w-3 p-3">
                      {parseFloat(parseFloat(cell).toFixed())}
                    </td>
                  );
                return (
                  <td
                    key={cellIndex}
                    className={`w-2 p-2 ${cellIndex == 0 && "text-gray-900 dark:text-white"}`}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

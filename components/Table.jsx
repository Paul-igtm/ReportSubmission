import React from "react";
import { useContext } from "react";
import { LoginContext } from "./Context";

const Table = () => {
  const { students, loading } = useContext(LoginContext);
  return (
    <div>
      <div className="flex justify-center md:mx-20 overflow-x-auto relative shadow-md sm:rounded-lg pb-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-purple-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="sm:px-3 md:px-6 py-3">
                Name
              </th>
              <th scope="col" className="sm:px-3 md:px-6 py-3 ">
                Matric
              </th>
              <th scope="col" className="sm:px-3 md:px-6 py-3 ">
                Category
              </th>
              <th scope="col" className="sm:px-3 md:px-6 py-3">
                TimeStamp
              </th>
              <th scope="col" className="sm:px-3 md:px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((students, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {students.data.FullName}
                  </th>
                  <td className="py-4 sm:px-3 md:px-6">
                    {students.data.MatricNumber}
                  </td>
                  <td className="py-4 sm:px-3 md:px-6">
                    {students.data.Class}
                  </td>
                  <td className="py-4 sm:px-3 md:px-6">
                    {students.data.datetime}
                  </td>
                  <td className="py-4 sm:px-3 md:px-6 ">
                    {students.data.remark}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

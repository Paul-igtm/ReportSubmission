import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Table from "../components/Table";
import Form from "../components/Form";
import { LoginContext, ThankContext } from "../components/Context";
import Deadline from "../components/Deadline";
import exportFromJSON from "export-from-json";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter, Router } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [submit, setsubmit] = useState(true);
  const [download, setdownload] = useState([]);
  const [remark, setRemark] = useState("");
  const [removeTimer, setRemoveTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [datetime, setDatetime] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadlineDisplay, setdeadlineDisplay] = useState("");

  const deadline = new Date("12/21/2022 12:00");

  //Conversions
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const getTime = () => {
    const time = deadline - new Date();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (minutes > 0) {
      setRemoveTimer(false);
      setRemark("Full");
      setsubmit(true);
    } else if (
      minutes < 0 &&
      minutes > -15 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 15 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-15");
      setsubmit(true);
    } else if (
      minutes <= -15 &&
      minutes > -30 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Last Submission 30 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-30");
      setsubmit(true);
    }
    if (
      minutes <= -30 &&
      minutes > -45 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 45 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-45");
      setsubmit(true);
    } else if (
      minutes <= -45 &&
      minutes > -60 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 60 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-60");
      setsubmit(true);
    } else if (hours <= -2) {
      setdeadlineDisplay(
        "Deadline has been exceeded! You cant submit any longer"
      );
      setRemoveTimer(true);
      setsubmit(false);
    } else if (days < -1) {
      setdeadlineDisplay(
        "Deadline has been exceeded! You can't submit any longer"
      );
      setsubmit(false);
      setRemoveTimer(true);
    }

    console.log(days);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  //Get Current Date and Time

  const getDateTime = () => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    return setDatetime(date);
  };
  //Session
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    getDateTime();

    //Fetch Submission Data from the API
    const fetchData = async () => {
      setLoading(true);

      const res = await axios.get(
        "https://api.netlify.com/api/v1/sites/b5c57396-6b17-4c15-882c-18c89ce8a5b3/submissions",
        {
          headers: {
            Authorization: "bearer IkTYCDR_LxGCeiP8VYas5T0Vv7jn73V29jQtbx20MdQ",
          },
        }
      );
      setStudents(res.data);
      let downloads = res.data;
      let downloadData = downloads.map((download) => {
        let down = download.data;
        const { FullName, Matric, Section, datetime, remark, ReportFile } =
          down;

        return {
          Name: FullName,
          Matric: Matric,
          Section: Section,
          DateTime: datetime,
          Remark: remark,
          ReportFile: ReportFile.url,
        };
      });
      setdownload(downloadData);
      console.log(download);
    };

    fetchData();
  }, []);

  const data = download;

  //Exports to CSV file

  const ExporttoCSV = () => {
    const fileName = "reportsubmitions";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };
  const ExporttoXLS = () => {
    const fileName = "reportsubmissions";
    const exportType = "xls";

    exportFromJSON({ data, fileName, exportType });
  };

  //Get Current Posts
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="">
        <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4900EE] to-indigo-600 drop-shadow-2xl">
          Project Report Submission
        </h1>
        <div className="flex justify-center mb-20">
          <form
            id="form"
            name="report"
            encType="multipart/form-data"
            method="POST"
            data-netlify="true"
          >
            <ThankContext.Provider value={{ deadlineDisplay }}>
              <Deadline />
            </ThankContext.Provider>
            {removeTimer ? null : (
              <div class="pt-8" id="countdown">
                <div class="w-full bg-purple-500 flex justify-center rounded-md">
                  <span class="flex gap-2">
                    <span class="flex justify-center items-center flex-col w-16 h-16  rounded-lg">
                      <p id="days" class="text-2xl text-white">
                        {days}
                      </p>
                      <p class="text-sm text-white">Days</p>
                    </span>
                    <span class="flex justify-center items-center flex-col w-16 h-16  rounded-lg">
                      <p id="hours" class="text-2xl text-white">
                        {hours}
                      </p>
                      <p class="text-sm text-white">Hours</p>
                    </span>
                    <span class="flex justify-center items-center flex-col w-16 h-16  rounded-lg">
                      <p id="minutes" class="text-2xl text-white">
                        {minutes}
                      </p>
                      <p class="text-sm text-white">Minutes</p>
                    </span>
                    <span class="flex justify-center items-center flex-col w-16 h-16  rounded-lg">
                      <p id="seconds" class="text-2xl text-white">
                        {seconds}
                      </p>
                      <p class="text-sm text-white">Seconds</p>
                    </span>
                  </span>
                </div>
              </div>
            )}
            <input type="hidden" name="form-name" value="report" />
            <input type="hidden" name="_subject" value="Project Report" />
            <div className="mt-4 bg-white shadow-md rounded-lg text-left">
              <div className="h-2 bg-purple-400 rounded-t-md"></div>
              <input type="hidden" name="datetime" value={datetime} />
              <input type="hidden" name="remark" value={remark} />
              <div className="px-8 py-6 ">
                <label className="block font-semibold"> Full Name </label>
                <input
                  type="text"
                  name="FullName"
                  placeholder="e.g. Paul Olusanya"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                  required
                />
                <label className="block mt-3 font-semibold">
                  Matric Number
                </label>
                <input
                  type="text"
                  name="MartricNumber"
                  placeholder="e.g 170211038"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                  required
                />
                <label className="block mt-3 font-semibold"> Class </label>
                <select
                  type="text"
                  name="Class"
                  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                  required
                >
                  <option value="Regular">Regular</option>
                  <option value="DirectEntry">Direct Entry</option>
                </select>
                <label className="block mt-3 font-semibold">
                  {" "}
                  File Upload{" "}
                </label>
                <input
                  type="file"
                  name="Report"
                  className="border w-full px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md file:bg-purple-500 file:rounded-md file:text-white file:border-none"
                  required
                />
                <div className="flex justify-betwrveen items-baseline">
                  <button
                    type="submit"
                    className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 "
                    onClick={getDateTime}
                    disabled={submit ? false : true}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Table />
      </div>
    </>
  );
}

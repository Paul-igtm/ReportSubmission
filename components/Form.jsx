import React from "react";

const Form = () => {
  return (
    <div className="flex justify-center mb-20">
      <form
        action="https://formsubmit.co/rotimiolusanya950@gmail.com"
        id="form"
        method="POST"
      >
        <input type="hidden" name="_template" value="table" />
        <input
          type="hidden"
          name="_next"
          value="https://paulreportsubmission.netlify.app/thanks"
        />
        <input type="hidden" name="_subject" value="Project Report" />
        <input type="hidden" name="_captcha" value="false" />
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6 ">
            <label className="block font-semibold"> Full Name </label>
            <input
              type="text"
              name="FullName"
              placeholder="e.g. Paul Olusanya"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              required
            />
            <label className="block mt-3 font-semibold"> Matric Number </label>
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
            <label className="block mt-3 font-semibold"> File Upload </label>
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
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

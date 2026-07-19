import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

  const [data, setData] = useState({
    average_attendance: 0,
    average_marks: 0,
    average_study_hours: 0,
    average_sleep_hours: 0,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/analytics")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Student Analytics
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-indigo-600 text-white p-6 rounded-xl">
          <h3>Average Attendance</h3>
          <p className="text-4xl font-bold">
            {data.average_attendance}%
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl">
          <h3>Average Marks</h3>
          <p className="text-4xl font-bold">
            {data.average_marks}
          </p>
        </div>

        <div className="bg-orange-600 text-white p-6 rounded-xl">
          <h3>Study Hours</h3>
          <p className="text-4xl font-bold">
            {data.average_study_hours}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl">
          <h3>Sleep Hours</h3>
          <p className="text-4xl font-bold">
            {data.average_sleep_hours}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Analytics;
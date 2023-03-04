"use client";

import { useEffect, useState } from "react";

import { Montserrat } from "@next/font/google";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ExportData from "@/components/exportData/ExportData";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function Activity() {
  const [activityData, setActivityData] = useState<any>(null);
  let [exportData, setExportData] = useState<any>(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      let exportDataTmp = [["Resource", "Activity", "Owner", "Date", "Time"]];
      const activityRef = collection(db, "activity");
      const activityRefQuery = query(activityRef, orderBy("date", "desc"));
      const snapshots = await getDocs(activityRefQuery).then((snapshots) => {
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          exportDataTmp.push([
            data.resource,
            data.activity,
            data.owner,
            data.date,
            data.time,
          ]);
          return data;
        });
        console.log(docs);
        setActivityData(docs);
        console.log(docs);
        const firebaseDate = docs[0].date;
        console.log(
          "this is the converted firebase date",
          firebaseDate.toDate().toDateString()
        );
        setExportData(exportDataTmp);
      });
    };
    fetchActivityData();
  }, []);

  return (
    <div className="flex flex-col justify-center py-10 md:px-40 lg:px-40 m-3 flex-wrap w-[100%]">
      <span className="font-bold">Activity Log</span>
      <hr className="mt-5"></hr>
      <table className="mt-5 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm">
        <thead className="text-[#B2B2B2]">
          <tr className="text-left">
            <th>Resource</th>
            <th>Activity</th>
            <th>Owner</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        {activityData ? (
          <tbody>
            {activityData.map((data: any) => (
              <tr key={data.id}>
                <td>{data.resource}</td>
                <td>{data.activity}</td>
                <td>{data.owner}</td>
                <td>{data.date.toDate().toDateString()}</td>
                <td>{data.time}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="mt-5 text-[#B2B2B2]">
            <span>Loading activity data...</span>
          </div>
        )}
      </table>
    </div>
  );
}

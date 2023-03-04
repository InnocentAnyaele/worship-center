"use client";

import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { Montserrat } from "@next/font/google";
import ExportData from "@/components/exportData/ExportData";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddAsset from "@/components/addAsset/AddAsset";

export default function Asset() {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isViewAssetOpen, setIsViewAssetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [assetData, setAssetData] = useState<any>(null);
  //   const [viewAssetData, setViewAssetData] = useState<any>("");
  let [exportData, setExportData] = useState<any>(null);

  let [deleteModal, setDeleteModal] = useState(false);
  let [deleteID, setDeleteID] = useState("");
  const [deleteError, setDeleteError] = useState("");

  function openDeleteModal(id: string) {
    setDeleteID(id);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteID("");
    setDeleteModal(false);
  }

  function closeAddAssetModal() {
    setIsAddAssetOpen(false);
  }

  function openAddAssetModal() {
    setIsAddAssetOpen(true);
  }

  function closeViewAssetModal() {
    setIsViewAssetOpen(false);
  }

  function openViewAssetModal() {
    setIsViewAssetOpen(false);
  }

  function uploadActivity() {
    try {
      const activityRef = collection(db, "activity");
      const owner: string | null = localStorage.getItem("userEmail");
      var date = new Date();
      var options: any = { hour: "numeric", minute: "2-digit" };
      let currTime = date.toLocaleTimeString("en-US", options);
      let activity = "Delete";
      addDoc(activityRef, {
        resource: "Asset",
        activity: activity,
        owner: owner,
        date: new Date(),
        time: currTime,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          setDeleteError("Could not delete");
        });
    } catch (error) {
      setDeleteError("Could not delete");
    }
  }

  function deleteHandler() {
    const docRef = doc(db, "asset", deleteID);
    deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
        // setDeleteError('')
        // window.location.reload();
        uploadActivity();
      })
      .catch((err) => {
        console.log(err);
        setDeleteError("Could not delete");
      });
  }

  useEffect(() => {
    const fetchAssetData = async () => {
      let exportDataTmp = [
        [
          "Name",
          "Type",
          "Model",
          "Serial Number",
          "Tag Number",
          "Location",
          "Date purchased",
        ],
      ];
      const assetRef = collection(db, "asset");
      const assetRefQuery = query(assetRef, orderBy("purchaseDate", "desc"));
      const snapshots = await getDocs(assetRefQuery).then((snapshots) => {
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          exportDataTmp.push([
            data.name,
            data.type,
            data.model,
            data.serialNo,
            data.tagNo,
            data.location,
            data.purchaseDate,
          ]);
          data.id = doc.id;
          return data;
        });
        setAssetData(docs);
        setExportData(exportDataTmp);
      });
    };
    fetchAssetData();
  }, []);

  async function searchHandler() {
    if (search) {
      const memberRef = collection(db, "asset");
      const memberRefQuery = query(memberRef, where("name", "==", search));
      const snapshots = await getDocs(memberRefQuery);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      console.log(docs);
      setAssetData(docs);
    }
  }

  return (
    <div className="flex m-3 flex-col justify-center py-10 md:px-40 lg:px-40 flex-wrap w-[100%]">
      <Transition appear show={isAddAssetOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`${montserrat.variable} font-sans relative z-10 text-sm`}
          onClose={closeAddAssetModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform min-w-[30%] text-left overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Add Asset
                  </Dialog.Title>
                  <AddAsset />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog
          as="div"
          className={`${montserrat.variable} font-sans relative z-10 text-sm`}
          onClose={closeDeleteModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="text-center transform w-auto overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-bold leading-6 text-gray-900"
                  >
                    Are you sure you want to delete?
                  </Dialog.Title>
                  <div className="m-5 space-x-3">
                    <button
                      className="bg-[#c16161] px-6 py-2 rounded"
                      onClick={deleteHandler}
                    >
                      <span className="text-white text-sm">Yes</span>
                    </button>
                    <button
                      className="bg-[#789e56] px-6 py-2 rounded"
                      onClick={closeDeleteModal}
                    >
                      <span className="text-white text-sm">No</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="flex flex-row justify-between flex-wrap">
        <div className="rounded border-2 h-10">
          <FontAwesomeIcon
            className="px-2"
            icon={faSearch}
            onClick={searchHandler}
          />
          <input
            className="h-full p-2"
            placeholder="search by asset name"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
        {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
        <div className="flex flex-col items-center">
          <button
            className="bg-[#8B7E74] px-2 h-10 rounded w-40  md:my-0 lg:my-0"
            onClick={() => openAddAssetModal()}
          >
            <span className="text-white text-sm">Add Asset</span>
          </button>
        </div>
      </div>

      {exportData && <ExportData data={exportData} />}

      {deleteError && (
        <div
          className={`text-center text-sm font-regular text-white bg-red-400 border p-1 rounded my-5`}
        >
          <span>{deleteError}</span>
        </div>
      )}
      <table className="mt-10 border-separate table-auto border-spacing-y-[20px]  text-[15px] w-[100%] flex-wrap text-sm">
        <thead className="text-[#B2B2B2]">
          <tr className="text-left">
            <th>No.</th>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Tag Number</th>
            <th>Location</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        {assetData ? (
          <tbody>
            {assetData.map((data: any, index: any) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.type}</td>
                <td>{data.model}</td>
                <td>{data.serialNo}</td>
                <td>{data.tagNo}</td>
                <td>{data.location}</td>
                <td>{data.purchaseDate}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="red"
                    onClick={() => openDeleteModal(data.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="mt-5 text-[#B2B2B2]">
            <span>Loading asset data...</span>
          </div>
        )}
      </table>
    </div>
  );
}

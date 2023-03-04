import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function AddMember(props: any) {
  let edit: boolean;

  if (props.data.lastName) {
    edit = true;
  } else {
    edit = false;
  }

  console.log(edit);
  console.log("edit data", props.data);

  const [profile, setProfile] = useState<any>(null);
  const [welfare, setWelfare] = useState(props.data.welfare);
  const [lastName, setLastName] = useState(props.data.lastName);
  const [otherNames, setOtherNames] = useState(props.data.otherNames);
  const [address, setAddress] = useState(props.data.address);
  const [sex, setSex] = useState(props.data.sex);
  const [dateOfBirth, setDateOfBirth] = useState(props.data.dateOfBirth);
  const [nationality, setNationality] = useState(props.data.nationality);
  const [occupation, setOccupation] = useState(props.data.occupation);
  const [phone, setPhone] = useState(props.data.phone);
  const [hometown, setHometown] = useState(props.data.hometown);
  const [region, setRegion] = useState(props.data.region);
  const [residence, setResidence] = useState(props.data.residence);
  const [maritalStatus, setMaritalStatus] = useState(props.data.maritalStatus);
  const [department, setDepartment] = useState(props.data.department);
  const [spouseName, setSpouseName] = useState(props.data.spouseName);
  const [fatherName, setFatherName] = useState(props.data.fatherName);
  const [motherName, setMotherName] = useState(props.data.motherName);
  const [childrenName, setChildrenName] = useState(props.data.childrenName);
  const [nextOfKin, setNextOfKin] = useState(props.data.nextOfKin);
  const [nextOfKinPhone, setNextOfKinPhone] = useState(
    props.data.nextOfKinPhone
  );
  const [declaration, setDeclaration] = useState(props.data.declaration);
  const [dateOfFirstVisit, setDateOfFirstVisit] = useState(
    props.data.dateOfFirstVisit
  );
  const [dateOfBaptism, setDateOfBaptism] = useState(props.data.dateOfBaptism);
  const [membership, setMembership] = useState(props.data.membership);
  const [dateOfTransfer, setDateOfTransfer] = useState(
    props.data.dateOfTransfer
  );
  const [officerInCharge, setOfficerInCharge] = useState(
    props.data.officerInCharge
  );
  const [officerSignatureDate, setOfficerSignatureDate] = useState(
    props.data.officerSignatureDate
  );
  const [headPastorSignatureDate, setHeadPastorSignatureDate] = useState(
    props.data.headPastorSignatureDate
  );
  const [status, setStatus] = useState(props.data.status);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function setFiles(e: any) {
    setProfile(e.target.files[0]);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    let data: any = {
      welfare: welfare,
      lastName: lastName,
      otherNames: otherNames,
      address: address,
      sex: sex,
      dateOfBirth: dateOfBirth,
      nationality: nationality,
      occupation: occupation,
      phone: phone,
      hometown: hometown,
      region: region,
      residence: residence,
      maritalStatus: maritalStatus,
      department: department,
      spouseName: spouseName,
      fatherName: fatherName,
      motherName: motherName,
      childrenName: childrenName,
      nextOfKin: nextOfKin,
      nextOfKinPhone: nextOfKinPhone,
      declaration: declaration,
      dateOfFirstVisit: dateOfFirstVisit,
      dateOfBaptism: dateOfBaptism,
      membership: membership,
      dateOfTransfer: dateOfTransfer,
      officerInCharge: officerInCharge,
      officerSignatureDate: officerSignatureDate,
      headPastorSignatureDate: headPastorSignatureDate,
      status: status,
      dateAdded: new Date(),
    };

    console.log(data);

    const dbRef = collection(db, "members");

    function uploadActivity() {
      try {
        const activityRef = collection(db, "activity");
        const owner: string | null = localStorage.getItem("userEmail");
        var date = new Date();
        var options: any = { hour: "numeric", minute: "2-digit" };
        let currTime = date.toLocaleTimeString("en-US", options);
        let activity = "edit" ? "Edit" : "Add";
        addDoc(activityRef, {
          resource: "Member",
          activity: activity,
          owner: owner?.toString(),
          date: new Date(),
          time: currTime,
        })
          .then(() => {
            setError("");
            setSuccess("Success");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            setSuccess("");
            setError("Something went wrong");
          });
      } catch (error) {
        console.log(error);
        setSuccess("");
        setError("Something went wrong");
      }
    }

    if (!edit) {
      try {
        console.log(profile);
        const imageRef = ref(
          storage,
          `images/${welfare}-${lastName}-${otherNames}-${Date.now()}`
        );
        uploadBytes(imageRef, profile)
          .then((res) => {
            getDownloadURL(imageRef).then((url) => {
              const imageUrl: string = url;
              try {
                data.imageUrl = imageUrl;
                addDoc(dbRef, data)
                  .then((docRef) => {
                    console.log(docRef);
                    console.log(docRef.id);
                    uploadActivity();
                  })
                  .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    setError("Something went wrong");
                  });
              } catch (e) {
                console.log(e);
                setSuccess("");
                setError("Something went wrong");
              }
            });
          })
          .catch((err) => {
            console.log(err);
            setSuccess("");
            setError("Something went wrong");
          });
      } catch (err) {
        console.log(err);
        setSuccess("");
        setError("Something went wrong");
      }
    }

    if (edit) {
      const docRef = doc(db, "members", props.data.id);
      if (!profile) {
        console.log("You are updating the document without a profile");
        try {
          data.imageUrl = props.data.imageUrl;
          setDoc(docRef, data)
            .then((docRef) => {
              uploadActivity();
            })
            .catch((err) => {
              console.log(err);
              setSuccess("");
              setError("Something went wrong");
            });
        } catch (e) {
          console.log(e);
          setSuccess("");
          setError("Something went wrong");
        }
      } else {
        try {
          console.log("You are updating the document with a profile");
          console.log(profile);
          const imageRef = ref(
            storage,
            `images/${welfare}-${lastName}-${otherNames}-${Date.now()}`
          );
          uploadBytes(imageRef, profile)
            .then((res) => {
              getDownloadURL(imageRef).then((url) => {
                const imageUrl: string = url;
                data.imageUrl = imageUrl;

                try {
                  setDoc(docRef, data)
                    .then((docRef) => {
                      console.log("Document has been updated");
                      const oldImageRef = ref(storage, props.data.imageUrl);
                      deleteObject(oldImageRef)
                        .then((res) => {
                          console.log(res);
                          setError("");
                          setSuccess("Updated successful");
                          window.location.reload();
                        })
                        .catch((err) => {
                          setSuccess("");
                          setError("Something went wrong");
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      setSuccess("");
                      setError("Something went wrong");
                    });
                } catch (e) {
                  console.log(e);
                  setSuccess("");
                  setError("Something went wrong");
                }
              });
            })
            .catch((err) => {
              console.log(err);
              setSuccess("");
              setError("Something went wrong");
            });
        } catch (err) {
          console.log(err);
          setSuccess("");
          setError("Something went wrong");
        }
      }
    }
  }

  return (
    // <div className="w-[50%] rounded border p-5 h-[100vh] overflow-auto text-sm">
    <form
      className="flex flex-col flex-wrap mt-10 w-auto"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col">
        <label>Upload Profile Image</label>
        {edit ? (
          <input
            className="border p-2 rounded"
            name="profile"
            onChange={setFiles}
            type="file"
            accept="image/*"
          />
        ) : (
          <input
            className="border p-2 rounded"
            name="profile"
            onChange={setFiles}
            type="file"
            accept="image/*"
            required
          />
        )}
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Welfare No.</label>
          <input
            className="border p-2 rounded"
            name="welfare"
            value={welfare}
            onChange={(e) => setWelfare(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            className="border p-2 rounded"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Other Names</label>
          <input
            className="border p-2 rounded"
            name="otherNames"
            type="text"
            value={otherNames}
            onChange={(e) => setOtherNames(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            className="border p-2 rounded"
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Sex</label>
          <select
            className="border p-2 rounded w-[190px]"
            name="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col w-[190px]">
          <label>Date of Birth</label>
          <input
            className="border p-2 rounded"
            name="dateOfBirth"
            value={dateOfBirth}
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Nationality</label>
          <input
            className="border p-2 rounded"
            name="nationality"
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Occupation</label>
          <input
            className="border p-2 rounded"
            name="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            className="border p-2 rounded"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Hometown</label>
          <input
            className="border p-2 rounded"
            name="hometown"
            type="text"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Region</label>
          <input
            className="border p-2 rounded"
            name="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Residence</label>
          <input
            className="border p-2 rounded"
            name="residence"
            type="text"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Marital Status</label>
          <select
            className="border p-2 rounded w-[190px]"
            name="maritalStatus"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Department</label>
          <select
            className="border p-2 rounded w-[190px]"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="Men Ministry">Men Ministry</option>
            <option value="Women Ministry">Women Ministry</option>
            <option value="Youth Ministry">Youth Ministry</option>
            <option value="Children Ministry">Children Ministry</option>
          </select>
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Spouse Name</label>
          <input
            className="border p-2 rounded"
            name="spouseName"
            type="text"
            value={spouseName}
            onChange={(e) => setSpouseName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Fathers Name</label>
          <input
            className="border p-2 rounded"
            name="fatherName"
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Mothers Name</label>
          <input
            className="border p-2 rounded"
            name="motherName"
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Children Name</label>
          <textarea
            className="border p-2 rounded"
            name="childrenName"
            value={childrenName}
            onChange={(e) => setChildrenName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Next of Kin</label>
          <input
            className="border p-2 rounded"
            name="nextOfKin"
            type="text"
            value={nextOfKin}
            onChange={(e) => setNextOfKin(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Next of Kin Telephone</label>
          <input
            className="border p-2 rounded"
            name="nextOfKinPhone"
            type="text"
            value={nextOfKinPhone}
            onChange={(e) => setNextOfKinPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Declaration</label>
          <select
            className="border p-2 rounded w-[190px]"
            name="declaration"
            value={declaration}
            onChange={(e) => setDeclaration(e.target.value)}
            required
          >
            <option value="Signed">Signed</option>
            <option value="Unsigned">Unsigned</option>
          </select>
        </div>
        <div className="flex flex-col w-[190px]">
          <label>Date of First Visit</label>
          <input
            className="border p-2 rounded"
            name="dateOfFirstVisit"
            type="date"
            value={dateOfFirstVisit}
            onChange={(e) => setDateOfFirstVisit(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[190px]">
          <label>Date of Baptism</label>
          <input
            className="border p-2 rounded"
            name="dateOfBaptism"
            type="date"
            value={dateOfBaptism}
            onChange={(e) => setDateOfBaptism(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[190px]">
          <label>Membership</label>
          <input
            className="border p-2 rounded"
            name="membership"
            type="text"
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[190px]">
          <label>Date of Transfer</label>
          <input
            className="border p-2 rounded"
            name="dateOfTransfer"
            type="date"
            value={dateOfTransfer}
            onChange={(e) => setDateOfTransfer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[190px]">
          <label>Officer in Charge</label>
          <input
            className="border p-2 rounded"
            name="officerInCharge"
            type="text"
            value={officerInCharge}
            onChange={(e) => setOfficerInCharge(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[190px]">
          <label>Officer Signature Date</label>
          <input
            className="border p-2 rounded"
            name="officerSignatureDate"
            type="date"
            value={officerSignatureDate}
            onChange={(e) => setOfficerSignatureDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[190px]">
          <label>Head Pastor Signature Date</label>
          <input
            className="border p-2 rounded"
            name="headPastorSignatureDate"
            type="date"
            value={headPastorSignatureDate}
            onChange={(e) => setHeadPastorSignatureDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <label>Status</label>
          <select
            className="border p-2 rounded w-[190px]"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {error || success ? (
        <div
          className={`text-center text-white ${
            error ? "bg-red-400 border" : ""
          } ${success ? "bg-green-400 border" : ""} p-2 rounded mb-2`}
        >
          <span>{error && error}</span>
          <span>{success && success}</span>
        </div>
      ) : null}

      <button className="p-2 rounded bg-[#8B7E74] text-white" type="submit">
        Save
      </button>
    </form>
    // </div>
  );
}

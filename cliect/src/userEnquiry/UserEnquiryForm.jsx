import React, { useEffect, useState } from "react";
import { Button, Textarea, TextInput } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserEnquiryList from "./UserEnquiryList";

export default function UserEnquiryForm() {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  // Save or update enquiry
  let saveEnqiry = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data for debugging

    if (formData._id) {
      // Update enquiry
      axios
        .put(
          `http://localhost:8050/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          console.log("Update Response:", res.data); // Check response data
          toast.success("Enquiry updated successfully");
          setformData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllenquiry(); // Refresh the list
        })
        .catch((err) => {
          console.error("Update Error:", err); // Log error for debugging
          toast.error("Failed to update enquiry");
        });
    } else {
      // Insert new enquiry
      axios
        .post("http://localhost:8050/api/website/enquiry/insert", formData)
        .then((res) => {
          console.log("Insert Response:", res.data); // Check response data
          toast.success("Enquiry saved successfully");
          setformData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getAllenquiry(); // Refresh the list
        })
        .catch((err) => {
          console.error("Insert Error:", err); // Log error for debugging
          toast.error("Failed to save enquiry");
        });
    }
  };

  // Fetch all enquiries
  let getAllenquiry = () => {
    axios
      .get("http://localhost:8050/api/website/enquiry/view")
      .then((res) => {
        if (res.data.status) {
          setEnquiryList(res.data.enquiryList);
        }
      })
      .catch((err) => {
        toast.error("Failed to load enquiries");
      });
  };

  // Handle input change
  let getvalue = (e) => {
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    setformData((prevData) => ({
      ...prevData,
      [inputName]: inputvalue,
    }));
  };

  // Fetch all enquiries on mount
  useEffect(() => {
    getAllenquiry();
  }, []); // Empty dependency array ensures this runs only once after the component mounts.

  return (
    <>
      <ToastContainer />
      <h1 className="text-center text-5xl py-6 font-bold">User Enquiry Form</h1>
      <div className="grid grid-cols-[30%_70%] gap-6">
        {/* Enquiry Form  left side 30% form and other list  responsive*/}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={saveEnqiry}>
            <div className="mb-4">
              <TextInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={getvalue}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={getvalue}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <TextInput
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={getvalue}
                placeholder="Enter your phone"
              />
            </div>
            <div className="mb-4">
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={getvalue}
                placeholder="Enter your message"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>

        {/* Enquiry List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <UserEnquiryList
            data={enquiryList}
            getAllenquiry={getAllenquiry}
            setformData={setformData}
          />
        </div>
      </div>
    </>
  );
}

import React from 'react'
import { Table } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function UserEnquiryList({ data, getAllenquiry, setformData }) {

  let deleteRow = (deid) => {
    axios.delete(`http://localhost:8050/api/website/enquiry/delete/${deid}`)
      .then((res) => {
        toast.success('Enquiry deleted successfully');
        getAllenquiry();
      })
      .catch(err => {
        toast.error('Failed to delete enquiry');
      });
  };

  let editRow = (enid) => {
    axios.get(`http://localhost:8050/api/website/enquiry/single/${enid}`)
      .then((res) => {
        setformData(res.data.enquiry);
      })
      .catch(err => {
        toast.error('Failed to load enquiry details');
      });
  };

  return (
    <>
      <div className="py-4 bg-gray-200">
        <ToastContainer />
        <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Sr No</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Message</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.length >= 1 && data.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <span className="text-blue-500 cursor-pointer" onClick={() => editRow(item._id)}>Edit</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-red-500 cursor-pointer" onClick={() => deleteRow(item._id)}>Delete</span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

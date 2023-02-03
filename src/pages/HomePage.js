import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import Layout from "./../components/Layout/Layout";
import { API } from "../global";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState("all");
  const [refrence, setRefrence] = useState("all");
  const [editTable, setEditTable] = useState(null);

  //TableData
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Division",
      dataIndex: "refrence",
      key: "refrence",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditIcon onClick={() => {
            setEditTable(record);
            setShowModal(true);
          }} style={{ color: "lightgreen" }
          } />
          <DeleteIcon onClick={() => handleDelete(record)} style={{ color: "#ff0000de" }} />

        </div>
      ),
      key: "action",
    },
  ];

  //getAllTransaction Data

  //useEffect Hook


  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(`${API}/transactions/get-transaction`, {
          userid: user._id,
          frequency,
          selectDate,
          type,
          refrence,
        });
        setLoading(false);
        setAllTransaction(res.data);

      } catch (error) {
        console.log(error);
        message.error("Failed to Fetch Transaction");
      }
    };

    getAllTransactions();
  }, [frequency, selectDate, type, refrence]);

  //Delete Form Data
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${API}/transactions/delete-transaction`, {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete");
    }
  };

  //Form Handle Sumbit Data
  const handleSumbit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editTable) {
        await axios.post(`${API}/transactions/edit-transaction`, {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editTable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(`${API}/transactions/add-transaction`, {
          ...values,
          userid: user._id,
        });
        setLoading(false);

        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditTable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to Add Transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters my-3 border border-2">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectDate}
              onChange={(values) => setSelectDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>
        </div>
        <div>
          <h6>Select Division</h6>
          <Select value={refrence} onChange={(values) => setRefrence(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="Office">Office</Select.Option>
            <Select.Option value="Personal">Personal</Select.Option>
          </Select>
        </div>
        <div className="add_btn ">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content border border-2">
        <Table columns={columns} dataSource={allTransaction} rowKey="_id" />
      </div>
      <Modal
        title={editTable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSumbit}
          initialValues={editTable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Travel">Travel</Select.Option>
              <Select.Option value="Education">Education</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Select>
              <Select.Option value="Office">Office</Select.Option>
              <Select.Option value="Personal">Personal</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;

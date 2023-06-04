import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductCategories,
  deleteAProductCategory,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [catId, setCatid] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setCatid(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(resetState());
  }, []);
  const pCatState = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${pCatState[i]._id}`}
            className=" fs-3 text-primary"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-primary bg-transparent border-0"
            onClick={() => showModal(pCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCat = (e) => {
    dispatch(deleteAProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCat(catId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Categorylist;

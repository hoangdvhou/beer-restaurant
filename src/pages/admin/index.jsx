import { useLocation } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import moment from "moment";
import { find } from "@/services/prediction";

const columns = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SDT",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Tỉ số",
    key: "guessResult",
    render: (r) => <p>{`${r?.scoreA} - ${r?.scoreB}`}</p>,
  },
  {
    title: "Thời gian",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => (
      <div>
        <p>{moment(text).format("HH:mm:ss")}</p>
        <p style={{ fontSize: 12 }}>{moment(text).format("DD/MM/YYYY")}</p>
      </div>
    ),
  },
];

const AdminPage = () => {
  const { search } = useLocation();
  const [result, setResult] = useState([]);
  const getData = useCallback(async () => {
    const res = await find({});
    if (res?.success) {
      setResult(res?.data?.data?.elementList);
    } else {
      setResult([]);
    }
  }, [setResult]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, [getData]);

  return (
    <>
      <div className="mt-4 px-4">
        <Button className="mb-4">Lọc 15</Button>
        <Table
          pagination={{ pageSize: 15 }}
          rowKey={(r) => r?.id}
          columns={columns}
          dataSource={result}
        />
      </div>
    </>
  );
};

export default React.memo(AdminPage);

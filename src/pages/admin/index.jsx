import { useLocation } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import moment from "moment";
import { find } from "@/services/prediction";
import { FC1, FC2 } from "../home";

const AdminPage = () => {
  const { search } = useLocation();
  const [oneScore, setOneScore] = useState(0);
  const [twoScore, setTwoScore] = useState(0);
  const [result, setResult] = useState([]);

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tỉ số",
      key: "guessResult",
      render: (r) => <p>{`${r?.scoreA} - ${r?.scoreB}`}</p>,
    },
    {
      title: "Thời gian",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => {
        return (
          <div>
            <p>{moment(text).format("HH:mm:ss")}</p>
            <p style={{ fontSize: 12 }}>{moment(text).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
  ];

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

  const onFilter = async () => {
    const res = await find({
      scoreA: oneScore,
      scoreB: twoScore,
      limit: 15,
    });
    if (res?.success) {
      setResult(res?.data?.data?.elementList);
    }
  };

  return (
    <>
      <div className="mt-4 px-4">
        <div style={{ display: "flex" }} className="mb-4">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 8 }}>{FC1}</div>
              <Select
                style={{ marginRight: 8 }}
                defaultValue={0}
                onChange={(e) => {
                  setOneScore(e);
                }}
                options={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 1,
                    label: 1,
                  },
                  {
                    value: 2,
                    label: 2,
                  },
                  {
                    value: 3,
                    label: 3,
                  },
                  {
                    value: 4,
                    label: 4,
                  },
                  {
                    value: 5,
                    label: 5,
                  },
                  {
                    value: 6,
                    label: 6,
                  },
                  {
                    value: 7,
                    label: 7,
                  },
                  {
                    value: 8,
                    label: 8,
                  },
                  {
                    value: 9,
                    label: 9,
                  },
                  {
                    value: 10,
                    label: 10,
                  },
                ]}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 8 }}>{FC2}</div>
              <Select
                style={{ marginRight: 8 }}
                defaultValue={0}
                onChange={(e) => {
                  setTwoScore(e);
                }}
                options={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 1,
                    label: 1,
                  },
                  {
                    value: 2,
                    label: 2,
                  },
                  {
                    value: 3,
                    label: 3,
                  },
                  {
                    value: 4,
                    label: 4,
                  },
                  {
                    value: 5,
                    label: 5,
                  },
                  {
                    value: 6,
                    label: 6,
                  },
                  {
                    value: 7,
                    label: 7,
                  },
                  {
                    value: 8,
                    label: 8,
                  },
                  {
                    value: 9,
                    label: 9,
                  },
                  {
                    value: 10,
                    label: 10,
                  },
                ]}
              />
            </div>
          </div>
          <Button onClick={onFilter}>Lọc</Button>
        </div>
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

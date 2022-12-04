import { Link } from "react-router-dom";
import HeroPng from "@/assets/hero.png";
import Team1Png from "@/assets/team1.png";
import Team2Png from "@/assets/team2.png";
import { Button, Select, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { submit, sendOtp, confirm } from "@/services/prediction";

export default function BeerRestaurantHome() {
  const [enterOtp, setEnterOtp] = useState(false);
  const [guessSuccess, setGuessSuccess] = useState(false);

  const [user, setUser] = useState(null);
  const [oneScore, setOneScore] = useState(0);
  const [twoScore, setTwoScore] = useState(0);
  const [requestId, setRequestId] = useState("");

  const onFinish = async (values) => {
    console.log("values:", values);

    if (!values?.name || !values?.name?.trim()) {
      alert("Vui lòng nhập tên đúng định dạng");
      return;
    }

    const res = await submit({
      name: values?.name?.trim(),
      phone: values?.phone?.trim(),
      scoreA: oneScore,
      scoreB: twoScore,
    });

    if (res?.success) {
      const step2 = await sendOtp({
        phone: values?.phone?.trim(),
        requestId: res?.data?.data?.requestId,
      });
      if (step2?.success) {
        setRequestId(step2?.data?.data?.requestId);
        setEnterOtp(true);
        setUser(values);
      } else {
        alert("Lỗi, vui lòng thử lại");
      }
    } else {
      alert("Lỗi, vui lòng thử lại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onOTPFinish = async (values) => {
    if (!values?.otp || !values?.otp?.trim()) {
      alert("Vui lòng nhập OTP đúng định dạng");
      return;
    }
    const res = await confirm({
      otp: values?.otp,
      phone: user?.phone,
      requestId: requestId,
    });
    if (res?.success) {
      setGuessSuccess(true);
    } else {
      alert("Lỗi, vui lòng thử lại");
    }
  };

  const onOTPFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="mb-10">
      <img src={HeroPng} width={"100%"} height={"auto"} alt="world cup 2022" />
      <div className=" px-4">
        <div style={{ backgroundColor: "lightblue", padding: "16px 32px" }}>
          <p className="text-5xl text-center font-bold">
            Dự đoán tỉ số trận tứ kết 1
          </p>
        </div>
        {guessSuccess ? (
          <div>
            <h3 className="text-3xl">Chúc mừng quý khách</h3>
            <p>
              Họ và tên: <span className="text-2xl">{user?.name}</span>
            </p>
            <p>
              Số điện thoại: <span className="text-2xl">{user?.phone}</span>
            </p>
            <p>Đã dự đoán tỉ số trận đấu tranh trận tứ kết 1</p>
            <div className="flex justify-between items-center text-center lg:w-1/3 m-auto">
              <div className="flex-none">
                <img
                  src={Team1Png}
                  alt="argentina"
                  width={100}
                  height={"auto"}
                />
                <p>Argentina</p>
              </div>
              <div className="flex items-center justify-center gap-2 flex-1">
                {oneScore}
                <div>-</div>
                {twoScore}
              </div>
              <div className="flex-none">
                <img
                  src={Team2Png}
                  alt="argentina"
                  width={100}
                  height={"auto"}
                />
                <p>France</p>
              </div>
            </div>
            <p className="font-bold">
              Quý khách vui lòng chụp lại màn hình kết quả dự đoán để nhận phần
              thưởng nếu dự đoán đúng
            </p>
          </div>
        ) : enterOtp ? (
          <>
            <Form
              name="basic2"
              labelCol={{ lg: 8, xs: 10 }}
              wrapperCol={{ lg: 16, xs: 10 }}
              onFinish={onOTPFinish}
              onFinishFailed={onOTPFinishFailed}
              autoComplete="off"
            >
              <div className="w-full lg:w-1/4 mx-auto my-4 lg:my-10">
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[{ required: true, message: "Yêu cầu nhập OTP!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  className="w-full text-center"
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-sky-500"
                  >
                    Tiếp tục
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center text-center lg:w-1/3 m-auto">
              <div className="flex-none">
                <img
                  src={Team1Png}
                  alt="argentina"
                  width={100}
                  height={"auto"}
                />
                <p>Argentina</p>
              </div>
              <div className="flex items-center justify-center gap-2 flex-1">
                <Select
                  className="lg:w-1/4"
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
                ></Select>

                <div>VS</div>

                <Select
                  className="lg:w-1/4"
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
                ></Select>
              </div>
              <div className="flex-none">
                <img
                  src={Team2Png}
                  alt="argentina"
                  width={100}
                  height={"auto"}
                />
                <p>France</p>
              </div>
            </div>
            <Form
              name="basic"
              labelCol={{ lg: 8, xs: 10 }}
              wrapperCol={{ lg: 16, xs: 10 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="w-full lg:w-1/4 mx-auto my-4 lg:my-10">
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: "^[0][0-9]{9}$",
                      message: "Vui lòng nhập đúng định dạng",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  className="w-full text-center"
                  wrapperCol={{ offset: 0, span: 24 }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-sky-500"
                  >
                    Tiếp tục
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

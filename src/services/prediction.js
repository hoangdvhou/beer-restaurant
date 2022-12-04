import request from "@/utils/request";

// {
//   "fromDate": "2022-12-04T03:56:31.966Z",
//   "limit": 0,
//   "offset": 0,
//   "phone": "string",
//   "toDate": "2022-12-04T03:56:31.966Z"
// }
export async function find(data) {
  try {
    const res = await request.post("/v1.0/prediction/find", data);
    return {
      success: true,
      data: res?.data,
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
}

// {
//   "name": "string",
//   "phone": "string",
//   "scoreA": 0,
//   "scoreB": 0
// }
export async function submit(data) {
  try {
    const res = await request.post("/v1.0/prediction/submit", data);
    return {
      success: true,
      data: res?.data,
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
}

// {
//   "phone": "string",
//   "requestId": "string"
// }
export async function sendOtp(data) {
  try {
    const res = await request.post("/v1.0/prediction/send-otp", data);
    return {
      success: true,
      data: res?.data,
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
}

// {
//   "otp": "string",
//   "phone": "string",
//   "requestId": "string"
// }
export async function confirm(data) {
  try {
    const res = await request.post("/v1.0/prediction/confirm", data);
    return {
      success: true,
      data: res?.data,
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
}

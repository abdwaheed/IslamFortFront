import React, { useState } from "react";
import Navbar from "../components/navbar";

function SettingType() {
  const [sadqa, setSadqa] = useState();
  const [zakat, setZakat] = useState();
  const [pledge, setPledge] = useState();
  const [paymentReceivedIn, setPaymentReceivedIn] = useState();
  const token = localStorage.getItem("token");

  const addData = async (e, url, keyName, dataValue) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          [keyName]: dataValue,
        }),
      });
      const result = await response.json();
      if (!result?.success) {
        alert("failed to add data");
      } else {
        alert("Data added successfully");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
    <Navbar />
      <div>
        <div
          className="container"
          style={{ marginTop: "10%", backgroundColor: "#eff3f6" }}
        >
          <div
            className="row"
            style={{
              backgroundColor: "#eff3f6",
              border: "1px solid #eff3f6",
            }}
          >
            <div
              className="col-md-5  mx-auto py-5"
              style={{ backgroundColor: "white" }}
            >
              <h6>
                <strong> Sadqa </strong>
              </h6>
              <input
                value={sadqa}
                onChange={(e) => setSadqa(e.target.value)}
                type="text"
                className="w-100 py-1"
                style={{ border: "1px solid #D3D3D3" }}
              />
              <button
                onClick={(e) => {
                  addData(e, "/sadqaType", "description", sadqa);
                  setSadqa("");
                }}
                className="py-1 text-white mt-3 btn-warning w-100"
              >
                <strong>Add</strong>
              </button>
            </div>
            <div
              className="col-md-5 mt-sm-4 mt-md-0 mx-auto py-5"
              style={{ backgroundColor: "white" }}
            >
              <h6>
                <strong> Zakat </strong>
              </h6>
              <input
                value={zakat}
                onChange={(e) => setZakat(e.target.value)}
                type="text"
                className="w-100 py-1"
                style={{ border: "1px solid #D3D3D3" }}
              />
              <button
                onClick={(e) => {
                  addData(e, "/zakatType", "description", zakat);
                  setZakat("");
                }}
                className="py-1 mt-3 btn-warning text-white w-100"
              >
                <strong>Add</strong>
              </button>
            </div>
          </div>

          <div
            className="row mt-4"
            style={{
              backgroundColor: "#eff3f6",
              border: "1px solid #eff3f6",
            }}
          >
            <div
              className="col-md-5 mx-auto py-5"
              style={{ backgroundColor: "white" }}
            >
              <h6>
                <strong> Pledge </strong>
              </h6>
              <input
                value={pledge}
                onChange={(e) => setPledge(e.target.value)}
                type="text"
                className="w-100 py-1"
                style={{ border: "1px solid #D3D3D3" }}
              />
              <button
                onClick={(e) => {
                  addData(e, "/pledge", "type", pledge);
                  setPledge("");
                }}
                className="py-1 mt-3 btn-warning text-white w-100"
              >
                <strong>Add</strong>
              </button>
            </div>
            <div
              className="col-md-5 mt-sm-4 mt-md-0 mx-auto py-5"
              style={{ backgroundColor: "white" }}
            >
              <h6>
                <strong> PaymentReceivedIn </strong>
              </h6>
              <input
                value={paymentReceivedIn}
                onChange={(e) => setPaymentReceivedIn(e.target.value)}
                type="text"
                className="w-100 py-1"
                style={{ border: "1px solid #D3D3D3" }}
              />
              <button
                onClick={(e) => {
                  addData(
                    e,
                    "/paymentReceivedIn",
                    "payType",
                    paymentReceivedIn
                  );
                  setPaymentReceivedIn("");
                }}
                className="py-1 mt-3 btn-warning text-white w-100"
              >
                <strong>Add</strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="accountbg"></div>
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mt-0 m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src={logoSm} height="90" alt="logo" />
              </a>
            </h3>

            <div className="p-3">
              <form className="form-horizontal" onSubmit={registerUser}>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required=""
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required=""
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-12">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label font-weight-normal"
                        for="customCheck1"
                      >
                        I accept{" "}
                        <a href="/#" className="text-muted">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20 text-center">
                    <Link to="/login" className="text-muted" value="Already">
                      Already have account?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default SettingType;

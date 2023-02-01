import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/recieptStyle.css";
import { deleteOrGetReciept, getTableData } from "../assets/helperFunctions/apiCall";
import logoSm from "../assets/images/logo-sm.png";
import Navbar from "../components/navbar";
// import { useJwt } from "react-jwt";

function Reciept() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [allSadqaTypes, setAllSadqaTypes] = useState();
  const [allZakatTypes, setAllZakatTypes] = useState();
  const [allPledges, setAllPledges] = useState();
  const [allPaymentRecievedIn, setAllPaymentRecievedIn] = useState();
  const [recieptNumer, setRecieptNumer] = useState();

  const [receivedFrom, setReceivedFrom] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [whatFor, setWhatFor] = useState();
  const [zakatTyeId, setZakatTyeId] = useState();
  const [sadqatyeId, setSadqaTyeId] = useState();
  const [pledgeId, setPledgeId] = useState();
  const [paymentReceivedInId, setPaymentReceivedInId] = useState();
  const [paymentReceivedInValue, setPaymentReceivedInValue] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [amountDue, setAmountDue] = useState();
  const [amountReceived, setAmountReceived] = useState();
  const [chequeNumber, setChequeNumber] = useState();

  const token = localStorage.getItem("token");
  //   const { decodedToken, isExpired } = useJwt(token);

  const resetForm = () => {
    setReceivedFrom("");
    setAmount("");
    setWhatFor("");
    setEmail("");
    setContact("");
    setAmountDue("");
    setAmountReceived("");
    setChequeNumber("");
    setDate("");
    setZakatClear({ selected: "" });
    setSadqaClear({ selected: "" });
    setPaymentReceivedInClear({ selected: "" });
    setPledgeClear({ selected: "" });
    setZakatTyeId('');
    setSadqaTyeId('');
    setPledgeId('');
    setPaymentReceivedInId('');
    setPaymentReceivedInValue('');
  };

  const createReciept = async (e,method) => {
    e.preventDefault();
    try {
      const response = await fetch("/reciept", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          _id: recieptNumer,
          date: date,
          receivedFrom: receivedFrom,
          amount: parseFloat(amount),
          amountFor: whatFor,
          zakatType: zakatTyeId,
          sadqaType: sadqatyeId,
          pledge: pledgeId,
          email: email,
          contact: contact.toString(),
          ...(paymentReceivedInValue === "cheque" && {
            chequeNumber: chequeNumber.toString(),
          }),
          amountDue: parseFloat(amountDue),
          amountReceived: parseFloat(amountReceived),
          paymentReceivedIn: paymentReceivedInId,
        }),
      });
      const result = await response.json();
      if (!result?.success) {
        console.log("result",result);
        alert("Invalid data provided");
      } else {
        resetForm();
        if(!state)
        alert("received added successfully");
        else{
        alert("received edited successfully");
          navigate("/recieptList");
      }

        const newRecieptNumberData = await getTableData(
          "/randomReciept",
          token
        );
        setRecieptNumer(newRecieptNumberData?.randomReciept);
      }
    } catch (e) {
      console.log("error",e);
    }
  };

  const [zakatClear, setZakatClear] = useState({
    data: [],
    selected: "",
  });

  const [sadqaClear, setSadqaClear] = useState({
    data: [],
    selected: "",
  });
  const [pledgeClear, setPledgeClear] = useState({
    data: [],
    selected: "",
  });

  const [paymentReceivedInClear, setPaymentReceivedInClear] = useState({
    data: [],
    selected: "",
  });

  const [isLoader, setisLoader] = useState(true);

  useEffect(() => {

    setTimeout(()=>{
      setisLoader(false);
    },[2000])

    const getAllTablesData = async () => {

      if(state){
        const response = await deleteOrGetReciept("/getReciept",state?.recieptId, token, "POST");
        const result = await response.json();

        if (result?.success && result?.RecieptData) {
          setRecieptNumer(result?.RecieptData?._id)
          setDate(new Date(result?.RecieptData?.date).toISOString().slice(0,10))
          setReceivedFrom(result?.RecieptData?.receivedFrom)
          setAmount(result?.RecieptData?.amount)
          setWhatFor(result?.RecieptData?.amountFor)
          setEmail(result?.RecieptData?.email)
          setContact(result?.RecieptData?.contact)
          setAmountDue(result?.RecieptData?.amountDue)
          setAmountReceived(result?.RecieptData?.amountReceived)
          setPledgeId(result?.RecieptData?.pledge)
          setSadqaTyeId(result?.RecieptData?.sadqaType)
          setZakatTyeId(result?.RecieptData?.zakatType)
          setPaymentReceivedInId(result?.RecieptData?.paymentReceivedIn?._id)
          setPaymentReceivedInValue(result?.RecieptData?.paymentReceivedIn?.payType)
          setChequeNumber(result?.RecieptData?.chequeNumber)
        } else {
          alert("failed to get Reciept")
        }

      }

      if(!state){
      const recieptNumberData = await getTableData("/randomReciept", token);
      setRecieptNumer(recieptNumberData?.randomReciept);
      }

      const zakatTypesData = await getTableData("/zakatTypes", token);
      setAllZakatTypes(zakatTypesData?.allZakatTypes);


      const sadqaTypesData = await getTableData("/sadqaTypes", token);
      setAllSadqaTypes(sadqaTypesData?.allSadqaTypes);


      const pledgeTypesData = await getTableData("/pledges", token);
      setAllPledges(pledgeTypesData?.allPledges);

      const paymentReceivedInData = await getTableData(
        "/allPaymentReceivedIn",
        token
      );

      setAllPaymentRecievedIn(paymentReceivedInData?.allPaymentReceivedIn);

      setZakatClear({ data: zakatTypesData?.allZakatTypes });
      setSadqaClear({ data: sadqaTypesData?.allSadqaTypes });
      setPledgeClear({ data: pledgeTypesData?.allPledges });
      setPaymentReceivedInClear({
        data: paymentReceivedInData?.allPaymentReceivedIn,
      });
    };

    getAllTablesData();
  }, []);


  return (
    <>

    {
      isLoader  &&  <div id="preloader"><div id="status"><div className="spinner"></div></div></div>
    }

    <Navbar />
      <div
        className="wrapper"
        style={{ "padding-top": "65px", backgroundColor: "#eff3f6" }}
      >
        <div className="container-fluid">
          <div className="container-fluid my-3">
            <div className="d-flex row" style={{ margin: "auto" }}>
              <div className="col-md-7" style={{ margin: "auto" }}>
                <div className="card mb-3 shadow no-b r-0">
                  <div
                    className="card-header white-bg logo-main"
                    style={{ "text-align": "center", background: "#2a5789" }}
                  >
                    <img src={logoSm} height="90" alt="logo" />
                  </div>
                  <div className="card-body">
                    <form className="needs-validation" novalidate="">
                      <div className="form-row">
                        <div className="col-md-8 mb-3">
                          <label for="validationCustom01">Reciept # :</label>
                          <span> {recieptNumer} </span>
                        </div>

                        <div className="col-md-4 mb-3">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{
                                  border: 0,
                                  background: "transparent",
                                  "min-width": "56px",
                                }}
                                id="inputGroupPrepend"
                              >
                                Date
                              </span>
                            </div>

                            <input
                            //  defaultValue={new Date(date).toISOString().slice(0,10)}
                             value={date}
                              type="date"
                              onChange={(e) => setDate(e.target.value)}
                              className="form-control"
                              style={{
                                width: "auto",
                                display: "inline",
                                "border-radius": 0,
                                border: "none",
                                "border-bottom": "2px solid #d7d7d7",
                              }}

                              id=""
                              placeholder="11-01-1990"
                              aria-describedby="inputGroupPrepend"
                              required=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-8 mb-3">
                          <label for="validationCustom01">Recieved From</label>
                          <input
                            type="text"
                            onChange={(e) => setReceivedFrom(e.target.value)}
                            className="form-control"
                            id=""
                            placeholder=" Full Name"
                            value={receivedFrom}
                            required=""
                            style={{
                              width: "80%",
                              display: "inline",
                              "border-radius": 0,
                              border: "none",
                              "border-bottom": "2px solid #d7d7d7",
                            }}
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <div
                            className="input-group"
                            style={{ flexWrap: "nowrap" }}
                          >
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{
                                  border: 0,
                                  background: "transparent",
                                  "min-width": "56px",
                                }}
                                id="inputGroupPrepend"
                              >
                                Rs
                              </span>
                            </div>

                            <span>
                              <input
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                className="form-control"
                                style={{
                                  width: "auto",
                                  display: "inline !important",
                                  "border-radius": 0,
                                  border: "none",
                                  "border-bottom": "2px solid #d7d7d7",
                                }}
                                id=""
                                placeholder="100"
                                aria-describedby="inputGroupPrepend"
                                required=""
                              />
                            </span>
                          </div>
                        </div>

                        {/* <div className="col-md-4 mb-3">

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"
                                         style={{"border": 0,
                                        "background": "transparent",
                                        "min-width": "56px"}} id="inputGroupPrepend">Rs</span>
                                    </div>
                                    <input type="text" className="form-control"
                                    style={{"width":"auto","display":"inline !important","border-radius": 0,
                                    "border": "none",
                                    "border-bottom": "2px solid #d7d7d7"}} id="" placeholder="100" aria-describedby="inputGroupPrepend" required=""/>

                                </div>
                            </div> */}
                      </div>

                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label for="validationCustom01">For</label>
                          <input
                            type="text"
                            onChange={(e) => setWhatFor(e.target.value)}
                            className="form-control"
                            id=""
                            placeholder=" Payment Amount"
                            value={whatFor}
                            required=""
                            style={{
                              width: "95%",
                              display: "inline",
                              "border-radius": 0,
                              border: "none",
                              "border-bottom": "2px solid #d7d7d7",
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className="box"
                        style={{ width: "90%", margin: "auto" }}
                      >
                        <div className="box-body">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <th>Donation</th>
                                <th>Pledge</th>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-group">
                                    <div className="form-check">
                                      {/* <select
                                        name=""
                                        id=""
                                        className="p-1"

                                        value={zakatTyeId ? zakatTyeId : zakatClear.selected}
                                        onChange={(e) => {
                                          setZakatTyeId(e.target.value);
                                          setZakatClear({
                                            selected: e.target.value,
                                          });
                                        }}
                                        style={{
                                          borderColor: " #d7d7d7",
                                          color: "#444444",
                                        }}
                                      >
                                        <option value="">
                                          Select Zakat Type
                                        </option>
                                        {allZakatTypes?.map((data) => (
                                          <option

                                            id={data?._id}
                                            value={data?._id}
                                          >
                                            {data?.description}
                                          </option>
                                        ))}
                                      </select> */}
                                        <select
                                        name=""
                                        id=""
                                        className="p-1"
                                        value={zakatTyeId ? zakatTyeId : zakatClear.selected}
                                        onChange={(e) => {
                                          setZakatTyeId(e.target.value);
                                          setZakatClear({
                                            selected: e.target.value,
                                          });
                                        }}
                                        style={{
                                          borderColor: " #d7d7d7",
                                          color: "#444444",
                                        }}
                                      >
                                        <option value="">
                                          Select Zakat Type
                                        </option>
                                        {allZakatTypes?.map((data) => (
                                          <option
                                            id={data?._id}
                                            value={data?._id}
                                          >
                                            {data?.description}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="form-group">
                                    <div className="form-check">
                                      <select
                                        name=""
                                        id=""
                                        className="p-1"
                                        value={pledgeId ? pledgeId : pledgeClear.selected}
                                        onChange={(e) => {
                                          setPledgeId(e.target.value);
                                          setPledgeClear({
                                            selected: e.target.value,
                                          });
                                        }}
                                        style={{
                                          borderColor: " #d7d7d7",
                                          color: "#444444",
                                        }}
                                      >
                                        <option value="">
                                          Select Pledge Type
                                        </option>
                                        {allPledges?.map((data) => (
                                          <option
                                            id={data?._id}
                                            value={data?._id}
                                          >
                                            {data?.type}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-group">
                                    <div className="form-check">
                                      <select
                                        name=""
                                        id=""
                                        className="p-1"
                                        value={sadqatyeId ? sadqatyeId : sadqaClear.selected}
                                        onChange={(e) => {
                                          setSadqaTyeId(e.target.value);
                                          setSadqaClear({
                                            selected: e.target.value,
                                          });
                                        }}
                                        style={{
                                          borderColor: " #d7d7d7",
                                          color: "#444444",
                                        }}
                                      >
                                        <option value="">
                                          Select Sadqa Type
                                        </option>

                                        {allSadqaTypes?.map((data) => (
                                          <option
                                            id={data?._id}
                                            value={data?._id}
                                          >
                                            {data?.description}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="form-row mt-8">
                        <div className="col-md-6 mb-3">
                          <label for="">Email :</label>
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id=""
                            placeholder=" Email"
                            value={email}
                            required=""
                            style={{
                              width: "80%",
                              display: "inline",
                              "border-radius": 0,
                              border: "none",
                              "border-bottom": "2px solid #d7d7d7",
                            }}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <div className="input-group">
                            <label for="">Contact # :</label>
                            <input
                              type="number"
                              onChange={(e) => setContact(e.target.value)}
                              className="form-control"
                              id=""
                              placeholder=" Contact number"
                              value={contact}
                              required=""
                              style={{
                                width: "80%",
                                display: "inline",
                                "border-radius": 0,
                                border: "none",
                                "border-bottom": "2px solid #d7d7d7",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row mt-4">
                        <div className="col-md-6 mb-3">
                          <label for="">Payment Recieved In :</label>
                          <div className="col-md-12 mb-3">
                            <div className="">
                              <select
                                name=""
                                id=""
                                value={paymentReceivedInId ? paymentReceivedInId : paymentReceivedInClear.selected}
                                className="p-1 w-75"
                                onChange={(e) => {
                                  setPaymentReceivedInId(e.target.value);
                                  setPaymentReceivedInValue(
                                    e.target.options[e.target.selectedIndex]
                                      .text
                                  );
                                  if(e.target.options[e.target.selectedIndex]
                                    .text !== "cheque"){
                                      setChequeNumber(null);
                                    }
                                  setPaymentReceivedInClear({
                                    selected: e.target.value,
                                  });
                                }}
                                style={{
                                  borderColor: " #d7d7d7",
                                  color: "#444444",
                                }}
                              >
                                <option value="">
                                  Select Payment Received In
                                </option>
                                {allPaymentRecievedIn?.map((data) => (
                                  <option id={data?._id} value={data?._id}>
                                    {data?.payType}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {paymentReceivedInValue === "cheque" && (
                            <div className="col-md-12 mb-3">
                              <div>
                                <input
                                  type="number"
                                  className="w-75"
                                  id=""
                                  placeholder="Enter Cheque #"
                                  onChange={(e) =>
                                    setChequeNumber(e.target.value)
                                  }
                                  value={chequeNumber}
                                  required=""
                                  style={{
                                    "border-radius": 0,
                                    border: "none",
                                    "border-bottom": "2px solid #d7d7d7",
                                    marginTop: "1rem",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <div
                            className="box"
                            style={{ width: "100%", margin: "auto" }}
                          >
                            <div className="box-body">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <td> Amount Due : </td>
                                    <td>
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          setAmountDue(e.target.value)
                                        }
                                        className="form-control"
                                        id=""
                                        placeholder=""
                                        value={amountDue}
                                        required=""
                                        style={{
                                          width: "80%",
                                          display: "inline",
                                          "border-radius": 0,
                                          border: "none",
                                          "border-bottom": "2px solid #d7d7d7",
                                        }}
                                      />{" "}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td> Amount Recieved : </td>
                                    <td>
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          setAmountReceived(e.target.value)
                                        }
                                        className="form-control"
                                        id=""
                                        placeholder=""
                                        value={amountReceived}
                                        required=""
                                        style={{
                                          width: "80%",
                                          display: "inline",
                                          "border-radius": 0,
                                          border: "none",
                                          "border-bottom": "2px solid #d7d7d7",
                                        }}
                                      />{" "}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td> Balance : </td>
                                    <td> ............. </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div
                            className="input-group"
                            style={{ "margin-top": "50px" }}
                          >
                            <label for="">Signature :</label>
                            <input
                              type="text"
                              className="form-control"
                              id=""
                              value=""
                              required=""
                              style={{
                                width: "80%",
                                display: "inline",
                                "border-radius": 0,
                                border: "none",
                                "border-bottom": "2px solid #d7d7d7",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* setdd({selected:""}); */}
                      <button
                        onClick={(e) => {
                          if(!state){
                            createReciept(e,"POST");
                          }
                          else{
                            createReciept(e,"PUT");
                          }
                        }}
                        className="w-100 main-footer"
                      >
                        <strong>{state? "EDIT" : "Submit"}</strong>
                      </button>

                      {/* <footer className="main-footer" onClick={()=>{console.log("hi");}}>
                      <div className="box-footer">
                          <strong><a href="/#" style={{"color":"white"}}>Submit </a></strong>
                      </div>
                      </footer> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">© 2022 ISLAM FORT.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Reciept;

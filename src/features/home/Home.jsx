import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from "../../components/layouts/Layout";
import PageNotFound from '../../components/common/PageNotFound/PageNotFound';
import { useEffect, useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import paymentDataContext from "../../contexts/PaymentContext";
import { getPreparePaymentData } from "../../services/paymentInterfaceAdapterService"
import { buildPreparePaymentRequest } from "../../services/requestMapper/preparePaymentReqMapper";
import PaymentContext from '../../contexts/PaymentContext';
import { useUser } from '../../contexts/UserContext';

const Home = () => {
  const { user, updateUser } = useUser();
  const { setPreparePaymentData } = useContext(PaymentContext)
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const pegasus_token = searchParams?.get("pegasus_token") || "";
  const entra_token = searchParams?.get("entra_token") || "";
  const pnr = searchParams?.get("pnr") || "";

  /* This method call Entra API to get user details based on entra token*/
  const callUserProfileEntraService = async () => {
    let entraResponse = "";
    //TODO entra API call and set data into userprofile
    const userId = "";
    const userName = ""
    updateUser({ userId: userId, userName: userName, isLoggedIn: true })
  }

  /* This method call prepare payment service and based on the pagetype it will redirect to respective component*/
  const callPreparepaymentService = async (pegasus) => {
    try {
      let preparePaymentRequest = buildPreparePaymentRequest({ ...user, ...pegasus });
      const response = await getPreparePaymentData(preparePaymentRequest);
      setPreparePaymentData(response);
      // redirect to specific functionality based on page type
      console.log("PreparePayment", response)
      if (response?.pageType == "PAYMENT") {
        navigate("/capturepaymentdetails")
      } else if (response?.pageType == "CDC" && pegasus.token != null && pegasus.pnr == "") {
        navigate("/capturecarddetails")
      } else if (response?.pageType == "CDC" && pegasus.pnr != null) {
        navigate("/capturegezimodetails")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn && entra_token) {
      localStorage.setItem('entra_token', entra_token);
      callUserProfileEntraService();
    } else {
      localStorage.setItem('pegasus_token', pegasus_token);
      localStorage.setItem('pegasus_pnr', pnr);
      // navigate("/EntraPage")
    }
    if (user.isLoggedIn) {
      const pegasus= { pegasus_token: localStorage.getItem('pegasus_token'), pnr: localStorage.getItem('pegasus_pnr')}
      updateUser({pegasus: pegasus});
      callPreparepaymentService(pegasus)
    }
  }, []);


  return (
    <></>)
}
export default Home;
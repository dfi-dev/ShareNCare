import axios from "axios";
import { asyncThunkWrapper } from "../../utils/asyncThunkWrapper";
import {
  fetchRecipientStart,
  fetchRecipientSuccess,
  fetchRecipientFailure,
  fetchAvailableDonationsStart,
  fetchAvailableDonationsSuccess,
  fetchAvailableDonationsFailure,
} from "../slices/recipientDataSlice";
import { getData } from "../../utils/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🎯 Fetch recipient request history
export const fetchRecipientHistory = (recipientId) => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => getData(`/api/recipients/${recipientId}/history`),
    startAction: fetchRecipientStart,
    successAction: fetchRecipientSuccess,
    failureAction: fetchRecipientFailure,
  });
}

// 🆕 Fetch available donations for recipient
export const fetchAvailableDonations = () => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => getData(`/api/recipients/available-donations`),
    startAction: fetchAvailableDonationsStart,
    successAction: fetchAvailableDonationsSuccess,
    failureAction: fetchAvailableDonationsFailure,
  });
};

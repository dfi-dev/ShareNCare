import axios from "axios";
import { asyncThunkWrapper } from "../../utils/asyncThunkWrapper";
import {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "../slices/statsSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStats = () => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.get(`${BASE_URL}/api/stats`).then((res) => res.data),
    startAction: fetchStatsStart,
    successAction: fetchStatsSuccess,
    failureAction: fetchStatsFailure,
  });
};

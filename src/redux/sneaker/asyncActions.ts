import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchSneakersArg, Sneaker } from "./types";
import axios from "axios";

export const fetchSneakers = createAsyncThunk<Sneaker[], FetchSneakersArg>(
  "sneaker/fetchSneakersStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Sneaker[]>(
      `https://650733753a38daf4803f3c39.mockapi.io/sneakers?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

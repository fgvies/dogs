import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_CREATE = "FILTER_CREATE";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const GET_DETAIL = "GET_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const GET_QUERY = "GET_QUERY";
export const POST_DOG = "POST_DOG";
export const ORDER_NAME = "ORDER_NAME";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const RESET_DOGS = "RESET_DOGS";
export const GET_QUERY_ERROR = "GET_QUERY_ERROR";

export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/dogs`);
      const dogs = apiData.data;
      dispatch({ type: GET_DOGS, payload: dogs });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getDetailDogs = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/dogs/${id}`);
      const dog = apiData.data;
      dispatch({ type: GET_DETAIL, payload: dog });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const resetDetail = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: RESET_DETAIL });
    } catch (error) {
      return { error: error.message };
    }
  };
};
export const getQueryDogs = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      const dogs = apiData.data;
      dispatch({ type: GET_QUERY, payload: dogs });
    } catch (error) {
      dispatch({ type: GET_QUERY_ERROR, payload: error.message });
    }
  };
};

export const getTemperamentsDogs = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/temperaments`);
      const temperaments = apiData.data;
      dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
    } catch (error) {
      return { error: error.message };
    }
  };
};
export const postDog = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/dogs`, payload);
      const createdDog = response.data;
      dispatch({ type: POST_DOG, payload: createdDog });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const filterByCreate = (created) => {
  return { type: FILTER_CREATE, payload: created };
};

export const filterByTemperaments = (temperaments) => {
  return { type: FILTER_TEMPERAMENTS, payload: temperaments };
};

export const orderByName = (order) => {
  return { type: ORDER_NAME, payload: order };
};

export const orderByWeight = (order) => {
  return { type: ORDER_WEIGHT, payload: order };
};

export const CurrentPage = (page) => {
  return { type: CURRENT_PAGE, payload: page };
};

export const resetDogs = () => {
  return { type: RESET_DOGS };
  
};

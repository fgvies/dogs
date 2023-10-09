import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  GET_DETAIL,
  RESET_DETAIL,
  GET_QUERY,
  FILTER_CREATE,
  CURRENT_PAGE,
  ORDER_WEIGHT,
  ORDER_NAME,
  POST_DOG,
  RESET_DOGS,
} from "./actions";

const initialState = {
  dogs: [],
  selectedDog: null,
  allTemperaments: [],
  allDogs: [],
  filteredDogs: [],
  currentPage: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };

    case GET_DETAIL:
      return { ...state, selectedDog: action.payload };

    case RESET_DETAIL:
      return { ...state, selectedDog: null };

    case GET_QUERY:
      return { ...state, dogs: action.payload, filteredDogs: action.payload };

    case GET_TEMPERAMENTS:
      return { ...state, allTemperaments: action.payload };

    case FILTER_TEMPERAMENTS:
      if (action.payload === "All") {
        return {
          ...state,
          dogs: state.allDogs,
          filteredDogs: state.allDogs,
          currentPage: 0,
        };
      } else {
        const filteredDogs = state.allDogs.filter((dog) => {
          if (dog.temperaments) {
            return dog.temperaments.some((temperament) =>
              typeof temperament === "object"
                ? temperament.name === action.payload
                : temperament === action.payload
            );
          }
          return false;
        });

        return {
          ...state,
          dogs: filteredDogs,
          filteredDogs: filteredDogs,
          currentPage: 0,
        };
      }

    case FILTER_CREATE:
      if (action.payload === "All") {
        return {
          ...state,
          dogs: state.allDogs,
          filteredDogs: state.allDogs,
        };
      } else {
        const isCreated = action.payload === "true";
        const filteredDogs = state.allDogs.filter(
          (dog) => dog.created === isCreated
        );
        return {
          ...state,
          dogs: filteredDogs,
          filteredDogs: filteredDogs,
        };
      }
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case ORDER_NAME:
      const sortedByName = [...state.dogs].sort((a, b) => {
        if (action.payload === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return { ...state, dogs: sortedByName };

    case ORDER_WEIGHT:
      const sortedByWeight = [...state.dogs].sort((a, b) => {
        const weightA = a.weight.split(" - ");
        const weightB = b.weight.split(" - ");
        const minA = parseInt(weightA[0]);
        const minB = parseInt(weightB[0]);

        if (action.payload === "asc") {
          return minA - minB;
        } else {
          return minB - minA;
        }
      });

      return { ...state, dogs: sortedByWeight };

    case POST_DOG:
      return {
        ...state,
        dogs: [...action.payload,...state.dogs],
        allDogs: [...action.payload,...state.dogs],
        filteredDogs: [...action.payload,...state.dogs],
      };

      case RESET_DOGS:
        return{
          ...state,
          dogs:state.allDogs,
          filteredDogs:state.allDogs,
          currentPage: 0
        }

    default:
      return { ...state };
  }
};

export default rootReducer;

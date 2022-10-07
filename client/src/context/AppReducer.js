export default (state, action) => {
  switch (action.type) {
    case "GET_NOTES" :
      return{
        ...state,
        notes:action.payload
      }
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };

    case "ADD_NOTE":
      return {
        state,
        notes: [...state.notes, action.payload],
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload
      }
    default:
      return {
        state,
      };
  }
};

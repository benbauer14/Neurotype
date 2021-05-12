const participantsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PARTICIPANTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default participantsReducer;
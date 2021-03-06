const sessionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SESSION':
        return action.payload;
      case 'RESET_SESSION':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default sessionReducer;
  
const pageReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PAGE':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default pageReducer;
import { createStore } from 'redux';

let reducer = (state, action) => {
  if (action.type === 'login-success') {
    return { ...state, loggedIn: true, username: action.payload };
  }

  if (action.type === 'logout') {
    return {
      ...state,
      loggedIn: false,
      username: undefined,
      crateCount: 0,
      recordsInCrate: [],
      menuOpen: false,
      crateOpen: false
    };
  }

  if (action.type === 'add-to-crate') {
    return {
      ...state,
      recordsInCrate: state.recordsInCrate.concat(action.payload)
    };
  }

  if (action.type === 'remove-from-crate') {
    const ridIndex = state.recordsInCrate.findIndex(record => record._id === action.payload);
    const newArray = state.recordsInCrate;
    newArray.splice(ridIndex, 1);
    return { ...state, recordsInCrate: newArray };
  }

  if (action.type === 'empty-crate') {
    return { ...state, recordsInCrate: [] };
  }

  if (action.type === 'toggle-menu') {
    if (state.menuOpen) {
      return { ...state, menuOpen: false };
    }
    return { ...state, menuOpen: true };
  }

  if (action.type === 'toggle-crate') {
    if (state.crateOpen) {
      return { ...state, crateOpen: false };
    }
    return { ...state, crateOpen: true };
  }

  return state;
};

const store = createStore(
  reducer,
  {
    username: '',
    loggedIn: false,
    crateCount: 0,
    recordsInCrate: [],
    menuOpen: false,
    crateOpen: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

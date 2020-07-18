import PropTypes from 'prop-types';
import React, {createContext, useReducer} from 'react';

import constants from '../utils/constants';

import globalReducer from './globalReducer';

const {VIEWS} = constants;

let initialState = {
  cart: {},
  viewInfo: {view: VIEWS.STORE_FRONT}
};

const GlobalStoreWrapper = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  console.log('GlobalStoreWrapper -> state', state);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

GlobalStoreWrapper.propTypes = {
  children: PropTypes.node
};

export const Context = createContext(initialState);

export default GlobalStoreWrapper;

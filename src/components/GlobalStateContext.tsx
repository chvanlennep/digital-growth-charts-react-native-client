import React, {useState} from 'react';

export type validMeasurementInputTypes = null | string | Date | number;

type blankTypes = {
  showPicker: boolean;
  value: validMeasurementInputTypes;
  timeStamp: null | Date;
  workingValue: validMeasurementInputTypes;
};

export type globalStateType = {[key: string]: blankTypes};

type propTypes = {
  children: React.ReactNode;
};

const blankContext: {
  globalState: globalStateType;
  setGlobalState: Function;
  setSingleGlobalState: Function;
} = {
  globalState: {},
  setGlobalState: () => null,
  setSingleGlobalState: () => null,
};

const GlobalStateContext = React.createContext(blankContext);

const list = {
  height: {workingValue: ''},
  weight: {workingValue: ''},
  ofc: {workingValue: ''},
  gestationInDays: {workingValue: 0},
  sex: {workingValue: ''},
  dob: {workingValue: null},
  dom: {workingValue: null},
};
const blank = {
  showPicker: false,
  timeStamp: null,
};

function MakeInitialState() {
  const workingObject: globalStateType = {};
  for (const [key, subValue] of Object.entries(list)) {
    workingObject[key] = {
      ...blank,
      ...subValue,
      ...{value: subValue.workingValue},
    };
  }
  return workingObject;
}

const initialState = MakeInitialState();

const GlobalStatsProvider = ({children}: propTypes) => {
  const [globalState, setGlobalState] = useState(MakeInitialState());

  const setSingleGlobalState = (
    name: string,
    value: blankTypes['value'],
    timeStamp = 'add',
  ): void => {
    setGlobalState((oldState) => {
      const mutableState: globalStateType = {...oldState};
      mutableState[name].value = value;
      if (timeStamp === 'add') {
        mutableState[name].timeStamp = new Date();
      } else if (timeStamp === 'remove') {
        mutableState[name].timeStamp = null;
      }
      return mutableState;
    });
  };

  return (
    <GlobalStateContext.Provider
      value={{
        globalState,
        setGlobalState,
        setSingleGlobalState,
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export {GlobalStateContext, GlobalStatsProvider, initialState};

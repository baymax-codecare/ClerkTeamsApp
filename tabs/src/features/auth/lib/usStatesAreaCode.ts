import { usaStates } from 'typed-usa-states';

import USAreaCodes from './data.json';

const getAreaByState = (object: any, state: string) => {
  return Object.keys(object).filter((key) => object[key].stateCode === state);
};
export const useStatesWithArea = () => {
  const statesWithArea: any = {};
  const states = [];

  for (const state of usaStates) {
    const stateAreas = getAreaByState(USAreaCodes, state.abbreviation);
    statesWithArea[state.name] = {
      name: state.name,
      abbreviation: state.abbreviation,
      areaCodes: stateAreas,
    };
    states.push(state.name);
  }
  return { statesWithArea, states };
};

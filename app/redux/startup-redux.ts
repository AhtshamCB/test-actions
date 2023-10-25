import {AnyAction} from 'redux';
import {
  createReducer,
  createActions,
  // ActionTypes,
  DefaultActionTypes,
  DefaultActionCreators,
} from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
export interface StartUpAction extends AnyAction {}
export interface StartUpDoneAction extends AnyAction {}
export interface CheckRemoteConfig extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  STARTUP: 'startup';
  STARTUP_DONE: 'startupDone';
  SET_IS_PRIVATE_PLAN_DONE: 'setIsPrivatePlanDone';
}

interface IActionCreators extends DefaultActionCreators {
  startup: () => StartUpAction;
  startupDone: () => StartUpDoneAction;
  setIsPrivatePlanDone: (privatePlan: boolean) => AnyAction;
}

type IActions = StartUpAction | StartUpDoneAction | AnyAction;

export interface StartupState {
  loading?: boolean;
  isPrivatePlanDone?: boolean;
}
type ImmutableMyType = Immutable.ImmutableObject<StartupState>;
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions<IActionTypes, IActionCreators>({
  startup: null,
  startupDone: null,
  setIsPrivatePlanDone: ['privatePlan'],
});

export const StartupTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  loading: true,
  isPrivatePlanDone: false,
});

export const startup = (state: ImmutableMyType) => state.merge({loading: true});

export const startupDone = state => {
  return state.merge({loading: false});
};

export const setIsPrivatePlanDone = (
  state: ImmutableMyType,
  {privatePlan}: {privatePlan: boolean},
) => {
  return state.merge({isPrivatePlanDone: privatePlan});
};

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_DONE]: startupDone,
  [Types.SET_IS_PRIVATE_PLAN_DONE]: setIsPrivatePlanDone,
});

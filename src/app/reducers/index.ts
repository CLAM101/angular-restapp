import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routeSwitchMain } from '../state.actions';
import { routeSwitchSide } from '../state.actions';

export interface State {}

export const initialState: boolean = true;

export const routeSwitchReducer = createReducer(
  initialState,
  on(routeSwitchMain, (state) => (state = true)),
  on(routeSwitchSide, (state) => (state = false))
);

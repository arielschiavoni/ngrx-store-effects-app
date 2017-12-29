import { RouterReducerState, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer
};

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

// The angular router contains a lot of properties (outlet, component, fragment, data, routerConfig, etc) we are
// not interested to store in our redux store.
// In order to only store the props we are interested in, a custom router serializer has to be implemented to match
// the defined RouterStateUrl
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url, root: { queryParams } } = routerState;

    let state: ActivatedRouteSnapshot = routerState.root;

    // the routerState is a tree and every child represents a url fragment
    // keep going until we reach the last url fragment
    while (state.firstChild) {
      state = state.firstChild;
    }

    // get the params corresponding to the last url fragment
    const { params } = state;

    return {
      url,
      queryParams,
      params
    };
  }
}

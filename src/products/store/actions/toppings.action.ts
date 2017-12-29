import { Action } from '@ngrx/store';
import { Topping } from '../../models/topping.model';

// load toppings
export const LOAD_TOPPINGS = '[Producs] Load Toppings';
export const LOAD_TOPPINGS_SUCCESS = '[Producs] Load Toppings Success';
export const LOAD_TOPPINGS_FAIL = '[Producs] Load Toppings Fail';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;

  constructor(public payload: Topping[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;

  constructor(public payload: any) {}
}

export type ToppingsAction = LoadToppings | LoadToppingsSuccess | LoadToppingsFail;

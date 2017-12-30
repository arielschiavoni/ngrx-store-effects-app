import { PizzasGuard } from './pizza.guard';
import { PizzaExistsGuard } from './pizza-exits.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuard, ToppingsGuard];

export * from './pizza.guard';
export * from './pizza-exits.guard';
export * from './toppings.guard';

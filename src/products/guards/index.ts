import { PizzasGuard } from './pizza.guard';
import { PizzaExistsGuard } from './pizza-exits.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuard];

export * from './pizza.guard';
export * from './pizza-exits.guard';

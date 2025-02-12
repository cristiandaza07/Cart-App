import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const add = createAction('add', props<{product: Product, quantity: number}>());
export const remove = createAction('remove', props<{id: number}>());
export const total = createAction('total');
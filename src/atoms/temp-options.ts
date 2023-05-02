import { atom } from "jotai";
import { Question } from "../types";

// TODO: This functionality should be contained within the surveys later on and so this can then be removed.
export const optionsAtom = atom<Question[]>([]);
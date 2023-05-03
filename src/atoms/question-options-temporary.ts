import { atom } from "jotai";
import { QuestionOption } from "../types";

// TODO: This data should come via backend later on and so this can then be removed.
export const optionsAtom = atom<QuestionOption[]>([]);
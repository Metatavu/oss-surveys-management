import { atom } from "jotai";
import { Survey } from "../generated/client/models/Survey";

export const surveysAtom = atom<Survey[]>([]);

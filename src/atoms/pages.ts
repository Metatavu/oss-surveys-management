import { atom } from "jotai";
import { Page } from "../generated/client/models/Page";

export const pagesAtom = atom<Page[]>([]);
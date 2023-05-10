import { atom } from "jotai";
import { Layout } from "../generated/client/models/Layout";

export const layoutsAtom = atom<Layout[]>([]);
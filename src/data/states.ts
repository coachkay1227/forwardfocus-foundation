import { State } from "@/types/state";

export const STATES: State[] = [
  { code: "OH", name: "Ohio", active: true },
  { code: "TX", name: "Texas", active: false, comingSoon: true },
  { code: "CA", name: "California", active: false, comingSoon: true },
  { code: "FL", name: "Florida", active: false, comingSoon: true },
  { code: "PA", name: "Pennsylvania", active: false, comingSoon: true },
];

export const servedStates = STATES.filter((s) => s.active);
export const comingSoonStates = STATES.filter((s) => s.comingSoon);

export const getDefaultState = () => STATES.find((s) => s.code === "OH")!;

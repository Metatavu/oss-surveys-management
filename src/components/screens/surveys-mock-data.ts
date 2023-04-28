import { DateTime } from "luxon";

export const mockData = [
  {
    id: "12313",
    title: "name of survey",
    screens: 3,
    startTime: DateTime.now(),
    endTime: DateTime.now(),
    topScreen: "location",
    answers: 234324
  },
  {
    id: "12314",
    title: "name of survey2",
    screens: 4,
    startTime: DateTime.now(),
    endTime: DateTime.now(),
    topScreen: "location 2",
    answers: 17
  }
];
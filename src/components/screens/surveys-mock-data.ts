import { DateTime } from "luxon";

export const mockData = [
  {
    "id": "12313",
    "kysely": "name of survey",
    "näytöt": 3,
    "julkaisuaika": DateTime.now(),
    "päättymisaika": DateTime.now(),
    "suosituinNäyttö": "location",
    "vastauksia": 234324
  },
  {
    "id": "12314",
    "kysely": "name of survey2",
    "näytöt": 4,
    "julkaisuaika": DateTime.now(),
    "päättymisaika": DateTime.now(),
    "suosituinNäyttö": "location 2",
    "vastauksia": 17
  }
];
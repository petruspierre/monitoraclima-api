import { v4 as uuidV4 } from "uuid";

class City {
  name: string;
  weather: {
    temperature: {
      main: number;
      feels_like: number;
      min: number;
      max: number;
    },
    status: string;
    description: string;
    icon: string;
  }
  id?: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { City };

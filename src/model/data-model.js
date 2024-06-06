import { generateData } from '../mock/generate-data.js';

export default class DataModel {
  #data = null;

  get data() {
    if (!this.#data) {
      this.#data = generateData();
    }

    return this.#data;
  }
}

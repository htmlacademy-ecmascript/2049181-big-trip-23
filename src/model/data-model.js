import { generateData } from '../mock/generate-data.js';

export default class DataModel {
  #data = {};

  get data() {
    this.#data = generateData();

    return this.#data;
  }
}

import { generateData } from '../mock/generate-data.js';

export default class DataModel {
  data = {};

  getData() {
    this.data = generateData();

    return this.data;
  }
}

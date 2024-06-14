import { v4 as uuidv4 } from 'uuid';

interface Model {
  id: string;
  [key: string]: any;
}

class LocalStorageService {
  private name: string;
  private records: string[];
  private localStorage = window.localStorage;

  constructor(name: string) {
    if (!name) {
      throw new Error('Namespace is required.');
    }
    this.name = name;
    const store = this.localStorage.getItem(this.name);
    this.records = (store && store.split(',')) || [];
  }

  private save() {
    this.localStorage.setItem(this.name, this.records.join(','));
  }

  public get(id: string) {
    const data = this.localStorage.getItem(`${this.name}-${id}`);
    return data ? JSON.parse(data) : null;
  }

  public getAll() {
    return this.records.map((recordId) => this.get(recordId));
  }

  public create(model: Model) {
    if (!model.id) {
      model.id = uuidv4();
    }
    this.localStorage.setItem(`${this.name}-${model.id}`, JSON.stringify(model));
    this.records.push(model.id);
    this.save();
    return this.get(model.id);
  }

  public update(model: Model) {
    this.localStorage.setItem(`${this.name}-${model.id}`, JSON.stringify(model));
    if (!this.records.includes(model.id)) {
      this.records.push(model.id);
      this.save();
    }
    return this.get(model.id);
  }

  public delete(id: string) {
    this.localStorage.removeItem(`${this.name}-${id}`);
    this.records = this.records.filter((recordId) => recordId !== id);
    this.save();
    return true;
  }

  public deleteAll() {
    this.records.forEach((recordId) => this.localStorage.removeItem(`${this.name}-${recordId}`));
    this.records = [];
    this.save();
    return true;
  }
}

export default LocalStorageService;

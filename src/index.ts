function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

interface Model {
  id: string;
  [key: string]: any;
}

class LocalStorageService {
  private name: string;
  private records: string[];
  private localStorage = () => {
    return localStorage;
  };

  private static jsonData(data: string) {
    return data && JSON.parse(data);
  };

  constructor(name: string) {
    if (!name) {
      throw new Error("Namespace is required.");
    }
    this.name = name;
    const store = this.localStorage().getItem(this.name);
    this.records = (store && store.split(",")) || [];
  }

  private save() {
    this.localStorage().setItem(this.name, this.records.join(","));
  };

  public get(id: string) {
    const data = this.localStorage().getItem(this.name + "-" + id);
    if (!data) {
      return null;
    } else {
      return LocalStorageService.jsonData(data);
    }
  };

  public getAll() {
    return this.records.map((recordId) => {
      const record = this.localStorage().getItem(this.name + "-" + recordId);
      if (record) {
        return LocalStorageService.jsonData(record);
      } else {
        return null;
      }
    })
  }

  public create(model: Model) {
    if (!model.id) {
      model.id = guid();
    }
    this.localStorage().setItem(this.name + "-" + model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return this.get(model.id);
  }

  public update(model: Model) {
    this.localStorage().setItem(this.name + "-" + model.id, JSON.stringify(model));
    if (!this.records.find(element => element === model.id.toString())) {
      this.records.push(model.id.toString());
      this.save();
    }
    return this.get(model.id);
  }

  public delete(id: string) {
    this.localStorage().removeItem(this.name + "-" + id);
    this.records = this.records.filter((recordId) => {
      return recordId !== id.toString();
    });
    this.save();
    return true;
  };

  public deleteAll() {
    this.records.forEach((recordId) => {
      this.localStorage().removeItem(this.name + "-" + recordId)
    });
    this.records = [];
    this.save();
    return true;
  }
}

export default LocalStorageService;

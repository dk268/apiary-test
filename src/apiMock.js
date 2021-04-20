export class APIDictionary {
  constructor(id) {
    this.id = {};
  }

  static dictionaries = {};

  static createDictionary = () => {
    const mockedUUID = Math.floor(Math.random() * 1000) + ""; // can collide

    APIDictionary.dictionaries[mockedUUID] = {};

    return mockedUUID;
  };

  static createOrModifyEntry = (id, key, value) => {
    const current = APIDictionary.dictionaries[id];
    current[key] = value;
  };

  static deleteDictionary = (id) => {
    delete APIDictionary.dictionaries[id];
  };

  static getDictionaries = () => APIDictionary.dictionaries;
}

export const simulateAsyncCall = (req = {}) => {
  const { method, id, key, value } = req;

  return new Promise((res, rej) => {
    const statusRes = (status = 200) => ({
      status,
    });
    switch (method) {
      case "POST": {
        if (!key || !value)
          res({ ...statusRes(), id: APIDictionary.createDictionary() });
        else {
          APIDictionary.createOrModifyEntry(id, key, value);
          res(statusRes());
        }
        break;
      }
      case "DELETE": {
        if (id) APIDictionary.deleteDictionary(id);
        res(statusRes());
        break;
      }
      default:
        res(statusRes(404));
    }
  });
};

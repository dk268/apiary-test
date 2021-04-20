import {
  APIDictionary,
  simulateAsyncCall as mockFetch,
  simulateAsyncCall,
} from "./apiMock.js";

describe(`the dictionary API`, () => {
  describe(`handles aberrant user or developer input gracefully`, () => {
    test(`responds 404 when no method is provided`, async () => {
      const { status } = await simulateAsyncCall();

      expect(status).toBe(404);
    });

    test(`responds 404 when an invalid method is provided`, async () => {
      const { status } = await simulateAsyncCall({ method: "pizza" });

      expect(status).toBe(404);
    });
  });

  describe(`can create new dictionaries, and`, () => {
    let response = simulateAsyncCall({ method: "POST" });

    test(`responds status 200 when creating a new dictionary`, async () => {
      const { status } = await response;

      expect(status).toBe(200);
    });

    test(`responds with a dictionary ID`, async () => {
      const { id } = await response;

      expect(typeof id).toBe("string");
      expect(id.length <= 4).toBe(true);
    });
  });

  describe(`can delete dictionaries, and`, () => {
    const dictionary = APIDictionary.getDictionaries();

    let id = APIDictionary.createDictionary();

    test(`responds with status 200 when deleting a dictionary`, async () => {
      expect(dictionary[id]).toBeTruthy();

      const { status } = await simulateAsyncCall({ method: "DELETE", id });

      expect(status).toBe(200);
    });

    test(`successfully deletes a dictionary`, async () => {
      id = APIDictionary.createDictionary();

      expect(dictionary[id]).toBeTruthy();

      await simulateAsyncCall({ method: "DELETE", id });

      expect(dictionary[id]).toBeFalsy();
    });
  });

  describe(`can modify key-value pairs, and`, () => {
    const id1 = APIDictionary.createDictionary();
    const id2 = APIDictionary.createDictionary();

    const newKey = "newKey";
    const newValue = "newValue";
    const newerKey = "newerKey";
    const newerValue = "newerValue";

    const dictionary = APIDictionary.getDictionaries();

    const edit = (id) => (key, value) => {
      return simulateAsyncCall({ method: "POST", id, key, value });
    };

    const edit1 = edit(id1);
    const edit2 = edit(id2);

    test(`returns status 200 when calling this route`, async () => {
      const { status } = await edit1(newKey, newValue);

      expect(status).toBe(200);
    });

    test(`successfully creates a new entry in the correct dictionary`, async () => {
      expect(dictionary[id1][newKey]).toBe(newValue);
      expect(dictionary[id2][newKey]).toBeUndefined();

      await edit2(newKey, newValue);

      expect(dictionary[id2][newKey]).toBe(newValue);
    });

    test(`successfully modifies an entry in the correct dictionary`, async () => {
      await edit1(newKey, newerValue);
      await edit2(newerKey, newerValue);

      expect(dictionary[id1][newKey]).toBe(newerValue);
      expect(dictionary[id2][newerKey]).toBe(newerValue);
    });
  });
});

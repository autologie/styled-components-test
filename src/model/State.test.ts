import { applyAction } from "./State";

describe(applyAction, () => {
  describe("char event", () => {
    it("receives a character to add it in the editing row", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "" }], answer: "query" },
          { type: "char", payload: "k" }
        )
      ).toEqual({
        attempts: [{ isEditing: true, word: "k" }],
        answer: "query",
      });
    });

    it("does not add further characters if the editing row has already 5 characters", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "aaaaa" }], answer: "query" },
          { type: "char", payload: "k" }
        )
      ).toEqual({
        attempts: [{ isEditing: true, word: "aaaaa" }],
        answer: "query",
      });
    });
  });

  describe("delete event", () => {
    it("deletes the last character in the editing row", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "aaaaa" }], answer: "query" },
          { type: "del" }
        )
      ).toEqual({
        attempts: [{ isEditing: true, word: "aaaa" }],
        answer: "query",
      });
    });

    it("does not change state if the editing row has no character", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "" }], answer: "query" },
          { type: "del" }
        )
      ).toEqual({
        attempts: [{ isEditing: true, word: "" }],
        answer: "query",
      });
    });
  });

  describe("confirm event", () => {
    it("turns the editing row into a done row and add another empty editing row", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "quick" }], answer: "query" },
          { type: "confirm" }
        )
      ).toEqual({
        attempts: [
          {
            isEditing: false,
            word: "quick",
            colors: ["g", "g", "b", "b", "b"],
          },
          { isEditing: true, word: "" },
        ],
        answer: "query",
      });
    });

    it("does not change state if the editing row doesn't match any words in the word list", () => {
      expect(
        applyAction(
          { attempts: [{ isEditing: true, word: "aaaaa" }], answer: "query" },
          { type: "confirm" }
        )
      ).toEqual({
        attempts: [{ isEditing: true, word: "aaaaa" }],
        answer: "query",
      });
    });
  });
});

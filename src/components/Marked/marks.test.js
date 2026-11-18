import { describe, expect, it } from "vitest";
import { parseMarks, stripMarks } from "./marks.js";

describe("parseMarks", () => {
  it("splits marked and plain parts in order", () => {
    expect(parseMarks("I build ==web apps== and ==models==.")).toEqual([
      { text: "I build ", marked: false },
      { text: "web apps", marked: true },
      { text: " and ", marked: false },
      { text: "models", marked: true },
      { text: ".", marked: false },
    ]);
  });

  it("leaves texts without marks untouched", () => {
    expect(parseMarks("Plain text")).toEqual([{ text: "Plain text", marked: false }]);
  });

  it("strips the markers for plain-text uses", () => {
    expect(stripMarks("A ==key== word")).toBe("A key word");
  });
});

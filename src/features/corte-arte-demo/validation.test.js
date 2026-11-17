import { describe, expect, it } from "vitest";
import { todayIso, validateBooking } from "./validation.js";

const TODAY = "2027-01-10";
const valid = {
  room: "Sala VIP",
  nickname: "Lucía Romero",
  phone: "612345678",
  date: "2027-02-01",
  start: "10:00",
  end: "11:00",
  people: 2,
};

describe("validateBooking", () => {
  it("accepts a correct booking", () => {
    expect(validateBooking(valid, TODAY)).toEqual({});
  });

  it("rejects names with numbers", () => {
    expect(validateBooking({ ...valid, nickname: "Pepe 1" }, TODAY)).toHaveProperty("nickname");
  });

  it("requires a 9-digit phone", () => {
    expect(validateBooking({ ...valid, phone: "1234" }, TODAY)).toHaveProperty("phone");
  });

  it("rejects dates in the past", () => {
    expect(validateBooking({ ...valid, date: "2027-01-09" }, TODAY)).toHaveProperty("date");
  });

  it("requires the end time to be after the start time", () => {
    expect(validateBooking({ ...valid, end: "09:00" }, TODAY)).toHaveProperty("end");
  });

  it("accepts between 1 and 4 people", () => {
    expect(validateBooking({ ...valid, people: 5 }, TODAY)).toHaveProperty("people");
    expect(validateBooking({ ...valid, people: 4 }, TODAY)).toEqual({});
  });
});

describe("todayIso", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(todayIso(new Date(2027, 0, 5))).toBe("2027-01-05");
  });
});

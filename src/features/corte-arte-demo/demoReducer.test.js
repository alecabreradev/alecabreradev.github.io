import { describe, expect, it } from "vitest";
import { demoReducer, initialState } from "./demoReducer.js";

const run = (actions, state = initialState) => actions.reduce(demoReducer, state);

describe("demoReducer", () => {
  it("creates a booking with the next id and logs a POST", () => {
    const state = run([
      { type: "navigate", screen: "booking" },
      { type: "updateForm", field: "nickname", value: " Lucía " },
      { type: "updateForm", field: "room", value: "Sala VIP" },
      { type: "saveBooking" },
    ]);
    const created = state.bookings.at(-1);
    expect(created).toMatchObject({ id: 3, nickname: "Lucía", room: "Sala VIP" });
    expect(state.log.map((e) => e.method)).toContain("POST");
    expect(state.screen).toBe("admin");
  });

  it("edits an existing booking and logs a PUT", () => {
    const state = run([
      { type: "startEdit", id: 1 },
      { type: "updateForm", field: "people", value: "3" },
      { type: "saveBooking" },
    ]);
    expect(state.bookings.find((b) => b.id === 1).people).toBe(3);
    expect(state.log.some((e) => e.method === "PUT" && e.path === "/api/reservas/1")).toBe(true);
  });

  it("deletes a booking and logs a DELETE", () => {
    const state = run([{ type: "deleteBooking", id: 2 }]);
    expect(state.bookings.map((b) => b.id)).toEqual([1]);
    expect(state.log[0]).toMatchObject({ method: "DELETE", status: 204 });
  });

  it("returns 404 when searching for a booking that does not exist", () => {
    const state = run([{ type: "search", query: "99" }]);
    expect(state.searchResult.booking).toBeUndefined();
    expect(state.log[0].status).toBe(404);
  });

  it("keeps at most seven log entries", () => {
    const actions = Array.from({ length: 12 }, () => ({ type: "exportPdf" }));
    expect(run(actions).log).toHaveLength(7);
  });
});

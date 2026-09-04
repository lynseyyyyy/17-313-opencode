import { describe, expect, test } from "bun:test"
import { getStatusText, type Status } from "./Share"

const messages = {
  status_connected_waiting: "Connected",
  status_connecting: "Connecting",
  status_disconnected: "Disconnected",
  status_reconnecting: "Reconnecting",
  status_error: "Error",
  status_unknown: "Unknown",
}

describe("getStatusText", () => {
  test.each([
    [["connected"], "Connected"],
    [["connecting"], "Connecting"],
    [["disconnected"], "Disconnected"],
    [["reconnecting"], "Reconnecting"],
    [["error"], "Error"],
    [["error", "Custom error"], "Custom error"],
  ] as const)("maps %j to %s", (status, expected) => {
    expect(getStatusText(status as [Status, string?], messages)).toBe(expected)
  })

  test("falls back to unknown for an unexpected status", () => {
    const status = ["unexpected"] as unknown as [Status, string?]
    expect(getStatusText(status, messages)).toBe("Unknown")
  })
})
import { describe, it, expect, test } from "vitest";
import NotFoundError from "../NotFoundError.js";

describe("NotFoundError class", () => {
  const testType = "Property";
  const testId = "c4567890-12de-f012-3456-789abcdef012";
  const testError = new NotFoundError(testType, testId);

  it("should be an instance of the Error class", () => {
    expect(testError).toBeInstanceOf(NotFoundError);
  });

  it("should be an instance of the Error class", () => {
    expect(testError).toBeInstanceOf(Error);
  });

  it("should create error with correct message", () => {
    expect(testError.message).toBe(
      "Property with id c4567890-12de-f012-3456-789abcdef012 was not found."
    );
  });

  it("should set correct name property", () => {
    expect(testError.name).toBe("NotFoundError");
  });
});

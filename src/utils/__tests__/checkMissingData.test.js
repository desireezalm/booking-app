import checkMissingData from "../checkMissingData.js";
import { describe, it, expect } from "vitest";

describe("checkMissingData function", () => {
  const fullTestData = {
    username: "jdoe",
    password: "password123",
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    profilePicture:
      "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg",
  };

  const missingTestData = {
    username: "jdoe",
    password: "password123",
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture:
      "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg",
  };

  const emptyTestData = {};

  const dataRequired = [
    "username",
    "password",
    "name",
    "email",
    "phoneNumber",
    "profilePicture",
  ];

  it("should return an empty array when no data is missing", () => {
    const result = checkMissingData(fullTestData, dataRequired);
    expect(result).toEqual([]);
  });

  it("should return an array of missing keys when data is missing", () => {
    const result = checkMissingData(missingTestData, dataRequired);
    expect(result).toEqual(["phoneNumber"]);
  });

  it("should return all required keys if all are missing", () => {
    const result = checkMissingData(emptyTestData, dataRequired);
    expect(result).toEqual([
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "profilePicture",
    ]);
  });
});

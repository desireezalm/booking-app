import { excludeData } from "../excludeData.js";
import { describe, it, expect } from "vitest";

describe("exclude data function", () => {
  const testData = {
    id: "a1234567-89ab-cdef-0123-456789abcdef",
    username: "jdoe",
    password: "password123",
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    profilePicture:
      "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg",
  };

  it("should not return object with property", () => {
    expect(() => excludeData(testData)).not.toHaveProperty("password");
  });
});

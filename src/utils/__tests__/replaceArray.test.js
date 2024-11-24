import replaceArray from "../replaceArray.js";
import { describe, it, expect, vi } from "vitest";

describe("replace array function", () => {
  const testData = [
    {
      id: "a1234567-89ab-cdef-0123-456789abcdef",
      username: "jdoe",
      password: "password123",
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
      profilePicture:
        "https://global-uploads.webflow.com/5eecfecbe625d195e35b89f2/624bfb093da7d92733c001c0_Ignacio%20Villafruela%20Rodr%C3%ADguez.jpg",
    },
    {
      id: "b2345678-90cd-ef01-2345-6789abcdef01",
      username: "asimpson",
      password: "password234",
      name: "Anna Simpson",
      email: "annasimpson@example.com",
      phoneNumber: "123-456-7891",
      profilePicture: "https://example.com/asimpson-profile-pic.jpg",
    },
    {
      id: "c3456789-01de-f012-3456-789abcdef012",
      username: "rjames",
      password: "password345",
      name: "Robert James",
      email: "robertjames@example.com",
      phoneNumber: "123-456-7892",
      profilePicture: "https://example.com/rjames-profile-pic.jpg",
    },
    {
      id: "d4567890-12ef-0123-4567-89abcdef0123",
      username: "klopez",
      password: "password456",
      name: "Karen Lopez",
      email: "karenlopez@example.com",
      phoneNumber: "123-456-7893",
      profilePicture: "https://example.com/klopez-profile-pic.jpg",
    },
    {
      id: "e5678901-23f0-1234-5678-9abcdef01234",
      username: "smiller",
      password: "password567",
      name: "Steve Miller",
      email: "stevemiller@example.com",
      phoneNumber: "123-456-7894",
      profilePicture: "https://example.com/smiller-profile-pic.jpg",
    },
  ];

  it("should return an array", () => {
    const result = replaceArray(testData, "password");

    expect(Array.isArray(result)).toBe(true); // 3
  });
});

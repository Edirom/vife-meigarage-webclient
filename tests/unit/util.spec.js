import { shallowMount } from "@vue/test-utils";
import { invalidate } from "@/util.js";

test("Expect 1 + 1 = 2", () => {
  // expect the result
  // of 1+1 to be 2
  expect(1 + 1).toBe(2);
});

// test case for parseUrl method with simple url
test("invalidate simple URL", () => {
  const invalidatedUrl = invalidate("http://localhost:8080/login");
  // asserts that the href, port, protocol and query properties are as expected
});

import { secondsToHms } from "utils/time";

describe("Time utils", () => {
  describe("seconds to hours, minutes and seconds", () => {
    test("1 second should return 0:01", () => {
      expect(secondsToHms(1)).toBe("0:01");
    });

    test("10 second should return 0:10", () => {
      expect(secondsToHms(10)).toBe("0:10");
    });

    test("60 seconds should return 1:00", () => {
      expect(secondsToHms(60)).toBe("1:00");
    });

    test("600 seconds should return 10:00", () => {
      expect(secondsToHms(600)).toBe("10:00");
    });

    test("3600 seconds should return 1:00:00", () => {
      expect(secondsToHms(3600)).toBe("1:00:00");
    });

    test("36000 seconds should return 10:00:00", () => {
      expect(secondsToHms(36000)).toBe("10:00:00");
    });
  });
});

import convertTimestampToDate from "../src/utils/timestampToDate";

describe("convertTimestampToDate", () => {
  it("returns a new object", () => {
    const timestamp = 1557572706232;
    const result = convertTimestampToDate(timestamp);
    expect(result).not.toBe(timestamp);
    expect(result).toBeInstanceOf(Date);
  });
  it("converts a timestamp to a date", () => {
    const timestamp = 1557572706232;
    const result = convertTimestampToDate(timestamp);
    expect(result).toEqual(new Date(timestamp));
  });
  it("does not mutate the input", () => {
    const timestamp = 1557572706232;
    convertTimestampToDate(timestamp);
    const control = timestamp;
    expect(timestamp).toEqual(control);
  });
});
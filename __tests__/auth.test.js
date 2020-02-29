import { verifyAuth0Token } from "../index";
import createJWKSMock from "mock-jwks";
import { TokenExpiredError } from "jsonwebtoken";

describe("Auth Test", () => {
  const jwks = createJWKSMock("https://MYAUTH0APP.auth0.com/");

  beforeEach(() => {
    jwks.start();
  });

  afterEach(() => {
    jwks.stop();
  });

  it("should verify the token", async () => {
    const token = jwks.token({});

    const data = await verifyAuth0Token(token);

    expect(data).toEqual({});
  });

  it("should be an invalid token", async () => {
    expect.assertions(1);
    const token = jwks.token({
      exp: 0,
    });

    try {
      const data = await verifyAuth0Token(token);
    } catch (error) {
      expect(error).toEqual(new TokenExpiredError("jwt expired"));
    }
  });
});

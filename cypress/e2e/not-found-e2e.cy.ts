describe("not found post", () => {
  it("should be able to search direct in the url for a non existent post", () => {
    cy.request({
      url: "http://localhost:3000/post/this-post-does-not-exist and receive a 404 status code",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

describe("not found user", () => {
  it("should be able to search direct in the url for a non existent user and receive a 404 status code", () => {
    cy.request({
      url: "http://localhost:3000/user/this-user-does-not-exist",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

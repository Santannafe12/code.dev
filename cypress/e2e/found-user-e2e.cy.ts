describe("found user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able to found a user and access it", () => {
    cy.get('a[href="/user/santannafe"]').click();

    cy.location("pathname").should("eq", "/user/santannafe");
  });
});

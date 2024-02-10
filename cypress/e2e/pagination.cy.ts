describe("pagination", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/posts");
  });

  it("should be able to move between pages", () => {
    cy.get("a").contains("2").click();

    cy.location("search").should("eq", "?page=2");

    cy.get('a[href="/posts?page=1"]').should("exist");
  });
});

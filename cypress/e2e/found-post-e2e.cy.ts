describe("found post", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/posts");
  });

  it("should be able to found a post and access it", () => {
    cy.get(
      'a[href="/post/deploy-transformando-codigos-em-aplicacoes-em-ambientes-de-producao"]'
    ).click();

    cy.location("pathname").should(
      "eq",
      "/post/deploy-transformando-codigos-em-aplicacoes-em-ambientes-de-producao"
    );
  });
});

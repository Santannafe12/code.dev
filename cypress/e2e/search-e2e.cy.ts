describe("search found none", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/posts");
  });

  it("should be able to search for a random post and not found it", () => {
    cy.get("input").type("random").parent("form");

    cy.location("search").should("eq", "?query=random");

    cy.get("h2").contains("Nenhuma publicação encontrada");
  });
});

describe("search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/posts");
  });

  it("should be able to search for a existent post and found it", () => {
    cy.get("input").type("deploy").parent("form");

    cy.location("search").should("eq", "?query=deploy");

    cy.get(
      'a[href="/post/deploy-transformando-codigos-em-aplicacoes-em-ambientes-de-producao"]'
    ).should("exist");
  });
});

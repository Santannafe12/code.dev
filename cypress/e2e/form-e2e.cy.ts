describe("contact form error", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able not to send a email because letters limitation on textarea", () => {
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=email]").type("santannafe12@gmail.com");
    cy.get("textarea[name=message]").type(
      "Hello, I'm testing the contact form."
    );

    cy.get("button").contains("Enviar").click();

    cy.get("p").contains("Mensagem deve ter pelo menos 50 caracteres.");
  });
});

describe("contact form successfull", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able to send a email", () => {
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=email]").type("santannafe12@gmail.com");
    cy.get("textarea[name=message]").type(
      "Hello, I'm testing the contact form. I'm sending a message with more than 50 characters. I hope this works."
    );

    cy.get("button").contains("Enviar").click();

    cy.get("div").contains("Mensagem enviada com sucesso!");
  });
});

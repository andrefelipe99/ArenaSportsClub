import { describe, expect, it } from "vitest";
import { Equipe } from "../entities/equipe";
import { CriarEquipe } from "./criar-equipe";

describe("criar equipe", () => {
  it("deveria ser possivel criar uma equipe", () => {
    const criarEquipe = new CriarEquipe();

    expect(
      criarEquipe.execute({
        nome: "Real Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2016/03/Real-Madrid-logo-1.png",
        localidade: "Raincife Brazil",
        estadio: "Estádio da Paz",
        resumo: "Time bom",
        modalidade: "Futebol",
        jogadores: ["Joaozinho", "Lele da Cuca", "Joca"],
        titulos: ["Copa verde", "Liga fraca"],
      })
    ).resolves.toBeInstanceOf(Equipe);
  });
});

import { expect, test } from "vitest";
import { Equipe } from "./equipe";
import { Partida } from "./partida";

//pensar em regras de negocio

test("criar equipe", () => {
  const equipe = new Equipe({
    nome: "Real Madrid",
    logo: "https://logodownload.org/wp-content/uploads/2016/03/Real-Madrid-logo-1.png",
    localidade: "Raincife Brazil",
    estadio: "Estádio da Paz",
    resumo: "Time bom",
    modalidade: "Futebol",
    jogadores: ["Joaozinho", "Lele da Cuca", "Joca"],
    titulos: ["Copa verde", "Liga fraca"],
  });

  const partida = new Partida({
    equipeCasa: equipe,
    equipeFora: equipe,
  });

  expect(equipe).toBeInstanceOf(Equipe);
  expect(partida).toBeInstanceOf(Partida);
  expect(partida.equipeCasaNome).toEqual(partida.equipeForaNome);
});

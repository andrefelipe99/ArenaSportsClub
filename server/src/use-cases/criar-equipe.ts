import { Equipe } from "../entities/equipe";

interface criarEquipeRequest {
  nome: string;
  localidade: string;
  estadio: string;
  resumo: string;
  logo: string;
  modalidade: string;
  jogadores: string[];
  titulos: string[];
}

type criarEquipeResponse = Equipe;

export class CriarEquipe {
  async execute({
    nome,
    localidade,
    estadio,
    resumo,
    logo,
    modalidade,
    jogadores,
    titulos,
  }: criarEquipeRequest): Promise<criarEquipeResponse> {
    const equipe = new Equipe({
      nome,
      localidade,
      estadio,
      resumo,
      logo,
      modalidade,
      jogadores,
      titulos,
    });

    return equipe;
  }
}

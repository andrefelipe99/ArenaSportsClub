import { Equipe } from "./equipe";

export interface PartidaProps {
  equipeCasa: Equipe;
  equipeFora: Equipe;
}

export class Partida {
  private props: PartidaProps;

  get equipeCasaNome() {
    return this.props.equipeCasa.nome;
  }

  get equipeCasaLogo() {
    return this.props.equipeCasa.logo;
  }

  get equipeForaNome() {
    return this.props.equipeFora.nome;
  }

  get equipeForaLogo() {
    return this.props.equipeFora.logo;
  }

  constructor(props: PartidaProps) {
    this.props = props;
  }
}

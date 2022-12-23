export interface EquipeProps {
  nome: string;
  localidade: string;
  estadio: string;
  resumo: string;
  logo: string;
  modalidade: string;
  jogadores: string[];
  titulos: string[];
}

export class Equipe {
  private props: EquipeProps;

  get nome() {
    return this.props.nome;
  }

  get localidade() {
    return this.props.localidade;
  }

  get estadio() {
    return this.props.estadio;
  }

  get resumo() {
    return this.props.resumo;
  }

  get logo() {
    return this.props.logo;
  }

  get modalidade() {
    return this.props.modalidade;
  }

  get jogadores() {
    return this.props.jogadores;
  }

  get titulos() {
    return this.props.titulos;
  }

  constructor(props: EquipeProps) {
    this.props = props;
  }
}

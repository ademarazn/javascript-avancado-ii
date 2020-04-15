class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  adicionarNegociacao(negociacao) {
    return new Promise((resolve, reject) => {
      this._http
          .post("/negociacoes", negociacao) // localhost:3000/negociacoes
          .then(objeto => {
            resolve(new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          }).catch(erro => {
            console.log(erro);
            reject("Não foi possível enviar a negociação.");
          });
    });
  }

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this._http
          .get("/negociacoes/semana") // localhost:3000/negociacoes/semana
          .then(negociacoes => {
            resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
          }).catch(erro => {
            console.log(erro);
            reject("Não foi possível obter as negociações da semana.");
          });
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, reject) => {
      this._http
          .get("/negociacoes/anterior") // localhost:3000/negociacoes/anterior
          .then(negociacoes => {
            resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
          }).catch(erro => {
            console.log(erro);
            reject("Não foi possível obter as negociações da semana anterior.");
          });
    });
  }

  obterNegociacoesDaSemanaRetrasada(cb) {
    return new Promise((resolve, reject) => {
      this._http
          .get("/negociacoes/retrasada") // localhost:3000/negociacoes/retrasada
          .then(negociacoes => {
            resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
          }).catch(erro => {
            console.log(erro);
            reject("Não foi possível obter as negociações da semana retrasada.");
          });
    });
  }
}

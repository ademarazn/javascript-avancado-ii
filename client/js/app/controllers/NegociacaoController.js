class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._listaNegociacoes = new Bind(new ListaNegociacoes(),
      new NegociacoesView($("#negociacoesView")), "adiciona", "esvazia");

    this._mensagem = new Bind(new Mensagem(),
      new MensagemView($("#mensagemView")), "texto");
  }

  adiciona(event) {
    event.preventDefault();

    let service = new NegociacaoService();
    service.adicionarNegociacao(this._criaNegociacao())
      .then(negociacao => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._limpaFormulario();
      }).catch(erro => this._mensagem.textp = erro);
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()]
    ).then(negociacoes => {
      negociacoes
          .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = "Negociações da semana obtidas com sucesso.";
    }).catch(erro => this._mensagem.texto = erro);
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso";
  }

  _criaNegociacao() {
    return {
      data: this._inputData.value,
      quantidade: this._inputQuantidade.value,
      valor: this._inputValor.value
    };
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}

class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] === null) {
        return false
      }
    }
    return true
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  gravar(d) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d))
    localStorage.setItem('id', id)  
  }
}

let bd = new Bd()

function cadastrarDespesa() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesa = new Despesa (
    ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value
  )

  if(despesa.validarDados()){
    bd.gravar(despesa)

    document.getElementById('modal-titulo').innerHTML = 'Registro inserido com sucesso'
    document.getElementById('modal-color-titulo').className = 'modal-header text-success'
    document.getElementById('modal-conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('modal-button').innerHTML = 'Voltar'
    document.getElementById('modal-button').className = 'btn btn-success'
    
    // Dialog de sucesso
    $('#modalRegistrarDespesa').modal('show')
  } else {
    document.getElementById('modal-titulo').innerHTML = 'Erro na inclusão do registro'
    document.getElementById('modal-color-titulo').className = 'modal-header text-danger'
    document.getElementById('modal-conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
    document.getElementById('modal-button').innerHTML = 'Voltar e corrigir'
    document.getElementById('modal-button').className = 'btn btn-danger'

    // Dialog de erro
      $('#modalRegistrarDespesa').modal('show')
   }
}

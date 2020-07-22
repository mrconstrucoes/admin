import React from 'react';
import { FaTrash, FaEnvelope, FaPersonBooth, FaPhone, FaUser } from 'react-icons/fa';
import { CopyToClipboard } from  'react-copy-to-clipboard';

class GaleriaLista extends React.Component {
  constructor(props){
      super(props);

      this.state = { lista: [], erro: null, copiedName: false, copiedEmail: false, copiedTelephone: false };

      this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    // console.log(window.innerWidth);
    let url = "https://apimrconstrucoes.herokuapp.com/contatos";
    fetch(url)
      .then((res) => res.json())
      .then((resposta) => { this.setState({lista: resposta}); })
      .then((error) => { this.setState({erro: error}); });
  }
  componentWillUpdate(){
    // console.log(window.innerWidth);
    let url = "https://apimrconstrucoes.herokuapp.com/contatos";
    fetch(url)
      .then((res) => res.json())
      .then((resposta) => { this.setState({lista: resposta}); })
      .then((error) => { this.setState({erro: error}); });
  }  
  handleClick(e){

    let modal = document.querySelector("#"+e);
    console.log(modal);
    if(modal != undefined){
      modal.classList.toggle("display-none");
    }
  }
  render(){
    return  <div className="padding-10">
                <h2 className="text-center">Contatos:</h2>
                
                <CopyToClipboard text="https://mrconstrucao.000webhostapp.com/" onCopy={() => this.setState({copiedName: true, copiedEmail: false, copiedTelephone: false})}>
                  <button className="btn btn-info">
                    <FaCopy />  Local do aplicativo 
                  </button>
                </CopyToClipboard>

                {this.state.copiedEmail ? <p className="text-center text-blue">Email copiado.</p> : null}
                {this.state.copiedName ? <p className="text-center text-blue">Nome Copiado.</p> : null}
                {this.state.copiedTelephone ? <p className="text-center text-blue">Telefone Copiado.</p> : null}

                {this.state.lista.map((item, id) => { 
                  return  <div className="card padding-16 margin-5 light-gray display-container">
                            <h3 className="text-center">{item["nomeContatos"]}</h3>
                            <p className="text-justify text-indent">
                              <b>Email: </b>{item["emailContatos"]}
                            </p>
                            <p className="text-justify text-indent">
                              <b>Telefone: </b>{item["telefoneContatos"]}
                            </p>

                            <br/>
                              
                            <aside className="bar container">
                              <CopyToClipboard text={item["nomeContatos"]} onCopy={() => this.setState({copiedName: true, copiedEmail: false, copiedTelephone: false})}>
                                <button className="btn btn-info">
                                  <FaUser /> 
                                  <span className="hide-on-mobile">  Copiar Nome </span>
                                </button>
                              </CopyToClipboard>
                              
                              <CopyToClipboard text={item["emailContatos"]} onCopy={() => this.setState({copiedName: false, copiedEmail: true, copiedTelephone: false})}>
                                <button className="btn btn-info">
                                  <FaEnvelope /> 
                                  <span className="hide-on-mobile">  Copiar Email </span>
                                </button>
                              </CopyToClipboard>
                              
                              <CopyToClipboard text={item["telefoneContatos"]} onCopy={() => this.setState({copiedName: false, copiedEmail: false, copiedTelephone: true})}>
                                <button className="btn btn-info">
                                  <FaPhone /> 
                                  <span className="hide-on-mobile"> Copiar Telefone</span>
                                </button>
                              </CopyToClipboard>
                            </aside>

                            <button className="btn red display-top-right" id="btnDelete" 
                              onClick={() =>{
                                const requestOptions = {
                                  method: 'DELETE'
                                };

                                fetch("https://apimrconstrucoes.herokuapp.com/contatos/"+item["_id"], requestOptions)
                                  .then((response) => response.json())
                                  .then((data) => { alert("Apagado com sucesso!") });
                              }}>
                              <FaTrash id="btnDelete" />
                            </button>
                          </div>;
                })}
            </div>;
  }
}

export default GaleriaLista;

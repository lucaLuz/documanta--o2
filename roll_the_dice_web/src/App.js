/**
 * @fileoverview Este arquivo define o componente App para um aplicativo de rolagem de dados.
 */

// Importando os estilos do App
import "./App.css";

// Importando o hook useState do React para gerenciar o estado do componente
import { useState } from "react";

// Importando a biblioteca Axios para fazer requisições HTTP
import Axios from "axios";

/**
 * @function App
 * @description Este é o componente principal do aplicativo. Ele define a lógica para rolar um dado e exibir os resultados.
 * @returns {JSX.Element} O JSX para o componente App.
 */
function App() {
    // Inicializando o estado do resultado e dos resultados com useState
    const [resultado, setResultado] = useState();
    const [resultados, setResultados] = useState([]);

    // Array com os dados disponíveis para rolar
    const dadosDisponiveis = [2, 4, 6, 10, 20, 100];

    /**
     * @function rolarDado
     * @description Esta função faz uma requisição GET para a API que rola um dado com um número específico de lados.
     * @param {number} lados - O número de lados do dado a ser rolado.
     */
    function rolarDado(lados) {
        console.log(lados);

        // Fazendo uma requisição GET para a API que rola o dado
        Axios.get("http://localhost:3001/dado/" + lados)
            .then((res) => {
                // Criando um objeto com o resultado da rolagem e o número de lados do dado
                let rolagem = { resultado: res.data.resultado, lados: lados };

                // Atualizando o estado do resultado e dos resultados com a nova rolagem
                setResultado(rolagem);
                setResultados([rolagem, ...resultados]);
            })
            .catch((erro) => {
                // Logando qualquer erro que ocorra durante a requisição
                console.log(erro);
            });
    }

    // Renderizando o componente App
    return (
        <div className="App">
            <div id="dados">
                {/* Mapeando cada dado disponível para um botão que rola o dado quando clicado */}
                {dadosDisponiveis.map((dado) => {
                    return (
                        <button
                            onClick={() => {
                                rolarDado(dado);
                            }}
                        >
                            {`D${dado}`}
                        </button>
                    );
                })}
            </div>

            <div id="resultados">
                <div id="ultimoResultado">
                    {/* Exibindo o último resultado da rolagem de dados */}
                    Último resultado:{" "}
                    {resultado ? `${resultado.resultado} - D${resultado.lados}` : ""}
                </div>

                <div id="historicoResultado">
                    <h3>Histórico:</h3>

                    {/* Mapeando cada resultado para um elemento de parágrafo */}
                    {resultados.map((result, i) => {
                        let lados = result.lados;
                        let resultado = result.resultado;
                        let id = i + 1;

                        return (
                            <p key={i}>
                                <span>{id}:</span>

                                <span>
                                    {resultado} - D{lados}
                                </span>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Exportando o componente App como padrão
export default App;

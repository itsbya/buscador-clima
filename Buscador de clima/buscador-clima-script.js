document.addEventListener('DOMContentLoaded', () => {
    
    const fundo = document.querySelector('body');
    const botaoClaroEscuro = document.querySelector('#modo-claro-escuro');
    const resultado = document.querySelector('#container-resultado');
    const botaoPesquisar = document.querySelector('.botao');
   
   
    let modoEscuro = false;
   

    if(!botaoPesquisar || !botaoClaroEscuro || !resultado) {
        let especificacao;

        if(!botaoPesquisar) {
            especificacao = 'O elemento do botaoPesquisar não existe no DOM!';
        } else if(!botaoClaroEscuro) {
            especificacao = 'O elemento do botaoClaroEscuro não existe no DOM!';
        } else {
            especificacao = 'O elemento do resultado não existe no DOM!';
        };

        alert(especificacao);
        return;
    }
   

    botaoClaroEscuro.addEventListener('click', () => {
       if(!modoEscuro) {
        botaoClaroEscuro.innerHTML = 'Claro';
        fundo.style.backgroundColor = 'darkblue';
        fundo.style.color = 'white';
        resultado.style.color = 'white';
        modoEscuro = true;
       } else {
        botaoClaroEscuro.innerHTML = 'Escuro';
        fundo.style.backgroundColor = 'lightblue';
        fundo.style.color = 'black';
        modoEscuro = false;
       }
    });



    botaoPesquisar.addEventListener('click', (event) => {
        event.preventDefault();
     
        const inputCidade = document.querySelector('#input-cidade');
        const nomeDaCidade = inputCidade.value.trim();

        if(nomeDaCidade === '') {
            alert('Por favor, digite o nome de uma cidade');
            return;
        };

        const chave = '02a69a53d2c7fe93ce3c14cf48ea5dd9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&appid=${chave}&lang=pt_br&units=metric`;

        fetch(url) 
        .then(resposta => {
            if(!resposta.ok) {
                throw new Error('Cidade não encontrada');  
            }
            return resposta.json();
        })
        .then(dados => {
            const temperatura = dados.main.temp;
            const descricao = dados.weather[0].description;
            const icone = dados.weather[0].icon;
            const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;
            const umidade = dados.main.humidity;

            document.querySelector('#container-resultado').innerHTML = 
            `<p><strong>Temperatura:</strong> ${temperatura}°C</p>
            <p><strong>Clima:</strong> ${descricao}</p>
            <p><strong>Umidade:</strong> ${umidade}%</p>
            <img src='${urlIcone}' alt='ícone do clima'>
            `;
            
        })

        .catch(erro => {
            document.querySelector('#container-resultado').innerHTML = `<p>${erro.message}</p>`;
        });
        
    });

});
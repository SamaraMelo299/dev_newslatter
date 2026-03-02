# ✨ Dev Newsletter

Projeto Front-end | Landing Page + Integração com API Node.js

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-FFD43B?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-222222?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-111111?style=for-the-badge&logo=json&logoColor=white)

A **Dev Newsletter** é um projeto de estudo desenvolvido para simular um fluxo real de inscrição em uma newsletter voltada para devs em evolução 🚀.

A proposta do projeto é apresentar, de forma visual e objetiva, uma landing page com foco em **JavaScript**, **Node.js**, **APIs REST**, **boas práticas** e **dicas de carreira**, unindo interface responsiva com integração a um backend simples em **Node.js + Express**.

Diferente de uma página apenas estática, este projeto demonstra um fluxo mais completo: a pessoa usuária preenche o formulário na interface, os dados são validados no front-end, enviados para uma API local e processados no servidor 💻.

A interface foi organizada em seções como **Início**, **Benefícios**, **Conteúdo**, **FAQ**, **Sobre** e **Contato**, criando uma navegação mais estruturada e próxima de uma aplicação real. Além disso, o projeto conta com interações importantes para usabilidade e experiência do usuário, como **menu mobile**, **rolagem suave entre seções**, **destaque automático do link ativo no menu durante a rolagem**, **accordion no FAQ** e **feedback visual no envio do formulário** ✅.

No formulário, há validação de **nome** e **e-mail** antes do envio, o que ajuda a demonstrar prática com **manipulação do DOM**, **eventos em JavaScript**, **validação de dados** e **comunicação com API usando `fetch`**.

No back-end, a aplicação utiliza **Express** e leitura/escrita de arquivos para processar as inscrições recebidas. As rotas permitem verificar se a API está funcionando, listar os inscritos cadastrados e registrar novas inscrições.

Os dados **não são armazenados em banco de dados**. Cada nova inscrição é salva localmente no arquivo **`backend/subscribers.json`** 📁, tornando o projeto uma solução simples, funcional e muito útil para fins de estudo e demonstração de integração entre front-end e back-end.

De forma geral, este projeto foi criado para praticar fundamentos importantes do desenvolvimento web, como **HTML semântico**, **CSS responsivo**, **JavaScript no front-end**, **criação de API com Express** e **persistência simples em JSON**. É um projeto enxuto, mas com estrutura suficiente para demonstrar organização, interatividade e comunicação entre camadas em um mesmo repositório ✨.

---

## 📌 Funcionalidades

- Landing page responsiva para inscrição em newsletter
- Navegação entre seções da página
- Menu mobile interativo
- Destaque automático do link ativo no menu
- FAQ com comportamento de accordion
- Validação de nome e e-mail no front-end
- Feedback visual de carregamento, sucesso e erro
- Envio dos dados para API local
- Cadastro e listagem de inscritos no back-end
- Persistência local em `backend/subscribers.json`

---

## 🛠️ Tecnologias utilizadas

### Front-end
- HTML
- CSS
- JavaScript

### Back-end
- Node.js
- Express

### Persistência
- JSON local (`backend/subscribers.json`)

---

## 🚀 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/SamaraMelo299/dev_newslatter.git
cd dev_newslatter
```

## Para visualizar o front-end, basta abrir o arquivo index.html no navegador.

## Para executar o back-end:
```bash
cd backend
npm install
npm run dev
```

## O servidor será executado em:
```bash
http://localhost:3001
```

## 🔌 Rotas da API


- GET / — verifica se a API está funcionando

- GET /api/subscribers — lista os inscritos cadastrados

- POST /api/subscribe — registra uma nova inscrição com validação de nome e e-mail

## Exemplo de envio
```bash
{
  "name": "Seu Nome",
  "email": "seuemail@exemplo.com"
}
```

## 🎯 Objetivo do projeto

O principal objetivo deste projeto é simular uma experiência mais próxima de uma aplicação real, unindo interface, interações e integração com uma API própria.

Em vez de apresentar apenas uma página visual, ele demonstra um fluxo completo com validação, envio de dados, tratamento de resposta e persistência local, sendo um projeto de estudo muito útil para portfólio e evolução prática no desenvolvimento web 💡.

## 🔗 Links

- Deploy: https://samaramelo299.github.io/dev_newslatter/

- Repositório: https://github.com/SamaraMelo299/dev_newslatter

## 👩‍💻 Autora

 **Samara Melo**

⭐ Projeto desenvolvido como parte da minha jornada de evolução no desenvolvimento web, com foco na criação de aplicações práticas, organizadas e cada vez mais completas.

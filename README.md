# Sistema de Postagens de Notícias Escolares

![Logo](https://upload.wikimedia.org/wikipedia/commons/d/d4/Fiap-logo-novo.jpg)

## Alunos

- **Alexsandro Oliveira dos Santos** - RM352134
- **Carlos Henrique da Silva Amaral** - RM354431
- **Eduardo Pescinini Ruli** - RM351189
- **Guilherme Fernandes Alves** - RM355893
- **Vitor Hugo Gaspar de Souza** - RM354390

## Introdução

Esta documentação descreve todas as funcionalidades do sistema desenvolvido como parte do quarto Tech Challenge da Pós-Graduação em Full Stack Development - Turma 1FSDT.

O objetivo deste projeto é fornecer um guia sobre as funcionalidades do aplicativo Mobile desenvolvido em **React Native**, permitindo que o usuário compreenda como navegar pelas telas e utilizar os recursos corretamente.

## Desafios do Projeto

A FIAP propôs o desafio de criar um sistema de postagens de notícias para seus alunos. O sistema visa a criação e visualização de postagens por professores, bem como a busca e administração de conteúdo pelos usuários.

## Requisitos Funcionais

A aplicação consome os seguintes endpoints REST:

- **GET /posts**: Lista de todas as postagens.
- **GET /posts/{id}**: Leitura de uma postagem específica, acessada pelo ID.
- **POST /posts**: Criação de novas postagens.
- **PUT /posts/{id}**: Edição de postagens existentes.
- **GET /posts/admin**: Listagem de todas as postagens (visão administrativa).
- **DELETE /posts/{id}**: Exclusão de uma postagem específica.
- **GET /posts/search**: Busca de postagens por palavras-chave.

## Requisitos Técnicos

- **Aplicação Mobile em React Native**: Implementação de todas as funcionalidades utilizando os endpoints criados no back-end do projeto.
- **Persistência de Dados**: Banco de dados integrado ao back-end para garantir que os dados sejam manipulados e armazenados corretamente.
- **Documentação**: Documentação técnica detalhada do projeto, incluindo setup inicial, arquitetura e uso das funcionalidades.

## Tecnologias Utilizadas

- **React**
- **React Native**
- **Axios**
- **Typescript**
- **Expo**
- **Jest**

As versões dessas tecnologias estão descritas no arquivo `package.json` na raiz do projeto.

## Setup Inicial

### Requisitos do Sistema

Certifique-se de ter as seguintes tecnologias instaladas no seu ambiente de desenvolvimento:

- Node.js
- Expo CLI


### Instalação de Dependências

Para instalar as dependências, execute o seguinte comando no terminal:

```bash
npm i
```

## Execução do projeto

Para inicializar o projeto basta acessar o projeto e executar o seguinte comando no terminal:

```bash
npx expo start
```

Após a instalação do Android Studio e Expo é possível acessar o aplicativo no ambiente de emulação através da tecla "a" após executar o comando citado no item anterior.

Também é possível acessar a aplicação através de um dispositivo mobile com o Expo Go instalado.

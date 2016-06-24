# Ionic Chat
Projeto desenvolvido para apresentação do `Ionic 2` na disciplina de Tópicos em Sistemas de Informação II [7º período]

## Procedimentos

1) Instale o [NodeJS](https://nodejs.org/en/)

Ao instalar o NodeJS o NPM já estará incluso na instalação. O NPM é quem fará a instalação do Ionic 2 e Cordova.

1) Instalando Ionic 2
```bash
npm install -g ionic@beta
```

2) Instalando Cordova
```bash
npm install -g cordova
```

**Observação:** Se você estiver em um sistema operacional baseado em Unix, será necessário pedir permissão de usuário root

## Clonando o repositório

1) Parar clonar o repositório, execute:
```bash
git clone git@github.com:plinionaves/ionic-chat.git
```
()
2) Instalar dependências
```bash
npm install
```

3) Executar aplicação
```bash
ionic serve
```

## Servidor

A aplicação necessita de um servidor para a troca de informações através do `socket.io`.

Para isto foi criado um outro repositório que contém o servidor para esta aplicação, acesse: [Ionic Chat](https://github.com/plinionaves/node-chat-server)

# Rentalx
Projeto utilizado no módulo 2 do Ignite - TODO não estara com todos os detalhes do código, apenas a criação.

## Tecnologias 

- TypeScript
- Node
- ESLint
- Prettier

## Configurando Eslint com prettier

- Toda configuração foi realizada baseada no 
[Artigo de Configuração](https://www.notion.so/Configura-es-ESLint-e-Prettier-Ignite-5233b88fa9e8493fa958b9d6c96f0830)

## Projeto Iniciado

- Utilizamos o comando `yarn init -y` para criar o projeto, com isso instalamos o TypeScript como dependencia de Desenvolvimento `yarn add -D typescript`
- Para prosseguirmos instalamos o express e sua tipagem, ` yarn add express ` e `yarn add @types/express -D` como dependência de desenvolvimento.

## TSConfig

- Lembre-se de rodar um ` yarn tsc --init ` para que arquivo de configuração seja gerado.

### Rodando o servidor

Normalmente um ` node server.js ` já iria iniciar o nosso servidor e poderiamos testar as nossas rotas, mas como estamos trabalho com typescript isso não é possivel pois o node não entende essa escrita, para isso é preciso realizar a conversão desses aquivos .ts em vez de .js que agora estamos utilizando. 
 - Exemplo 
 ``` JS
 import express from 'express';

const app = express();

app.listen(3333, () => console.log('server is running!'));

 ```
 Caso rodassemos o `server.ts` contendo esse conteudo acima não iria funcionar então instalamos a dependência ` yarn add -D ts-node-dev ` que será encarregada de realizar a conversão do arquivo ts para o js e fazer com que tudo funcione corretamente. 

 Com tudo instalado agora precisamos definir um script dentro do arquivo `package.json` para que ele converta de forma automatica o arquivo que inicia o servidor:
 - Exemplo:
 ``` JSON
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
 ```
 Para que isso rode é apenas utilizar o ` yarn dev ` e tudo ira funcionar, caso tudo tenha corrido bem você deve receber em seu terminal (caso não saiba como abrir o terminal no VSCode, utilize no Win - Ctrl + ") a mensagem: 
 - Terminal: 
 ``` SH
IgniteCodes\rentalx>yarn dev
yarn run v1.22.10
$ ts-node-dev src/server.ts
[INFO] 10:52:24 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.3)
server is running!
 ```

 Com tudo isso seu código já deve estar funcionando, caso prefira crie uma rota `GET` para testar.

 Mas com apenas esse script podemos ter problemas ao utilizarmos durante o ambiente de desenvolvimento, para evitar isso iremos realizar algumas alterações no nosso script `dev`.
 - Exemplo:
 ``` JSON
   "scripts": {
    "dev": "ts-node-dev  --transpile-only --ignore-watch node_modules --respawn src/server.ts"
  },
 ```

Adicionamos acima o `--transpile-only` que não irá causando erros de sintaxe durante o desenvolvimento, `--ignore-watch ` node_modules` para que ele não fique ouvindo caso façamos a adição de uma biblioteca e por ultimo a `respawn` que fará sempre um reload na aplicação sempre que salvamos uma alteração no nosso código.

Para testarmos as alterações criamos um rota `GET` no `server.ts` e rodamos a aplicação.

- Exemplo: 
``` JS
app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
})
```
Se tudo correu certo, ao alterar e salvar a mensagem a aplicação deve atualizar automaticamente. 





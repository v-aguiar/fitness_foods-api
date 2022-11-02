<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://raw.githubusercontent.com/v-aguiar/mb_labs-api/main/assets/api-icon.png" alt="Project logo"></a>
</p>

<h3 align="center">mblabs-api</h3>

---

<p align="center"> API que possibilita revisar de maneira rápida a informação nutricional de produtos alimentícios, disponibilizados pela API da Open Foods.
    <br> 
</p>

## 📝 Guia rápido

- [Sobre](#about)
- [Instalação e configuração](#getting_started)
- [Como usar (endpoints)](#usage)
- [Deploy](#deployment)
- [Ferramentas Utilizadas](#built_using)
- [Desenvolvido por:](#authors)

## Sobre <a id = "about"></a>

Este projeto tem como objetivo dar suporte a equipe de nutricionistas da empresa Fitness Foods LC para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel. (Toda a informação nutricional é disponibilizada pela API da Open Foods)
<br>
Este projeto foi desenvolvido como um desafio técnico para a empresa MB Labs, intermediado pela Coodesh (<a href="https://lab.coodesh.com/v-aguiar/nodejs-20201030">NodeJs Challenge 20201030</a>)

## Instalação e configuração <a id = "getting_started"></a>

Estas instruções de instalção e configuração irão explicar como obter uma cópia deste projeto e fazê-lo rodar na sua máquina local.
<br>
<strong>Esses passos não são necessários caso você queira apenas utilizar a API, para isso basta acessar o link: <a href="https://mb-labs-api.herokuapp.com/">https://mb-labs-api.herokuapp.com/</a>
</strong>
<br>
<br>
Veja [Como usar](#usage) para mais informações sobre os endpoints e entender como cada um deles funciona.

### Pré requisitos

Para rodar este projeto na sua máquina local, você precisará ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) - Nele está incluso o NPM (Node Package Manager) que é o gerenciador de pacotes do Node.js, e o recomendado para este projeto, já que este foi construído inteiramente utilizando NPM. Mas você pode utilizar o Yarn, se preferir.
- [Bash](https://www.gnu.org/software/bash/) (ou qualquer outro terminal que suporte comandos bash)
- [Git](https://git-scm.com) - Previamente configurado com sua conta do Github (para clonar o repositório e, posteriormente, realizar o versionamento)
- [MongoDB](https://www.mongodb.com/) - Previmente configurado localmente ou em nuvem, aqui será necessário apenas a URL de conexão do mesmo

### Instalação

Para instalar este projeto, siga os seguintes passos:

- Pelo terminal, clone o repositório em uma pasta de sua preferência (aqui será utilizado o protocolo [SSH](https://docs.github.com/pt/github/authenticating-to-github/connecting-to-github-with-ssh), mas você pode utilizar o protocolo HTTPS caso deseje):

```bash
git clone git@github.com:v-aguiar/mb_labs-api.git

```

- Entre na paste do projeto e instale as dependências:

```bash
cd mb_labs-api
npm install
```

- Depois disso, será necessário configurar as variáveis de ambiente. Na raiz do projeto existe um arquivo chamado .env.example, copie o conteúdo deste arquivo e crie um novo arquivo chamado .env na mesma pasta. Cole o conteúdo copiado no arquivo .env e preencha as variáveis de ambiente com os valores correspondentes.
  <strong>
- A única variável de ambiente obrigatória é a DATABASE_URL, que será necessária para que a API consiga se conectar ao banco de dados.
  </strong>

- Seu arquivo .env deverá seguir uma estrutura como a seguinte:

```bash
DATABASE_URL=mongodb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}
PORT=4000
NODE_ENV=development
```

- Após configurar as variáveis de ambiente, você pode iniciar o servidor da API e começar a fazer requisições (veja [Como usar](#usage) para mais informações sobre os endpoints e entender como cada um deles funciona):

````bash

```bash
npm run dev
````

### Cron Job Personalizado (opcional)

- Caso você queira utilizar um cron job personalizado, você pode alterar a string no primeiro parâmetro da função `cron.schedule()`, no arquivo <strong>.src/server.ts</strong>, que por padrão está configurada para executar a cada 24 horas. Para mais informações sobre como configurar o cron job, acesse a documentação do <a href="https://www.npmjs.com/package/node-cron">node-cron</a>

```typescript
cron.schedule("* * * * *", () => {...})
```

## 🔧 Rodando os testes<a id = "tests"></a>

- Até o momento, apenas testes unitários foram implementados utilizando as ferramentas Jest e Supertest. Para rodar os testes, basta executar o seguinte comando:

```bash
npm run test
```

- Caso prefira rodar os testes em um container docker, basta executar o seguinte comando:

```bash
npm run test:docker
```

## 🎈 Como usar (endpoints) <a id="usage"></a>

- Para utilizar a API, você pode utilizar o link: <a href="https://mb-labs-api.herokuapp.com/">https://mb-labs-api.herokuapp.com/</a>
- Ou utilizar a url local: <a href="http://localhost:4000/">http://localhost:4000/</a> (caso você tenha seguido os passos de instalação e configuração descritos acima [Instalação e Configuração](#getting_started)).

### Endpoints

- <strong>GET "/"</strong>

  - Retorna um JSON com informações de memória, status de conexão com o banco de dados, uptime e quando foi a última vez que o cron job foi executado.

  - Retorno (exemplo):
    ```json
    {
      "date": "2022-11-02T14:32:36.738Z",
      "uptime": "0 minutes and 9 seconds",
      "memory_usage": "18.12 MB",
      "dbConnection": "OK",
      "lastCronJob": "2022-11-02T14:32:36.738Z"
    }
    ```

#

- <strong>GET "/products/?page"</strong>

  - Retorna todos os produtos cadastrados (limitados em 50 por página). Um parâmetro opcional `page` pode ser passado via <strong>query string</strong> para especificar qual página deve ser retornada.
  - Caso não seja informado o parâmetro page, os primeiros 50 produtos serão retornados por padrão.

  - Retorno:
    ```json
    [
      {
        "id": "636174caa7856a4941684bc1",
        "imported_t": "2022-11-01T19:34:34.385Z",
        "updatedAt": "2022-11-01T19:37:48.138Z",
        "status": "published",
        "code": "0815360014631",
        "url": "http://world_en.openfoodfacts.org/product/0815360014631/berry_lattice_pie",
        "creator": "org_database_usda",
        "created_t": "1587644821",
        "last_modified_t": "1587644821",
        "product_name": "Berry lattice pie",
        "quantity": "",
        "brands": "",
        "categories": "Biscuits and cakes, Cakes",
        "labels": "",
        "cities": "",
        "purchase_places": "",
        "stores": "",
        "ingredients_text": "Blackberries, water, enriched flour (flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), sugar, palm oil, food starch_modified, contains less than 2% of: salt, dextrose, corn syrup, sorbic acid, apple cider vinegar, carob bean gum, cellulose gum, agar, calcium propionate.",
        "traces": "",
        "serving_size": "0.2 PIE (136 g)",
        "serving_quantity": "136",
        "nutriscore_score": "13",
        "nutriscore_grade": "d",
        "main_category": "en:cakes",
        "image_url": ""
      },
      {...}
    ]
    ```

#

- <strong>GET "/products/:code"</strong>

  - Retorna um produto específico, de acorde com o código de barras `code` passado como parâmetro na rota.

  - Retorno:
    ```json
    {
      "id": "636174caa7856a4941684bc1",
      "imported_t": "2022-11-01T19:34:34.385Z",
      "updatedAt": "2022-11-01T19:37:48.138Z",
      "status": "published",
      "code": "0815360014631",
      "url": "http://world_en.openfoodfacts.org/product/0815360014631/berry_lattice_pie",
      "creator": "org_database_usda",
      "created_t": "1587644821",
      "last_modified_t": "1587644821",
      "product_name": "Berry lattice pie",
      "quantity": "",
      "brands": "",
      "categories": "Biscuits and cakes, Cakes",
      "labels": "",
      "cities": "",
      "purchase_places": "",
      "stores": "",
      "ingredients_text": "Blackberries, water, enriched flour (flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), sugar, palm oil, food starch_modified, contains less than 2% of: salt, dextrose, corn syrup, sorbic acid, apple cider vinegar, carob bean gum, cellulose gum, agar, calcium propionate.",
      "traces": "",
      "serving_size": "0.2 PIE (136 g)",
      "serving_quantity": "136",
      "nutriscore_score": "13",
      "nutriscore_grade": "d",
      "main_category": "en:cakes",
      "image_url": ""
    }
    ```

#

- <strong>PUT "/products/:code"</strong>

  - Atualiza um produto específico, de acorde com o código de barras `code` passado como parâmetro na rota. Os dados a serem atualizados devem ser passados no corpo da requisição no formato JSON.
  - Nenhum dado é obrigatório, mas pelo menos um valor deve ser informado para que a atualização seja realizada.
  - Ao atualizar um produto, o campo `updatedAt` é atualizado automaticamente com a data e hora da atualização.
  - É retornado uma mensagem de sucesso ou erro, dependendo do resultado da operação.

  - Retorno:
    - Status code: 200
    ```json
    {
      "message": "✔️ Product updated successfully!"
    }
    ```

#

- <strong>DELETE "/products/:code"</strong>

  - Deleta um produto específico, de acorde com o código de barras `code` passado como parâmetro na rota.
  - É retornado uma mensagem de sucesso ou erro, dependendo do resultado da operação.

  - Retorno:

    - Status code: 200

    ```json
    {
      "message": "✔️ Product deleted successfully!"
    }
    ```

    - Status code: 404

    ```json
    {
      "message": "⚠ No product found with the given code!"
    }
    ```

## 🚀 Deploy <a id = "deployment"></a>

Este projeto está disponível no Heroku, para a acessar a API basta utilizar o seguinte link para acessar os endpoints: <a href="https://mb-labs-api.herokuapp.com/">https://mb-labs-api.herokuapp.com/</a>

## ⛏️ Ferramentas Utilizadas <a id = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [TypeScript](https://www.typescriptlang.org/) - Language
- [MongoDB](https://www.mongodb.com/) - Database
- [Prisma ORM](https://www.prisma.io/) - ORM
- [Jest](https://jestjs.io/) - Testing Framework
- [Heroku](https://www.heroku.com/) - Cloud Platform
- [Node Cron](https://www.npmjs.com/package/node-cron) - Cron Job

## Desenvolvido por: <a id = "authors"></a>

- [@v-aguiar](https://github.com/v-aguiar) - Implementação da API
- [Coodesh - NodeJs Challenge 20201030](https://lab.coodesh.com/v-aguiar/nodejs-20201030) - Desafio proposto

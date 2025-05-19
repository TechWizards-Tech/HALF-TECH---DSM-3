
<h1 align="center">Fatec Jacareí- DSM 3º SEMESTRE</h1>

# <p>Equipe 💻: Half Tech </p>

# SOBRE O PROJETO
O projeto proposto surge no contexto da disciplina de **Gestão Ágil de Projetos de Software**, ofertada pela **FATEC Jacareí**, como parte da abordagem de **Aprendizagem Baseada em Projetos (ABP)**. 
A proposta é desenvolver uma **plataforma web interativa** capaz de disponibilizar, de forma acessível e visual, os dados meteorológicos coletados por **três estações instaladas no Lago de Furnas**. A região é caracterizada por episódios frequentes de **ventos extremos**, que colocam em risco a navegação e causam prejuízos ambientais, sociais e econômicos.

A plataforma deverá possibilitar:
- Visualização gráfica dos dados meteorológicos;
- Acesso ao histórico de medições em formato tabular;
- Comparação de dados entre diferentes estações;
- Download dos dados em formato CSV;
- Emissão de alertas sobre riscos aos navegantes da região.

Ao final do projeto, espera-se entregar uma solução funcional, com **interface responsiva**, **gráficos interativos** e recursos que facilitem a análise de dados meteorológicos por parte da população.

<br>
<br>
 </p>

## Link para o Trello

Clique [aqui](https://trello.com/b/OffzP11L/backlog-list-half-tech) para acessar o quadro do Trello do projeto.
<br>

## SPRINTS

| Sprint | Link        | Início      | Entrega     | Status |
|--------|-------------|-------------|-------------|--------|
| 01     | [Sprint 01](#sprint-1) | 24/03/2025 | 15/04/2025 |  ✔  |
| 02     | [Sprint 02](#sprint-2) | 16/04/2025 | 13/05/2025 | ✔   |
| 03     | [Sprint 03](#sprint-3) | 14/05/2025 | 11/06/2025 |    |

<br>

## :page_with_curl: Product Backlog

## REQUISITOS FUNCIONAIS

| REQUISITO FUNCIONAL_ID | REQUISITOS                                                                                                | SPRINTS |
|------------------------|-----------------------------------------------------------------------------------------------------------|---------|
|RF-1                    |O sistema deve restringir o acesso a usuários autenticados                                                 |#02✔    |
|RF-2                    |O sistema deve permitir a visualização do histórico de dados de cada estação em formato tabular            |#03      |
|RF-3                    |O sistema deve exibir gráficos com os parâmetros coletados por uma estação meteorológica                   |#02✔      |
|RF-4                    |O sistema deve permitir a comparação de um mesmo parâmetro entre diferentes estações por meio de gráficos  |#03      |
|RF-5                    |O sistema deve possibilitar o download de dados em formato CSV                                             |#03      |
<br>

## REQUISITOS NÃO FUNCIONAIS

| REQUISITO NÃO_FUNCIONAL_ID | REQUISITOS                                                                                          | SPRINTS |
|----------------------------|-----------------------------------------------------------------------------------------------------|---------|
|RNF-01                       |O sistema deve exibir gráficos interativos para melhor análise dos dados                             |#03      |
|RNF-02                       |A interface deve ser responsiva, garantindo um layout consistente em diferentes dispositivos e tamanhos de tela| #01✔ #02✔    |
|RNF-03                       |O sistema deve incluir uma página explicativa sobre o projeto                                        |#01✔        |
<br>

## RESTRIÇÕES DO PROJETO

| **RESTRIÇÕES DO PROJETO_ID** | **REQUISITOS**                                                                                                                                  | **SPRINTS** |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| **RP-01** | O protótipo da interface do sistema deve ser desenvolvido e validado utilizando o Figma. | #01          |
| **RP-02** | O sistema deve seguir o catálogo de tecnologias definido para o semestre, incluindo: O sistema deve utilizar **Node.js** (servidor), **React TypeScript** (interface), **MongoDB** (armazenamento), **GitHub** (documentação) e **GitHub Projects** ou **Trello** (controle de tarefas). | #01         |



<br>

## :page_with_curl: USER STORIES

<br>

| ID REFERÊNCIA | REMETENTE | INSTRUÇÃO | FINALIDADE |
|---------------|-----------|-----------|-------------|
| RF-1         | Usuário   | Como usuário autenticado, quero acessar o sistema apenas após realizar o login | Garantir a segurança e a integridade dos dados do sistema | 
| RF-2         | Usuário   | Como usuário, quero visualizar o histórico de dados de uma estação em formato tabular | Facilitar a leitura e análise das informações meteorológicas | 
| RF-3         | Usuário   | Como usuário, quero ver gráficos com os parâmetros coletados por uma estação | Obter uma visão clara e visual das medições realizadas | 
| RNF-01       | Usuário   | Como usuário, quero que os gráficos exibidos sejam interativos | Explorar melhor os dados e tornar a análise mais dinâmica | 
| RNF-02       | Usuário   | Como usuário, quero utilizar o sistema em diferentes dispositivos | Acessar os dados de forma consistente, independente do aparelho |
| RNF-03       | Visitante | Como visitante, quero acessar uma página que explique o objetivo e funcionamento do sistema | Entender mais sobre o projeto e seu propósito | 

<br>

## :page_with_curl: EQUIPE

<br>

| NOME               | FUNÇÃO        | GITHUB                               |
|--------------------|---------------|--------------------------------------|
| Raquel Nakamura    | Product Owner | [nakamuraraquel](https://github.com/nakamuraraquel) |
| Felipe Correa      | Developer     | [turnupthetaste](https://github.com/turnupthetaste) |
| Pollyana Sousa     | Scrum Master  | [Pollymeowth](https://github.com/Pollymeowth)  |

<br>

## LINGUAGENS E FERRAMENTAS
<br>
O desenvolvimento da plataforma seguirá o catálogo de tecnologias definido para o semestre, sendo elas:

- **Frontend:** React com TypeScript  
- **Backend:** Node.js  
- **Banco de Dados:** MongoDB  
- **Prototipação de Interface:** Figma  
- **Controle de Versão e Tarefas:** GitHub (Repositório e GitHub Projects ou Trello)


<span id="sprint-1">

## :page_with_curl: SPRINT 1 

Nesta primeira sprint, a nossa equipe irá focar no desenvolvimento do protótipo da interface da plataforma, com páginas de login, visualização de dados e gráficos, além da criação de uma página explicativa sobre o projeto. Serão aplicados os princípios de design responsivo e o protótipo será desenvolvido no Figma. Também será configurado o ambiente de desenvolvimento com as tecnologias definidas (Node.js, React TypeScript e MongoDB) e organizado o repositório no GitHub.


## :page_with_curl: SPRINT 2

Durante a Sprint 2, a equipe irá implementar o sistema de **autenticação de usuários**, para garantir que apenas usuários logados possam realizar download dos dados meteorológicos (função que será implementada na sprint 3). Também será desenvolvida a funcionalidade de **exibição de gráficos interativos**, permitindo a visualização dos dados coletados por cada estação meteorológica. Além disso, a interface foi aprimorada para garantir **responsividade**, oferecendo uma boa experiência em diferentes dispositivos e tamanhos de tela.

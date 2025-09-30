📒 PLANO DE SOFTWARE
O Plano de Software (PS) tem como propósito organizar e orientar o desenvolvimento do projeto, definindo visão, objetivos, escopo, equipe, cronograma e processos a serem seguidos. Ele funciona como guia de referência para garantir alinhamento entre os membros da equipe, rastreabilidade das atividades e evolução estruturada do software ao longo de seu ciclo de vida.

📋 IDENTIFICAÇÃO DO PROJETO
Nome do projeto: Unofertas

Equipe:
  - Bruna Hergenraeder
  - Amanda Cristina Moretto Lima Ferraz
  - Gabriel Bregalda Staudt
  - Mateus Padilha de Oliveira
  - Diogo Felipe Alves Brugnerotto

Repositório Git: https://github.com/RbHein/unofertas.git

Data de início: 04 de agosto de 2025

Previsão de término: 08 de dezembro de 2025

Versão do PS: v2025.08.18

⭐ INTRODUÇÃO
Contexto
Este projeto é um aplicativo mobile direcionado a estudantes da Unochapecó para que eles acompanhem promoções disponibilizadas pelas cantinas e vendedores autônomos dentro da Universidade.

Problema
A falta de conhecimento e divulgação de itens promocionais e econômicos disponibilizados pelas empresas.

Objetivos
Objetivo geral
Apresentar promoções/ofertas para que os alunos consigam realizar as suas refeições de maneira mais econômica. Além de, alavancar as vendas de vendedores autônomos e as cantinas locais.

Objetivos específicos
Demonstrar acessibilidade financeira ao estudante que deseja economizar ou não tenha condição financeira para arcar com os custos da alimentação;

Aumentar o comercial local;

Divulgar informações de utilidade ao estudante;

Expandir as escolhas alimentícias para os estudantes.

Público-alvo
Público direcionado especialmente para estudantes da Unochapecó. Será divulgado por meio de notificações para o usuário.

🏗️ ESCOPO
📌 O detalhamento completo dos requisitos pode ser encontrado no Documento de Requisitos (DR):https://docs.google.com/document/d/1Z5HDqbo1dzf-nyOR-oyBdFMnUNiBB8KR8AnP-VcMLWM/edit?tab=t.0.

Resumo
O estudante receberá notificações de promoções e pode acompanhar por meio de uma tela inicial (logada) as promoções já postadas, descrição, valor, localização e se disponível. Empresa/Vendedor Autônomo poderá cadastrar os itens e enviar as notificações promocionais para os demais.

Principais funcionalidades
Acompanhar Promoções;

Receber em tempo real notificação de promoções;

Economizar dinheiro dos estudantes;

Aumentar o comércio local;

Aumentar o alcance das cantinas.

Restrições / Limitações
Aceitação das cantinas;

Implantação;

Flexibilidade e atualizações.

Fora do escopo
Funcionalidades que não serão desenvolvidas neste projeto incluem um sistema de pagamento integrado, um sistema de avaliação de produtos, ou a integração com outras instituições além da Unochapecó. O projeto se limitará a divulgar as ofertas, sem intermediar transações financeiras.

🤝 ORGANIZAÇÃO E PAPÉIS
Papéis da equipe de desenvolvimento
Desempenhado por: Bruna Hergenraeder

Principais atribuições: Gerenciar e Atribuir Tarefas, Desenvolver o Front-end, Liderança de Equipe.

Desempenhado por: Mateus Padilha

Principais atribuições: Análise de dados, Ajuste de tarefas, Gerenciamento de telas.

Desempenhado por: Amanda Cristina Moretto Lima Ferraz

Principais atribuições: Desenvolver o Front-end.

Desempenhado por: Gabriel Bregalda Staudt

Principais atribuições: Teste de telas, Atribuir e gerenciar necessidades, Ajuste de interesses.

Desempenhado por: Diogo Felipe Alves Brugnerotto

Principais atribuições: Desenvolvimento Back-end, Suporte à infraestrutura.

Estrutura de trabalho
Divisões
Não existem subgrupos de trabalho. A equipe é unida e todos trabalham em colaboração.

Comunicação interna
Canais utilizados para comunicação:
WhatsApp: Para alinhamentos pontuais e urgentes.

Reuniões presenciais: Para discussões detalhadas e planejamento.

Reuniões e periodicidade
Reuniões de Planejamento: Semanais, com duração de 1 a 4 horas.

Reuniões de Revisão: Diárias, com duração de 15 minutos a 1 hora.

Distribuição de tarefas
As tarefas são priorizadas e atribuídas em reuniões semanais de planejamento. Cada membro da equipe tem a responsabilidade de atualizar seu status diariamente nas reuniões de revisão. O quadro Kanban será usado para visualizar o progresso de cada tarefa.

Documentação e rastreabilidade
Os documentos serão mantidos atualizados no repositório Git, em uma pasta dedicada. O histórico de commits e as Pull Requests (PRs) serão usados para rastrear as alterações e garantir a evolução estruturada do software.

Integração de feedbacks
Os feedbacks recebidos em sala de aula serão discutidos em reuniões semanais, e novas tarefas serão criadas no Kanban para incorporar as melhorias sugeridas.

Coordenação de entregas parciais
Bruna Hergenraeder é a responsável pelo acompanhamento de prazos e garantia das entregas parciais. Ela usará o quadro Kanban para monitorar o andamento das tarefas e garantir que a equipe atenda aos prazos estabelecidos.

💻 PROCESSO DE DESENVOLVIMENTO
Processo ágil
O projeto utilizará o framework Scrum. A equipe trabalhará em sprints semanais, com a meta de entregar incrementos de software funcionais a cada ciclo. O uso de Daily Scrums (reuniões diárias), Sprints Reviews (revisão do sprint) e Sprints Planning (planejamento do sprint) garante a flexibilidade e a adaptação contínua.

Definição de pronto (DoD)
Uma tarefa ou funcionalidade é considerada "pronta" quando:

O código foi implementado e testado.

Passou em todos os testes e integração.

O código foi revisado por outro membro da equipe.

A funcionalidade foi validada e aprovada pelo "Product Owner" ou equipe de qualidade.

A documentação interna e externa foi atualizada.

🗓️ CRONOGRAMA
O cronograma do projeto será detalhado em um quadro Kanban, onde cada etapa (To Do, Doing, Done) será visualizada de forma clara. As tarefas serão organizadas por prioridade para garantir que as funcionalidades mais importantes sejam desenvolvidas primeiro.

⚙️ GESTÃO DE CONFIGURAÇÃO
Estratégia de branches
main: A branch principal, contendo apenas o código pronto para produção.

develop: A branch de desenvolvimento, onde o trabalho diário é consolidado.

feature/<nome-da-funcionalidade>: Branches criadas a partir de develop para o desenvolvimento de novas funcionalidades.

hotfix/<nome-do-bug>: Branches criadas a partir de main para correções urgentes em produção.

As mesclagens de branches serão feitas via Pull Requests (PRs), que exigem no mínimo uma aprovação para serem mescladas.

Política de commits
As mensagens de commit devem seguir o padrão Convencional Commits, com o formato <tipo>: <descrição>, como em feat: adiciona tela de login ou fix: corrige bug de notificação. A frequência de commits deve ser constante, idealmente ao final de cada pequena tarefa.

Gestão de mudanças
Alterações nos requisitos serão registradas e aprovadas em reuniões semanais, com a Bruna como responsável pelo controle. O quadro Kanban e os documentos serão atualizados imediatamente após a aprovação de uma mudança no escopo ou prioridade.

☑️ GARANTIA DA QUALIDADE
O detalhamento completo de como será realizada a gestão de qualidade do projeto pode ser encontrado no Plano de Garantia de Qualidade de Software (PGQS).

📐 ARQUITETURA
O detalhamento completo da arquitetura do projeto pode ser encontrado no Documento de Arquitetura de Software (DAS).

☠️ RISCOS E MITIGAÇÕES
Risco	Probabilidade	Impacto	Ação de mitigação
Bugs críticos não detectados	🟨 Média	🟥 Alto	Revisões de código regulares e testes automatizados.
Baixa aceitação das cantinas	🟨 Média	🟥 Alto	Criar uma proposta de valor clara e realizar reuniões de apresentação e negociação.
Desafios técnicos inesperados	🟨 Média	🟨 Médio	Realizar pesquisas e protótipos para as funcionalidades mais complexas antes do desenvolvimento.
Incompatibilidade com dispositivos	🟩 Baixa	🟨 Médio	Testar o aplicativo em uma variedade de dispositivos e emuladores.

Exportar para as Planilhas
🗂️ RECURSOS
Hardware/ambiente
O desenvolvimento será realizado em computadores pessoais (desktops e notebooks) dos membros da equipe. Será utilizado um ambiente de emulação para testes mobile, além de dispositivos físicos quando necessário. O backend e o banco de dados serão hospedados em uma plataforma de nuvem.

Softwares/ferramentas
Linguagens e Frameworks: Typescript/Javascript (Front-end), Node.js (Back-end).

Banco de Dados: Firebase para dados em tempo real.

Controle de Versão: Git e GitHub.

Design: Figma para prototipagem e design de interfaces.

Comunicação: WhatsApp e Google Meet.

Gestão de Projetos: Quadro Kanban (Notion).

Testes: Frameworks de testes unitários (EXPOGO) e de integração.

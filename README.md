# 📒 PLANO DE SOFTWARE (PS)

O **Plano de Software (PS)** tem como propósito organizar e orientar o desenvolvimento do projeto, definindo visão, objetivos, escopo, equipe, cronograma e processos a serem seguidos. Ele funciona como guia de referência para garantir alinhamento entre os membros da equipe, rastreabilidade das atividades e evolução estruturada do software ao longo de seu ciclo de vida.

---

# 📋 IDENTIFICAÇÃO DO PROJETO

- **Nome do projeto:** Unofertas
- **Equipe:**
  - Bruna Hergenraeder
  - Amanda Cristina Moretto Lima Ferraz
  - Gabriel Bregalda Staudt
  - Mateus Padilha de Oliveira
  - Diogo Felipe Alves Brugnerotto
- **Repositório Git:** https://github.com/BrunaHer/QualidadeDeSoftware
- **Data de início:** 04 de agosto de 2025
- **Previsão de término:** 08 de dezembro de 2025
- **Versão do PS:** v2025.08.18

---

# ⭐ INTRODUÇÃO

## Contexto
Este projeto é um aplicativo mobile direcionado a estudantes da Unochapecó para que eles acompanhem promoções disponibilizadas pelas cantinas e vendedores autônomos dentro da Universidade.

## Problema
A falta de conhecimento e divulgação de itens promocionais e econômicos disponibilizados pelas empresas.

## Objetivos

### Objetivo geral
Apresentar promoções/ofertas para que os alunos consigam realizar suas refeições de maneira mais econômica, além de alavancar as vendas de vendedores autônomos e cantinas locais.

### Objetivos específicos
- Demonstrar acessibilidade financeira aos estudantes;
- Aumentar o comércio local;
- Divulgar informações de utilidade ao estudante;
- Expandir as escolhas alimentícias para os estudantes.

## Público-alvo
Público direcionado especialmente para estudantes da Unochapecó. As informações serão divulgadas por meio de notificações enviadas ao usuário.

---

# 🏗️ ESCOPO

📌 **Documento de Requisitos (DR):**  
https://docs.google.com/document/d/1Z5HDqbo1dzf-nyOR-oyBdFMnUNiBB8KR8AnP-VcMLWM/edit?tab=t.0

📌 **Quadro Kanban:**  
Notion → https://www.notion.so/27ddcc6324b280c9880ef0d08af83c8f?v=27ddcc6324b28013bb39000cadcdf869  
Google Sheets → https://docs.google.com/spreadsheets/d/1ztxLk1gdYK6MFFB-w_e1_h7h0JmA0cbidEr9pp8tRjQ/edit?usp=sharing

## Resumo
O estudante receberá notificações de promoções e poderá acompanhar, por meio da tela inicial (logado), promoções já postadas, incluindo descrição, valor e localização. A empresa ou vendedor autônomo poderá cadastrar itens e enviar notificações promocionais.

## Principais funcionalidades
- Acompanhar promoções;
- Receber notificações de promoções em tempo real;
- Ajudar estudantes a economizar dinheiro;
- Aumentar o comércio local;
- Ampliar o alcance das cantinas.
  
## Restrições / Limitações
- Aceitação das cantinas;
- Processo de implantação;
- Flexibilidade para atualizações futuras.

## Fora do escopo
Não serão desenvolvidos:
- Sistema de pagamento integrado;
- Sistema de avaliação de produtos;
- Integração com outras instituições além da Unochapecó.

---

# 🤝 ORGANIZAÇÃO E PAPÉIS

## Papéis da equipe de desenvolvimento

### Bruna Hergenraeder
**Principais atribuições:**
- Gerenciar e atribuir tarefas
- Desenvolver o Front-end
- Liderança da equipe

### Mateus Padilha
**Principais atribuições:**
- Ajuste de tarefas
- Testes

### Amanda Cristina Moretto Lima Ferraz
**Principais atribuições:**
- Desenvolvimento do Front-end
- Testes

### Gabriel Bregalda Staudt
**Principais atribuições:**
- Testes
- Gerenciamento de necessidades

### Diogo Felipe Alves Brugnerotto
**Principais atribuições:**
-

---

## Estrutura de trabalho

### Divisões
A equipe não possui subgrupos. Todos trabalham de forma colaborativa.

### Comunicação interna

**Canais utilizados:**
- WhatsApp para alinhamentos rápidos
- Reuniões presenciais para discussões detalhadas

### Reuniões e periodicidade
- **Reuniões de Planejamento:** Semanais (1h a 4h)
- **Reuniões de Revisão:** Diárias (15 min a 1h)

### Distribuição de tarefas
As tarefas são priorizadas em reuniões semanais. O Kanban é usado para acompanhar o progresso.

### Documentação e rastreabilidade
Os documentos serão mantidos atualizados no repositório Git. Commits e Pull Requests serão usados para rastrear as alterações.

### Integração de feedbacks
Feedbacks recebidos em sala serão discutidos semanalmente e registrados como novas tarefas no Kanban.

### Coordenação de entregas parciais
Responsável: **Bruna Hergenraeder**, que acompanhará prazos e andamento via Kanban.

---

# 💻 PROCESSO DE DESENVOLVIMENTO

## Processo ágil
O projeto utilizará o framework **Scrum**, com sprints semanais.  
Inclui:
- Daily Scrum  
- Sprint Review  
- Sprint Planning  

## Definição de pronto (DoD)
Uma tarefa está concluída quando:
- Código implementado e testado;
- Passou em todos os testes;
- Revisado por outro membro;
- Validado pela equipe ou PO;
- Documentação atualizada.

---

# 🗓️ CRONOGRAMA

O cronograma será acompanhado pelo Kanban:

- **Kanban (Sheets):** https://docs.google.com/spreadsheets/d/1ztxLk1gdYK6MFFB-w_e1_h7h0JmA0cbidEr9pp8tRjQ/edit?usp=sharing  
- **Kanban (Notion):** https://www.notion.so/27ddcc6324b280c9880ef0d08af83c8f?v=27ddcc6324b28013bb39000cadcdf869

---

⚙️ GESTÃO DE CONFIGURAÇÃO

## Estratégia de branches
- `main` → código de produção  
- `dev` → desenvolvimento contínuo  
- `dev-<nome>` → novos desenvolvimentos ou correções
  
Mesclagens via Pull Requests, com no mínimo uma aprovação.

## Política de commits
Padrão **Conventional Commits**, exemplos:
- `feat: adiciona tela de login`
- `fix: corrige bug de notificação`

## Gestão de mudanças
Alterações serão discutidas em reuniões semanais e atualizadas no Kanban pela responsável Bruna.

---

# ☑️ GARANTIA DA QUALIDADE

- **PGQS:** https://docs.google.com/document/d/1x7m5RUogQCi69s9KKDP6yl3N1tU1k-5WtYVFKpFbVvA/edit?usp=sharing
- **Plano de Testes:** https://docs.google.com/spreadsheets/d/1ImL0HrS54HTCYK4pPpd_KhaRIDmVMYd6by24kp2ZbL0/edit
- **Dimensão de Confiança:** https://docs.google.com/document/d/1p9RXCo7yzp-SUJxyoKqtn0qWVOJuTHrQqOGOrZlMc7c/edit

---

📐 ARQUITETURA

- **Documento de Arquitetura de Software (DAS):** https://docs.google.com/document/d/1V-VIeoI3sR9nLDQBM44Sc3IsUwxek7ZPq-lYkP5TZt4/edit?usp=sharing

---

# 🛡️ PLANO DE SEGURANÇA
Documento:  
https://docs.google.com/document/d/1mIIqRpMmzaCAeLbDqHJ5-f5ngHnxCdabDZ29qT4jWjk/edit?usp=sharing

---

# ☠️ RISCOS E MITIGAÇÕES

| Risco                           | Probabilidade | Impacto | Ação de mitigação |
|----------------------------------|---------------|---------|--------------------|
| Bugs críticos não detectados     | 🟨 Média      | 🟥 Alto | Revisões de código e testes automatizados |
| Baixa aceitação das cantinas     | 🟨 Média      | 🟥 Alto | Proposta de valor clara e reuniões de negociação |
| Desafios técnicos inesperados    | 🟨 Média      | 🟨 Médio | Pesquisas e protótipos prévios |
| Incompatibilidade com dispositivos | 🟩 Baixa     | 🟨 Médio | Testes em múltiplos dispositivos e emuladores |

---

# 🗂️ RECURSOS

## Hardware / Ambiente
- Computadores pessoais  
- Emuladores e dispositivos físicos  
- Backend e banco em nuvem

## Softwares / Ferramentas
- **Linguagens/Frameworks:** TypeScript/JavaScript, Node.js  
- **Banco de Dados:** Firebase  
- **Versionamento:** Git e GitHub  
- **Design:** Figma  
  - https://www.figma.com/design/jsn1ICWZ5eAcUSXFOmkDTb/Unofertas  
- **Design System (Notion):**  
  - https://www.notion.so/2bcdcc6324b28046bf4df85d3e8210a1?v=2bcdcc6324b2812f9642000c1d45bf66  
- **Comunicação:** WhatsApp e Google Meet  
- **Gestão:** Kanban (Notion/Google Sheets)  
- **Testes:** Frameworks unitários e integração (EXPOGO)

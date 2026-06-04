# Chamado Express 2.0

Chamado Express é uma aplicação web simples para montar textos de atendimento usando atalhos personalizados. Ela funciona direto no navegador, sem servidor, sem instalação de dependências e salvando os dados localmente.

## Funcionalidades

- Cadastro, edição, exclusão e reordenação de atalhos de texto
- Inclusão rápida de atalhos no campo de solução
- Montagem de texto para chamado com tipo, causa, solução, feedback e oportunidade de upsell
- Cópia do texto pronto com um clique
- Tema claro e tema escuro
- Salvamento dos atalhos e da preferência de tema no navegador

## Execução

Não é necessário instalar dependências ou rodar servidor.

1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Crie ou use os atalhos e copie o texto final do chamado

## Estrutura do Projeto

```text
chamado-express-2.0/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Como Funciona

Os atalhos ficam na lateral da tela. Ao marcar um atalho, o texto dele é adicionado ao campo de solução. Ao desmarcar, a última ocorrência daquele texto é removida.

No fim do atendimento, o botão `Copiar` monta o texto do chamado e envia para a área de transferência. Se o navegador bloquear a cópia, os campos continuam preenchidos para evitar perda de informação.

## Armazenamento

O projeto usa `localStorage`. Isso significa que os atalhos ficam salvos apenas no navegador utilizado. Limpar os dados do navegador também remove os atalhos salvos.

## Limitações

- Funciona apenas dentro do navegador
- Não faz substituição de texto em nível de sistema operacional
- Não sincroniza dados entre dispositivos
- Não possui login ou banco de dados externo

## Possíveis Evoluções

- Exportação e importação de atalhos
- Modal próprio para criar e editar atalhos
- Sincronização em nuvem
- Transformar em extensão de navegador

## Licença

Projeto de uso livre para fins educacionais e pessoais.

Use com responsabilidade.

## Autor

Desenvolvido por Luck BRJ

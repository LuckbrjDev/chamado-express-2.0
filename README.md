# Chamado Express 2.0

Chamado Express é uma ferramenta web para padronizar e acelerar registros de atendimento. O sistema permite montar respostas de chamados com atalhos reutilizáveis, mantendo uma rotina mais rápida, organizada e consistente.

O projeto roda direto no navegador, sem servidor e sem instalação de dependências.

## Recursos

- Montagem de chamado com tipo, causa, solução, feedback e oportunidade de upsell
- Atalhos personalizados para respostas recorrentes
- Cadastro, edição, exclusão e reordenação de atalhos
- Cópia segura do texto final para a área de transferência
- Tema claro e tema escuro
- Salvamento local dos atalhos e preferências do usuário
- Layout responsivo para desktop e telas menores

## Como Usar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em um navegador moderno
3. Preencha os campos do atendimento
4. Use os atalhos laterais para agilizar a solução
5. Clique em `Copiar chamado`

## Estrutura

```text
chamado-express-2.0/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Armazenamento

Os dados são salvos no `localStorage` do navegador. Isso mantém o projeto simples e local, mas significa que os atalhos ficam disponíveis apenas no navegador em que foram criados.

## Limitações

- Não sincroniza atalhos entre dispositivos
- Não possui autenticação de usuários
- Não usa banco de dados externo
- Não substitui textos fora do navegador

## Próximas Melhorias

- Exportação e importação de atalhos
- Modal próprio para criação e edição
- Histórico de chamados copiados
- Sincronização em nuvem
- Versão como extensão de navegador

## Autor

Desenvolvido por Luck BRJ

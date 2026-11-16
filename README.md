# Plano Alimentar 1.400

App pessoal (PWA) com o cardápio de Dia A e Dia B, marmitas, lista de compras, trocas e registro de peso com meta de água.

Endereço: https://gabriellebgr.github.io/plano-alimentar/

Para instalar no iPhone: abra o endereço no Safari, toque em Compartilhar e depois em **Adicionar à Tela de Início**. Depois da primeira abertura, funciona sem internet.

## Lista da casa

Com o Firebase configurado, o app pede login com e-mail e senha uma única vez em cada aparelho. A lista de compras é compartilhada: o que alguém marcar ou incluir aparece para todo mundo. O resto do app (cardápio, Hoje, peso) aparece só para a dona.

- `firebase-config.js`: configuração do app da Web do Firebase (pode ficar pública; quem protege os dados são as regras).
- `firestore.rules.exemplo`: modelo das regras do Firestore, com os e-mails de quem pode usar a lista.

Peso, água e refeições marcadas ficam salvos só no aparelho.

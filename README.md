## Installazione dell'ambiente

- Eseguire git clone
- Nella main directory del progetto, eseguire npm i
- Nella main directory del progetto, eseguire cd server
- Nella cartella server, eseguire ./pocketbase.exe serve per avviare il server (lasciare il terminale attivo)
- Nella main directory del progetto, eseguire npm run dev

## Architettura

- L'app è stata creata con React e TypeScript.
- State management: redux con redux-toolkit.
- Middleware: Thunk.
- UI: styled-component.
- Server: Pocketbase.
- Simulazione Pagamento: Stripe (numero carta da utilizzare 4242 4242 4242 4242)

## Struttura progetto

    src
    ├── components
    |    └── core
    |    └── ui
    └── page
    |  ├── cart
    |  ├── home
    |  └── summary
    |  ├── pdp
    |  └── index.ts
    └── redux
       ├── interface
       └── reducers
       ├── index
       ├── store

## Formattazione automatica

E' stato utilizzato Prettier per la formattazione del codice

<h1 align="center">
    <img alt="Anydoro" src="./public/logo.svg" width="400px" />
</h1>

<h2 align="center">
  Crie salas de colaboração em tempo real e aumente sua produtividade com trabalho em grupo
</h2>

<p align="center">

  <a href="">
    <img alt="Made by Edmarcos" src="https://img.shields.io/badge/Made%20by-Edmarcos-blueviolet">
  </a>

  <a href="LICENSE" >
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blueviolet">
  </a>

</p>

<p align="center">
  <a href="#calendar-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-como-executar-o-projeto">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;  
  <a href="#memo-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
</p>

## :calendar: Sobre

Anydoro é um projeto pensado para equipes que precisam trabalhar de forma remota e conciliar trabalho sincrono com produtividade e manutenção do foco e saude mental dos membros.

A aplicação permite que os membros do time possam se reunir em salas virtuais para realizar suas tarefas, enquanto compartilham o mesmo tempo nos ciclos do pomodoro.

O pomodoro, por sua vez, é uma técnica que pode ser aplicada tanto em estudos, trabalhos ou outras atividades que demandem grande quantidade de foco. A ideia principal é estipular um determinado tempo de foco para aplicar a uma tarefa, por exemplo 25 minutos, e depois descansar a mente por um curto período, como 5 minutos, para ter foco total novamente quando voltar a se dedicar a tarefa por outros 25 minutos.

Permitir que um time compartilhe o mesmo app pomodoro facilita o trabalho colétivo, uma vez que sempre haverá um momento em que todos estaram trabalhando, por tanto solicitações e comunicações podem ser feitas, e haverá um período de intervalo comum, onde cada membro sabe que o outro está descansando e não intervem com demandas sobre o trabalho.

Além disso, quando se usa o pomodoro sozinho, é muito mais fácil burlar o tempo, parando para descansar mais cedo, ou mesmo ignorando seu tempo de descanso, o que também é prejudicial. Quando se está em um time, seguindo um mesmo rítimo, se torna mais fácil manter o fluxo do pomodoro funcionando de forma eficiente.

Se tem dúvida dos benefícios do pomodoro em grupo, consulte esse [link](https://www.ufrgs.br/jornal/pos-graduandos-criam-grupo-online-para-seguir-o-metodo-de-estudo-pomodoro/).


## :computer: Como executar o projeto

Este projeto foi desenvolvido inteiramente utilizando-se do framework [Nextjs](https://nextjs.org/) e o serviço de Backend-as-a-service (Baas) [Firebase](https://firebase.google.com/).

Para te-lo funcionando em sua maquina, faça o clone ou fork desse repositório e digite um dos comandos a seguir para baixar as dependencias:

```sh
npm install
```
ou, para quem usa yarn:

```sh 
yarn
```

Depois disso você precisará de um projeto web funcionando no firebase para servir como o seu backend. Vá para [esse endereço](https://console.firebase.google.com/) e crie um projeto com Realtime database e auth google e github habilitados.

Com o projeto criado. Crie um arquivo .env.local dessa forma e substitua os valores com suas credenciais.

```ts
NEXT_PUBLIC_API_KEY="Valor da sua credencial"
NEXT_PUBLIC_AUTH_DOMAIN="Valor da sua credencial"
NEXT_PUBLIC_PROJECT_ID="Valor da sua credencial"
NEXT_PUBLIC_STORAGE_BUCKET="Valor da sua credencial"
NEXT_PUBLIC_MESSAGING_SENDER_ID="Valor da sua credencial"
NEXT_PUBLIC_APP_ID="Valor da sua credencial"
NEXT_PUBLIC_MEASUREMENT_ID="Valor da sua credencial"
NEXT_PUBLIC_DATABASE_URL="Valor da sua credencial"
```

Pronto. Seu projeto está pronto para ser executado. Para isso, utilize um dos comandos abaixo.

npm:

```sh
npm run dev
```
ou yarn:

```sh
yarn dev
```
Depois disso acesso http://localhost:3000 e você verá a tela inicial do Anydoro.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.
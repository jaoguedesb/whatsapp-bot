const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'pousada-bot',
  catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
    console.log('⚠️ Escaneie este QR Code para conectar o bot!');
    console.log(asciiQR); // Mostra versão em texto no log
    console.log(`✅ Abra este link no navegador para ver o QR Code:`);
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${urlCode}`);
  },
  statusFind: (statusSession, session) => {
    console.log('Status da sessão:', statusSession);
    console.log('Sessão:', session);
  },
  headless: true, // Mantém em modo headless (necessário no Render)
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    const msg = message.body.toLowerCase();
    const nomeUsuario = message.notifyName || 'Amigo(a)';

    // Saudação conforme horário
    const hora = new Date().getHours();
    let saudacao = 'Olá';
    if (hora >= 5 && hora < 12) saudacao = 'Bom dia';
    else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';

    // Se for número de opção (1-8), responde sem mostrar menu de novo
    if (['1','2','3','4','5','6','7','8'].includes(msg)) {

      if (msg === '1') {
        await client.sendText(message.from, '📍 Nossa pousada oferece conforto e contato com a natureza. Aceitamos crianças e pets. Localização próxima à praia.');
      }

      if (msg === '2') {
        await client.sendText(message.from, `📅 Para fazer sua reserva, por favor envie:\n- Data de entrada\n- Data de saída\n- Número de hóspedes`);
      }

      if (msg === '3') {
        await client.sendText(message.from, '🍽️ Nosso restaurante funciona das 7h às 22h. Servimos café da manhã, lanches, pizzas e drinks.');
      }

      if (msg === '4') {
        await client.sendText(message.from, '🎶 Oferecemos opções de lazer como caiaque, stand up paddle, música ao vivo e passeios guiados pela ilha.');
      }

      if (msg === '5') {
        await client.sendText(message.from, '⛴️ Consulte os horários das embarcações para Algodoal. Também temos convênio com estacionamento seguro próximo ao porto.');
      }

      if (msg === '6') {
        await client.sendText(message.from, '👥 Oferecemos condições especiais para grupos e excursões escolares. Entre em contato para mais detalhes.');
      }

      if (msg === '7') {
        await client.sendText(message.from, '🛏️ Sentimos muito por qualquer inconveniente. Informe o problema e nossa equipe resolverá o mais rápido possível.');
      }

      if (msg === '8') {
        await client.sendText(message.from, '🙋 Encaminhando para atendimento humano... aguarde um momento!');
      }

    } else {
      // Qualquer outra palavra mostra o menu com saudação personalizada
      await client.sendText(
        message.from,
        `👋 ${saudacao}, *${nomeUsuario}*!\nSou o assistente virtual da *Pousada Algodoal Mitologia* 🌴`
      );

      await client.sendText(
        message.from,
        `Como posso te ajudar?\n\nDigite:\n1️⃣ Sobre a pousada\n2️⃣ Reservas\n3️⃣ Restaurante\n4️⃣ Lazer na Ilha\n5️⃣ Travessia e Estacionamento\n6️⃣ Grupos e Excursões\n7️⃣ Problemas na acomodação\n8️⃣ Atendimento humano`
      );
    }
  });
}

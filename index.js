const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'pousada-bot',
  catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
    console.log('⚠️ Escaneie este QR Code para conectar o bot!');
    console.log(asciiQR); 
    console.log(`✅ Abra este link no navegador para ver o QR Code:`);
    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${urlCode}`);
  },
  statusFind: (statusSession, session) => {
    console.log('Status da sessão:', statusSession);
    console.log('Sessão:', session);
  },
  headless: true,
  browserArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ],
  puppeteerOptions: {
    executablePath: '/usr/bin/google-chrome' // caminho usado no Render/Heroku
  }
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    const msg = message.body.toLowerCase();
    const nomeUsuario = message.notifyName || 'Amigo(a)';

    const hora = new Date().getHours();
    let saudacao = 'Olá';
    if (hora >= 5 && hora < 12) saudacao = 'Bom dia';
    else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';

    if (['1','2','3','4','5','6','7','8'].includes(msg)) {
      if (msg === '1') await client.sendText(message.from, '📍 Nossa pousada oferece conforto e contato com a natureza...');
      if (msg === '2') await client.sendText(message.from, `📅 Para fazer sua reserva, envie:\n- Data de entrada\n- Data de saída\n- Número de hóspedes`);
      if (msg === '3') await client.sendText(message.from, '🍽️ Nosso restaurante funciona das 7h às 22h...');
      if (msg === '4') await client.sendText(message.from, '🎶 Temos lazer como caiaque, stand up paddle, música ao vivo...');
      if (msg === '5') await client.sendText(message.from, '⛴️ Consulte horários de travessia e estacionamento...');
      if (msg === '6') await client.sendText(message.from, '👥 Condições especiais para grupos e excursões...');
      if (msg === '7') await client.sendText(message.from, '🛏️ Informe o problema e nossa equipe resolverá rápido...');
      if (msg === '8') await client.sendText(message.from, '🙋 Encaminhando para atendimento humano...');
    } else {
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

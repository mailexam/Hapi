require('dotenv').config();

const Hapi = require('@hapi/hapi');
const { sendTest } = require('./mail');

async function init() {
  const host = process.env.HTTP_HOST || '127.0.0.1';
  const port = Number(process.env.HTTP_PORT || 3000);

  const server = Hapi.server({ port, host });

  server.route({
    method: 'POST',
    path: '/mail/test',
    options: {
      payload: {
        parse: true,
        allow: 'application/json',
      },
    },
    handler: async (request, h) => {
      try {
        const { to, subject, text } = request.payload || {};

        await sendTest({ to, subject, text });

        return { status: 'ok' };
      } catch (err) {
        console.error(err);
        return h.response({ error: err.message }).code(500);
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

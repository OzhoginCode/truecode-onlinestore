import 'reflect-metadata';

import server from '../src/server';

const port = 3000;

server().listen(port, () => {
  console.log(`Server was started on '${port}'`); // eslint-disable-line
});

import { app } from './app';

import { getConfigValue } from './utils/config';
import { format } from 'util';

app.set('port', getConfigValue('APP_PORT') || 8000);

// app.listen(app.get('port'), () => {
//   console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
//   console.log(' Press CTRL-C to stop\n');
// });

app.listen(app.get('port'), () => {
  const address = format('http://localhost:%d', app.get('port'));
  console.log('  App is running at %s in %s mode', address, app.get('env'));
  console.log('  Press CTRL-C to stop\n');
  console.log('  Making HTTP calls..');
});

import { app } from './app';
import { getConfigValue } from './utils/config';

app.set('port', getConfigValue('APP_PORT') || 8000);

app.listen(app.get('port'), () => {
  console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log(' Press CTRL-C to stop\n');
});

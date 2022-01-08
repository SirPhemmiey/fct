import Logger from './core/Logger';
import app from './app';

const listener = app.listen(app.get("port"), () => {
    console.info("Cache service is running at http://localhost:%d", app.get("port"));
 });
 
 process.on('SIGTERM', () => {
     listener.close(() => {
       Logger.info('Closing http server.');
       process.exit(0);
     });
 });
 
 export { app }
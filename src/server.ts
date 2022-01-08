import Logger from './core/Logger';
import app from './app';

// app
//   .listen(app.get('port'), () => {
//     Logger.info("Villa booking service is running at http://localhost:%d", app.get("port"));
//   })
//   .on('error', (e) => Logger.error(e));

const listener = app.listen(app.get("port"), () => {
    console.log("Villa booking service is running at http://localhost:%d", app.get("port"));
 });
 
 process.on('SIGTERM', () => {
     listener.close(() => {
       Logger.info('Closing http server.');
       process.exit(0);
     });
 });
 
 export { app }
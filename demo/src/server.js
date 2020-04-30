
//import ReduxServer from '@pawjs/redux/server';
import React from 'react';
/*import * as AppReducers from './rootreducer/reducers';
import ApiMiddleware from './apiRoutes';*/
//import SessionMiddleware from './session';
import SessionMiddleware from './sess';

/*const loggingMiddleware = store => next => action => {
  console.log('action:', action)
  const result = next(action)
  console.log('state after action:', store.getState())
  return result
}*/


export default class Server {
  // eslint-disable-next-line
  constructor({ addPlugin ,addMiddleware}) {
  /*const reduxServer = new ReduxServer({ addPlugin });
  reduxServer.setReducers(AppReducers);
  addPlugin(reduxServer);
  addMiddleware(SessionMiddleware)
  addMiddleware(ApiMiddleware);
  reduxServer.addMiddleware(loggingMiddleware)*/
  
  }
  
  apply(serverHandler) {
    this.serverHandler = serverHandler;
    
 
/*this.serverHandler.hooks.renderRoutes.tap('AddAppShell', ({ setRenderedRoutes, getRenderedRoutes }) => {
      setRenderedRoutes(<AppShell>{ getRenderedRoutes() }</AppShell>);
    });*/
   /* this.serverHandler.hooks.reduxInitialState.tapPromise('AppInitialState', async ({ getInitialState, setInitialState },app,req,res) => {
      const initialState = Object.assign({}, getInitialState());
      setInitialState(initialState);
    });*/

    serverHandler.hooks.beforeLoadData.tapPromise(
      'CookiesToLoadData',
      async (setParams, getParams, req) => {
        setParams('hdr', req.headers);
      },
    );

     this.serverHandler.hooks.beforeHtmlRender.tapPromise('AddReduxPreloadedState', async (app, req, res) => {
        if (res.locals.reduxStore && res.locals.reduxStore.getState) {
          const reduxState = res.locals.reduxStore.getState();
          app.htmlProps.footer.push(
            <script
              key="reduxPreloadedState"
              dangerouslySetInnerHTML={{
                __html: `window.PAW__REDUX_PRELOADED_STATE = ${JSON.stringify(reduxState)}`,
              }}
            />,
          );
        }
      }); 
    serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
      const { htmlProps: { head } } = Application;
      // Add dns precache for hn firebase api
  
    });
  }
}

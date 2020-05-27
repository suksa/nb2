import React from "react"
import Head from 'next/head'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import AppLayout from '../components/AppLayout'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers'
import rootSaga from '../sagas';

const NodeBird = ({ Component, store, pageProps }) => { // next에서 넣어주는 props
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"
                />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
}

NodeBird.getInitialProps = async (context) => { // next에서 알아서 실행해서 context를 넣어줌
    const { ctx, Component } = context
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(ctx)
    }
    return { pageProps }
}

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
  };
  
  export default withRedux(configureStore)(NodeBird);


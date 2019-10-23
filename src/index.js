import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs, resolvers } from './graphql/cache';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers
});

const TogglesApp = () => (
  <ApolloProvider client={client}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ApolloProvider>
);

ReactDOM.render(<TogglesApp />, document.getElementById('root'));

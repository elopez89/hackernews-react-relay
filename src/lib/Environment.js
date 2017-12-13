import  { GRAPHQL_ENDPOINT, GC_AUTH_TOKEN } from '../constants'
const {
    Environment,
    Network,
    RecordSource,
    Store,
  } = require('relay-runtime');

  const fetchQuery = (
      operation, 
      variables
  ) => {
      return fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'accept': 'application/json',
              'authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
          },
          body: JSON.stringify({
              query: operation.text,
              variables,
          }),
      }).then(res => res.json());
  }
  
  const source = new RecordSource();
  const store = new Store(source); // create new store instance
  const network = Network.create(fetchQuery); 
  
  const environment = new Environment({
    network,
    store,
  });

  export default environment
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {createUploadLink} from 'apollo-upload-client';

const httpLink = createHttpLink({
  uri: Config.API_URL,
  // uri: 'http://192.168.30.223:3333/graphql',
  // uri: 'http://192.168.30.134:4000/graphql',
});
const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists

  const token = await AsyncStorage.getItem('userToken');
  // console.log("token", token)
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});
// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
export const apolloClientsUploadFile = (
  accessToken?: string | undefined | null,
) => {
  const uploadLink = createUploadLink({
    uri: Config.API_URL,
  });

  const token = accessToken;

  const authLinks = setContext((_, {headers}) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : '',
      },
    };
  });
  const apolloClients = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLinks.concat(uploadLink),
  });

  return apolloClients;
};

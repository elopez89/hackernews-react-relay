import {
    commitMutation,
    graphql
  } from 'react-relay'
  import environment from '../lib/Environment'
  
  const mutation = graphql`
    mutation CreateUserMutation($createUserInput: SignupUserInput!, $signinUserInput: SigninUserInput!) {
      createUser(input: $createUserInput) {
        user {
          id
        }
      }
  
      signinUser(input: $signinUserInput) {
        token
        user {
          id
        }
      }
    }
  `

  export default (email, password, callback) => {
    const variables = {
      // 1 
      createUserInput: {
        authProvider: {
          email: {
            email,
            password
          }
        },
        clientMutationId: ""
      },
      // 2
      signinUserInput: {
        email: {
          email,
          password
        },
        clientMutationId: ""
      }
    }
  
    // 3
    commitMutation(
      environment,
      {
        mutation,
        variables,
        // 4
        onCompleted: (response) => {
          const id = response.createUser.user.id
          const token = response.signinUser.token
          callback(id, token)
        },
        onError: err => console.error(err),
      },
    )
  }
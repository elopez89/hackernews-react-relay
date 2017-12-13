// 1
import {
    commitMutation,
    graphql,
  } from 'react-relay'
  import environment from '../lib/Environment'
  
  // 2
  const mutation = graphql`
    mutation CreateLinkMutation($input: CreateLinkInput!) {
      createLink(input: $input) {
        link {
          id
          createdAt
          url
          description
          postedBy {
            id
            email
          }
        }
      }
    }
  `
  
  // 3
  export default (postById, description, url, callback) => {
    // 4
    const variables = {
      input: {
        postById,
        description,
        url,
        clientMutationId: ""
      },
    }
  
    // 5
    commitMutation(
      environment,
      {
        mutation,
        variables,
        // 6
        onCompleted: () => {
          callback()
        },
        onError: err => console.error(err),
      },
    )
  }
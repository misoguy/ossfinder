import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
${fragments.repository}
${fragments.label}
query Me($after:String) {
  viewer {
    login
    name
    avatarUrl
    starredRepositories(first: 10 after:$after) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ...repository
        labels(first: 10) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          nodes {
            ...label
          }
        }
      }
    }
  }
}
`;

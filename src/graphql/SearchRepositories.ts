import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
${fragments.repository}
${fragments.label}
query SearchRepositories($q: String!, $after: String) {
  search(type: REPOSITORY query: $q first: 10 after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      ... on Repository {
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

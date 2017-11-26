import gql from 'graphql-tag';

export default gql`
mutation RemoveStar($repoId: ID!) {
  removeStar(input: { starrableId: $repoId }) {
    starrable {
      id
    }
  }
}
`;

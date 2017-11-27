import gql from 'graphql-tag';

export default gql`
  mutation StarRepository($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        id
      }
    }
  }
`;

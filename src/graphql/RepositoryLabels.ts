import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
${fragments.repository}
${fragments.label}
query RepositoryLabels ($owner:String!, $name:String!, $after:String) {
	repository(owner:$owner name:$name) {
    ...repository
		labels(first: 10 after:$after) {
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
`;

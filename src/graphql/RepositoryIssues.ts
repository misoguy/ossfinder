import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
${fragments.repository}
${fragments.issue}
${fragments.label}
query RepositoryIssues ($owner:String!, $name:String!, $labels:[String!]) {
	repository(owner:$owner name:$name) {
    ...repository
		issues(labels:$labels first: 10 states: OPEN orderBy: {field: CREATED_AT direction: DESC}) {
			nodes {
				...issue
				labels(first: 5) {
					nodes {
						...label
					}
				}
				comments {
					totalCount
				}
			}
		}    
  }
}
`;

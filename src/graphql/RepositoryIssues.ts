import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
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
${fragments.repository}
${fragments.issue}
${fragments.label}
`;

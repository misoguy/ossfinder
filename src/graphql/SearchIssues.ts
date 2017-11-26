import gql from 'graphql-tag';
import fragments from './fragments';

export default gql`
${fragments.issue}
${fragments.repository}
${fragments.label}
query SearchIssues ($query:String!, $after:String) {
	search(type: ISSUE query: $query first: 10 after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
			... on Issue {
        ...issue
        repository {
          ...repository
        }
				labels(first: 5) {
					nodes {
						...label
					}
				}
        comments(first: 5) {
          totalCount
          # nodes {
          #   bodyHTML
          # }
        }
      }
    }
  }
}
`;



import gql from 'graphql-tag';

export default {
  issue: gql`
    fragment issue on Issue {
      id
      title
      url
      bodyHTML
      createdAt
    }
  `,
  label: gql`
    fragment label on Label {
      id
      name
      color  
    }
  `,
  repository: gql`
    fragment repository on Repository {
      id
      nameWithOwner
      url
      descriptionHTML
      viewerHasStarred
      stargazers {
        totalCount
      }
      primaryLanguage {
        id
        name
        color
      }
    }
  `,
};

import RepositoryCard from '@/components/RepositoryCard.vue';
import store from '@/vuex/store';

const initialRepo = {
  labels: {
    pageInfo: {
      endCursor: 'Y3Vyc29yOnYyOpHOLOMQCw==',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 'Y3Vyc29yOnYyOpHOLMMMnA==',
      __typename: 'PageInfo',
    },
    nodes: [{
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTI=',
      name: 'bug',
      color: 'ee0701',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTM=',
      name: 'duplicate',
      color: 'cccccc',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTQ=',
      name: 'enhancement',
      color: '84b6eb',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTU=',
      name: 'help wanted',
      color: '33aa3f',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTY=',
      name: 'good first issue',
      color: '7057ff',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTc=',
      name: 'invalid',
      color: 'e6e6e6',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTg=',
      name: 'question',
      color: 'cc317c',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTA5ODAyNTk=',
      name: 'wontfix',
      color: 'ffffff',
    }, {
      __typename: 'Label',
      id: 'MDU6TGFiZWw3NTMwNzgyODM=',
      name: 'feature request',
      color: '0e8a16',
    }],
    __typename: 'LabelConnection',
  },
  __typename: 'Repository',
  id: 'MDEwOlJlcG9zaXRvcnkxMTA4MDI4OTQ=',
  nameWithOwner: 'misoguy/ossfinder',
  url: 'https://github.com/misoguy/ossfinder',
  descriptionHTML: '<div>Open Source Software Finder</div>',
  viewerHasStarred: true,
  stargazers: {
    totalCount: 3,
    __typename: 'StargazerConnection',
  },
  primaryLanguage: {
    id: 'MDg6TGFuZ3VhZ2UxNDA=',
    name: 'JavaScript',
    color: '#f1e05a',
    __typename: 'Language',
  },
};

describe('RepositoryCard.vue', () => {
  it('should render correct contents', () => {
    const vm = new RepositoryCard({
      propsData: { initialRepo },
      store,
    }).$mount();
    expect(vm.$el).toBeTruthy();
  });
});

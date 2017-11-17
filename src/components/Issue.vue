<template>
  <div>
    <a :href="issue.repoUrl" target="_blank">{{issue.nwo}}</a>
    <a :href="issue.issueUrl" target="_blank">{{issue.title}} comments:{{issue.totalComments}}</a>
    <span v-for="label in issue.labels.nodes" :key="label.id">{{label.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'Issue',
  props: ['issue'],
};
</script>

<template>
  <img width="100%" src="/static/image.jpeg" alt="Open Source Software" />
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    login(token) {
      this.$store.dispatch('login', token).then(() => {
        this.$router.push('profile');
      });
    },
  },
};
</script>

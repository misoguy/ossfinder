<template>
  <button
    :style="{backgroundColor: `#${color}`, color: fontColor}"
    class="label-btn"
    @click="handleClick"
  >
    <v-icon v-if="isSelected" :style="{color: fontColor}">visibility</v-icon>
    {{name}}
  </button>
</template>

<script>
export default {
  name: 'Label',
  props: {
    name: !String,
    color: !String,
    isSelected: Boolean,
    onClick: Function,
  },
  computed: {
    fontColor() {
      const r = parseInt(this.color.substr(0, 2), 16);
      const g = parseInt(this.color.substr(2, 2), 16);
      const b = parseInt(this.color.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#333333' : '#ffffff';
    },
  },
  methods: {
    handleClick() {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },
  },
};
</script>

<style scoped>
  .label-btn {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin: 0.3rem;
    font-weight: 600;
  }
  .label-btn > i {
    font-size: 1.2rem;
  }
</style>

<template>
  <div
    :style="{backgroundColor: `#${color}`, color: fontColor}"
    class="label-btn"
  >
    <button class="label-name-btn" @click="clicked">
      <v-icon v-if="isSelected" :style="{color: fontColor}">visibility</v-icon>
      {{name}}
    </button>
    <button v-if="showRemoveButton" class="label-remove-btn" @click.stop="remove">
      <v-icon :style="{color: fontColor}">
        remove_circle_outline
      </v-icon>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Label',
  props: ['name', 'color', 'isSelected', 'showRemoveButton'],
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
    clicked() {
      this.$emit('clicked');
    },
    remove() {
      this.$emit('remove');
    },
  },
});
</script>

<style scoped>
  .label-btn {
    flex: 0 0 auto;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin: 3px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }
  .label-name-btn {
    flex: 1 1 auto;
  }
  .label-remove-btn {
    margin-left: 0.3rem;
  }
  .label-name-btn > i {
    font-size: 1.2rem;
  }
</style>

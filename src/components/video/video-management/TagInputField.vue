<template>
  <v-text-field dense outlined label="Login" />
</template>
<script>
export default {
  data() {
    return {
      chips: ["Programming", "Playing video games"],
      items: ["Streaming", "Eating"],
    };
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
  },
};
</script>
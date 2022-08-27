<script setup lang="ts">
  import CoinTracker from './components/coin-tracker.ce.vue';
</script>

<template>
  <h1 class="title-app">Hellow Web components</h1>

  <coin-tracker background="yellow" pair="SOL-USD" />
</template>

<style>
  .title-app {
    text-align: center;
  }
</style>


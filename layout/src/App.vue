<template>
  <div id="app">
    <EleHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import Mock from 'mockjs';
import EleHeader from './components/ele_header';
export default {
  name: 'App',
  components: { EleHeader }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

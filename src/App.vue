<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Schedule from './components/NewSchedule';

export default {
  name: 'app',
  components: {
    Navbar,
    Schedule
  }
};
</script>

<style>
nav {
  margin-bottom: 10px;
}
</style>

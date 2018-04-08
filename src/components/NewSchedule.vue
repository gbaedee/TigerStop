<template>
  <div id="new-schedule">
    <h3>New Schedule</h3>
    <div class="row">
    <form @submit.prevent="saveSchedule" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="ClassTime" required>
          <label>Class Time</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="ClassName" required>
          <label>Class Name</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from './firebaseInit'
    export default {
      name: 'new-schedule',
      data () {
        return {
          ClassTime: null,
          ClassName: null
        }
      },
      methods: {
        saveSchedule () {
          db.collection('schedules').add({
            ClassTime: this.ClassTime,
            ClassName: this.ClassName
          })
          .then(docRef => {
            console.log('Class added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding schedule: ', error)
          })
        }
      }
    }
</script>
<template>
  <div id="new-schedule">
    <h3>Edit Schedule</h3>
    <div class="row">
    <form @submit.prevent="updateSchedule" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="ClassName" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="ClassTime" required>
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
    name: 'edit-schedule',
    data () {
      return {
        ClassTime: null,
        ClassName: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('schedules').where('ClassTime', '==', to.params.ClassTime).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.ClassTime = doc.data().ClassTime
            vm.ClassName = doc.data().ClassName
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('schedules').where('ClassTime', '==', this.$route.params.ClassTime).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.ClassTime = doc.data().ClassTime
            this.ClassName = doc.data().ClassName
          })
        })
      },
      updateSchedule () {
        db.collection('schedules').where('ClassTime', '==', this.$route.params.ClassTime).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              ClassTime: this.ClassTime,
              ClassName: this.ClassName
            })
            .then(() => {
              this.$router.push({ name: 'view-schedule', params: { ClassTime: this.ClassTime }})
            });
          })
        })
      }
    }
  }
</script>
<template>
  <div id="view-schedule">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">ClassTime: {{ClassTime}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteSchedule" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-schedule', params: { ClassTime: ClassTime }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-schedule',
    data () {
      return {
        ClassTime: null,
        ClassName: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('schedule').where('ClassTime', '==', to.params.ClassTime).get().then((querySnapshot) => {
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
        db.collection('schedule').where('ClassTime', '==', this.$route.params.ClassTime).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.ClassTime = doc.data().ClassTime
            this.ClassName = doc.data().ClassName
          })
        })
      },
      deleteSchedule () {
        if(confirm ('Are you sure?')) {
          db.collection('schedule').where('ClassTime', '==', this.$route.params.ClassTime).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>

<template>
  <div id="view-bus">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Time: {{Time}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteBus" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-bus', params: { Time: Time }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-bus',
    data () {
      return {
        Time: null,
        Stop: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('bus').where('Time', '==', to.params.Time).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.Time = doc.data().Time
            vm.Stop = doc.data().Stop
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('bus').where('Time', '==', this.$route.params.Time).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.Time = doc.data().Time
            this.Stop = doc.data().Stop
          })
        })
      },
      deleteBus () {
        if(confirm ('Are you sure?')) {
          db.collection('bus').where('Time', '==', this.$route.params.Time).get().then((querySnapshot) => {
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

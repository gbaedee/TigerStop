<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Schedules</h4></li>
      <li v-for="schedule in schedules"  v-bind:key="schedule.id" class="collection-item">
        <div class="chip">{{schedule.ClassName}}</div>
        {{schedule.ClassTime}}: {{schedule.ClassName}}
         <router-link class="secondary-content" v-bind:to="{ name: 'view-schedule', params: { ClassTime: schedule.ClassTime }}"><i class="fa fa-eye"></i></router-link>
      </li>
      <li v-for="Bus in Buses" v-bind:key="Bus.id" class="collection-item">
        <div class="chip">{{Bus.Stop}}</div>
        {{Bus.Time}}: {{Bus.Stop}}:
         <router-link class="secondary-content" v-bind:to="{ name: 'view-bus', params: { Time: Bus.Time }}"><i class="fa fa-eye"></i></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'home',
  data() {
    return {
      schedules: [],
      Bus:[],
      loading: true
    };
  },
  created() {
    db
      .collection('schedules')
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            ClassTime: doc.data().ClassTime,
            ClassName: doc.data().ClassName,
            Bus: doc.data().Bus,
            Stop: doc.data().Stop,
            Time: doc.data().Time
          };
          this.schedules.push(data),
          this.Bus.push(data);
        });
      });
  }
};

</script>
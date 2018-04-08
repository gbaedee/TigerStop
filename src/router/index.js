import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ViewSchedule from '@/components/ViewSchedule';
import NewSchedule from '@/components/NewSchedule';
import EditSchedule from '@/components/EditSchedule';
import Login from '@/components/Login';
import Register from '@/components/Register';
import ViewBus from '@/components/ViewBus';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-schedule',
      component: NewSchedule,
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: '/edit/:ClassTime',
      name: 'edit-schedule',
      component: EditSchedule,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:Time',
      name: 'view-bus',
      component: ViewBus,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:ClassTime',
      name: 'view-schedule',
      component: ViewSchedule,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store.js";

Vue.use(Router);

const checkInputsLoaded = (to, from, next) => {
  /*console.log('\nto')
  console.log(to)
  console.log('from')
  console.log(from)
  console.log('store')
  console.log(store)
  */
  let target = to.path.split("/");
  target = target[target.length - 1];

  function proceed() {
    //console.log("proceeding");
    if (target in store.state.inputs) {
      //console.log("will load now");
      next();
    }
  }
  if (!(target in store.state.inputs)) {
    //console.log("I need to load first");
    store.watch(
      state => {
        //console.log("\n---coming back");
        //console.log(state);
        //console.log(store.state.inputs);
        if (target in state.inputs) {
          //console.log("-------halllo-------");
          proceed();
        }
      },
      value => {
        //console.log("change is now happening: " + value);
        if (value === true) {
          proceed();
        }
      }
    );
  } else {
    proceed();
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/conversions",
      name: "conversions",
      component: () => import("./views/Conversion-inputSelection.vue")
    },
    {
      path: "/conversions/:inputFormat",
      name: "input",
      beforeEnter: checkInputsLoaded,
      component: () => import("./views/Conversion-outputSelection.vue")
    },
    {
      path: "/conversions/:inputFormat/:outputFormat",
      name: "output",
      component: () => import("./views/Conversion-options.vue")
    },
    {
      path: "/validation",
      name: "validation-scenarioList",
      component: () => import("./views/Validation-scenarioList.vue")
    },
    {
      path: "/validation/:format/:version?",
      name: "validation",
      component: () => import("./views/Validation-scenario.vue")
    },
    {
      path: "/validation/:format/:version/47edf1ec-bc4e-46bd-8be3-292fc270d8f7",
      name: "validation-success",
      component: () => import("./views/Validation-success.vue")
    },
    {
      path: "/validation/:format/:version/50ea0681-85dd-4242-995f-c8008ed04917",
      name: "validation-failure",
      component: () => import("./views/Validation-failure.vue")
    },
    {
      path: "/customization",
      name: "customization",
      component: () => import("./views/Customization.vue")
    },
    {
      path: "/configuration",
      name: "configuration",
      component: () => import("./views/Configuration.vue")
    },
    {
      path: "/profiler",
      name: "profiler",
      component: () => import("./views/Profiler.vue")
    }
  ]
});

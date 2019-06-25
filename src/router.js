import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import Home from "./page/Home.vue"
import User from "./page/User.vue"
import Login from "./page/Login.vue"
import Register from "./page/Register.vue"
import NewPost from "./page/NewPost.vue"
import BackEnd from "./page/BackEnd.vue"
import FrontEnd from "./page/FrontEnd.vue"
import Android from "./page/Android.vue"
import Ios from "./page/Ios.vue"
import Ai from "./page/Ai.vue"
import Tool from "./page/Tool.vue"
import Read from "./page/Read.vue"
import Posts from "./page/Posts.vue"
import Post from "./page/Post.vue"
import Personal from "./page/Personal.vue"
import OtherUser from "./page/OtherUser.vue"

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: Home, redirect: 'posts',
      children: [
        { path: 'posts', component: Posts },
        { path: 'posts/backend', component: BackEnd },
        { path: 'posts/frontend', component: FrontEnd },
        { path: 'posts/android', component: Android },
        { path: 'posts/ios', component: Ios },
        { path: 'posts/ai', component: Ai },
        { path: 'posts/tool', component: Tool },
        { path: 'posts/read', component: Read },
        { path: 'posts/:id', component: Post },




      ]
    },
    { path: '/otheruser/:id', component: OtherUser },
    { path: '/user', component: User, },
    { path: '/user/login', component: Login },
    { path: '/user/register', component: Register },
    { path: '/newpost', component: NewPost },
    { path: '/personal', component: Personal },
  ]
});

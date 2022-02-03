import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes:[
        {
            path:'*',
            name:'404',
            component:()=>import('../components/404')
        },
        {
            path:'/main',
            name:'Main',
            component:()=>import('../pages/main'),
            children:[
                {
                    path:'/',
                    name:'Title',
                    component:()=>import('../pages/title')
                },
                {
                    path:'/video',
                    name:'Video',
                    component:()=>import('../pages/video')
                },
                {
                    path:'/picture',
                    name:'Picture',
                    component:()=>import('../pages/picture')
                },
                {
                    path:'/imgItem',
                    name:'ImgItem',
                    component:()=>import('../pages/imgItem')
                },
                {
                    path:'/wish',
                    name:'Wish',
                    component:()=>import('../pages/wish')
                },
                {
                    path:'/edit',
                    name:'Edit',
                    component:()=>import('../pages/person/editPerson')
                },
                {
                    path:'/publish',
                    name:'Publish',
                    component:()=>import('../pages/publishArticle')
                },
                {
                    path:'/articleitem',
                    name:'ArticleItem',
                    component:()=>import('../pages/articleItem')
                },
                {
                    path:'/person',
                    name:'Person',
                    component:()=>import('../pages/person/person'),
                    children:[
                        {
                            path:'/',
                            name:'MyArticle',
                            component:()=>import('../pages/myArticle')
                        },
                        {
                            path:'/mywish',
                            name:'MyWish',
                            component:()=>import('../pages/myWish')
                        },
                        
                        {
                            path:'/collection',
                            name:'Collection',
                            component:()=>import('../pages/collection')
                        },
                        {
                            path:'/praise',
                            name:'Praise',
                            component:()=>import('../pages/praise')
                        },
                        {
                            path:'/myfriend',
                            name:'MyFriend',
                            component:()=>import('../pages/person/myfriend')
                        },
                        {
                            path:'/friendcollect',
                            name:'FriendCollect',
                            component:()=>import('../pages/friendCollect')
                        }
                        
                    ]
                }
            ]
        },
        {
            path:'/',
            name:'Login',
            component:()=>import('../pages/Login')
        },
        {
            path:'/register',
            name:'Register',
            component:()=>import('../pages/register')
        },
    ]
})
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/" || to.path == "/register") {
      next();
    } else {
      isLogin ? next() : next("/");
    }
  })
export default router
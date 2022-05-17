import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Editing from './views/Editing.vue'
import Home from './views/Home.vue'
import Watch from './views/Watch.vue'
import PageNotFound from './views/PageNotFound.vue'
import Main from './Main.vue'

import Upload from './components/video/upload-video/Upload.vue'
import VideoManagement from './components/video/video-management/VideoManagement.vue'
import VideoDetails from './components/video/video-management/VideoDetails.vue'
import UserManagement from './components/user-management/ListUsers.vue'
import Channel from './components/channel/Channel.vue'
import EditChannel from './components/channel/EditChannel.vue'
import Search from './components/discover/Search.vue'
import Posts from './components/home/Posts.vue'
import History from './components/home/History.vue'
import Follow from './components/home/Follow.vue'
import UnderDeveloped from './components/home/UnderDeveloped.vue'
import WatchLater from './components/home/WatchLater.vue'
import Trending from './components/discover/Trending.vue'
import Filter from './components/video/video-editing/filters/Filters.vue'
import MyMedia from './components/video/video-editing/my-media/MyMedia.vue'
import BrowseFile from './components/video/video-editing/browse-files/BrowseFile.vue'

Vue.use(VueRouter)

export const routes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/signup',
		component: Register,
	},
	{
		path: '/',
		redirect: '/home',
		component: Main,
		children: [
			{
				path: '/watch/:id',
				component: Watch
			},
			{
				path: '/upload',
				component: Upload,
				meta: {
					requireAuth: true,

				}
			},
			{
				path: '/home',
				component: Home,
				children: [
					{
						path: '/search/:id',
						component: Search
					},
					{
						path: '/feed/history',
						component: History,
					},
					{
						path: '/feed/watch-later',
						component: WatchLater,
					},
					{
						path: '/feed/shorts',
						component: UnderDeveloped,
					},
					{
						path: '/feed/follow',
						component: Follow,
					},
					{
						path: '/search',
						component: Search
					},
					{
						path: '/home',
						component: Posts
					},
					{
						path: '/trending/:id',
						component: Trending
					},
					{
						path: '/trending',
						component: Trending
					},
					{
						path: '/channel/:channelId',
						component: Channel,
					},
					{
						path: '/channel/:channelId/edit',
						component: EditChannel,
					},
				]
			},
			{
				path: '/editing',
				component: Editing,
				redirect: '/editing/mymedia',
				children: [
					{
						path: '/editing/filter',
						component: Filter
					},
					{
						path: '/editing/mymedia',
						component: MyMedia
					},
					{
						path: '/editing/browsefile',
						component: BrowseFile
					}
				]
			},
			{
				path: '/users',
				component: UserManagement,
				meta: {
					requireAuth: true,
					isAdmin: true
				}
			},
			{
				path: '/videos',
				component: VideoManagement,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/videos/uploads',
				component: VideoManagement,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/videos/:id',
				component: VideoDetails,
				meta: {
					requireAuth: true
				}
			},

		]
	},
	{
		path: "*",
		component: PageNotFound
	}
]

export const router = new VueRouter({
	mode: 'history',
	routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		if (!localStorage.getItem('token')) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			})
		} else {
			const user = JSON.parse(localStorage.getItem('user'))
			if (to.matched.some(record => record.meta.isAdmin)) {
				if (user.is_admin == 1) {
					next()
				} else {
					next({ path: '/login' })
				}
			} else {
				next()
			}
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (localStorage.getItem('token') == null) {
			next()
		} else {
			next({ path: '/home' })
		}
	} else {
		next()
	}
})

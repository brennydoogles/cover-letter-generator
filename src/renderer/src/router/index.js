import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TemplateEditorView from '../views/TemplateEditorView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: HomeView
		},
		{
			path: '/templates',
			component: TemplateEditorView
		},
		{
			path: '/about',
			component: AboutView
		}
	]
})

export default router

import bookApp from './pages/book-app.js'
import homePage from './pages/home-page.js'
import aboutPage from './pages/about-page.js'
import bookDetails from './cmps/book-details.js'

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/about',
		component: aboutPage,
	},
	{
		path: '/book',
		component: bookApp,
	},
	{
		path: '/book/:bookId',
		component: bookDetails,
	},
]

export const router = new VueRouter({ routes })

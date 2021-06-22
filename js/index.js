import appHeader from './cmps/appHeader.js'
import appFooter from './cmps/appFooter.js'
import userMsg from './cmps/user-msg.js'
import { router } from './router.js'

new Vue({
	el: '#app',
	router,
	template: `
		<section>
			<user-msg />
			<app-header/>
			<router-view />
			<app-footer />
		</section>
    `,
	components: {
		appHeader,
		appFooter,
		userMsg,
	},
})

export default {
	template: `
		<header class="header">
			<router-link to="/">
				<h1>Miss Book</h1>
			</router-link>
			<ul class="nav-links">
				<li v-for="link in links">
					<router-link :to="link.path">{{link.name}}</router-link>
				</li>
			</ul>
		</header>
	`,
	data() {
		return {
			links: [
				{ path: '/', name: 'Home' },
				{ path: '/about', name: 'About' },
				{ path: '/book', name: 'Books' },
			],
		}
	},
}

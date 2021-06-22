import { eventBus } from '../services/event-bus-service.js'

export default {
	template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{icon}}</p>
            <div class="content">
                <h3>{{header}}</h3>
                <p>{{msg.txt}}</p>
            </div>
            <div class="actions">
                <router-link :to="msg.link">View it</router-link>
                <button>x</button>
            </div>
        </div>
    `,
	data() {
		return {
			msg: null,
		}
	},
	created() {
		eventBus.$on('show-msg', this.showMsg)
	},
	destroyed() {
		eventBus.$off('show-msg', this.showMsg)
	},
	methods: {
		showMsg(msg) {
			this.msg = msg
			setTimeout(() => {
				this.msg = null
			}, 3000)
		},
	},
	computed: {
		header() {
			return this.msg.type === 'success' ? 'SUCCESS!' : 'ERROR!'
		},
		icon() {
			return this.msg.type === 'success' ? 'V' : 'X'
		},
	},
}

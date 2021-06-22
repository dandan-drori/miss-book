export default {
	props: { text: String, maxLength: Number },
	template: `
        <span>
            <p>{{formattedDescription}}</p>
            <button v-if="isDisplayButton" @click="toggleShowMore" class="show-more">{{btnTxt}}</button>
        </span>
    `,
	data() {
		return {
			isShowMore: false,
		}
	},
	methods: {
		toggleShowMore() {
			this.isShowMore = !this.isShowMore
		},
	},
	computed: {
		formattedDescription() {
			if (this.text.length < this.maxLength) return this.text + '.'
			return this.isShowMore ? this.text + '.' : this.text.substring(0, this.maxLength) + '...'
		},
		btnTxt() {
			return this.isShowMore ? 'Show Less' : 'Show More'
		},
		isDisplayButton() {
			return this.text.length > this.maxLength
		},
	},
}

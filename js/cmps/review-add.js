import { bookService } from '../services/book-service.js'

export default {
	props: { bookId: String },
	template: `
    <form @submit.prevent="saveReview">
        <h2>Add A Review</h2>
        <input type="text" v-model="review.fullName" id="fullName" placeholder="Full Name" value="Books Reader" autocomplete="off"/>
        <label>Rating:
        <select name="rating" v-model="review.rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected="selected">5</option>
        </select>
        </label>
        <label>Read At:
            <input type="date" v-model="review.readAt" name="readAt" />
        </label>
        <textarea name="review" v-model="review.review" id="review" cols="30" rows="10" placeholder="Review"></textarea>
        <button class="btn-submit">Submit</button>
    </form>
    `,
	data() {
		return {
			review: {
				fullName: '',
				rating: '',
				readAt: '',
				review: '',
			},
		}
	},
	methods: {
		saveReview() {
			if (!this.review.review) return alert('Review field is required!')
			bookService.addReview(this.bookId, this.review)
			this.$emit('add-review', this.review)
			this.$router.push('/book')
		},
	},
}

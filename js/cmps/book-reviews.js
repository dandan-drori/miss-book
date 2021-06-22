import longText from './long-text.js'

export default {
	components: { longText },
	props: { initialReviews: Array },
	template: `
        <section class="book-reviews">
            <h2>Reviews:</h2>
            <article v-for="review in reviews" class="book-review">
                <div>
                    <article>
                        <h3>Reviewer:</h3>
                        <p>{{review.fullName}}</p>
                    </article>
                    <article>
                        <h3>Read At:</h3>
                        <p>{{review.readAt}}</p>
                    </article>
                    <article>
                        <h3>Review:</h3>
                        <long-text :text="review.review" :max-length="15"/>
                    </article>
                </div>
                <button @click="onDeleteReview(review)">X</button>
            </article>
            <article v-if="!reviews.length">
                <article>
                    <h3>Reviewer:</h3>
                    <p>Books Reader</p>
                </article>
                <article>
                    <h3>Read At:</h3>
                    <p>{{new Date().toLocaleString()}}</p>
                </article>
                <article>
                    <h3>Review:</h3>
                    <p>No reviews to show. Kindly add yours below:</p>
                </article>
            </article>
        </section>
    `,
	data() {
		return {
			reviews: this.initialReviews || [],
		}
	},
	methods: {
		onDeleteReview(review) {
			this.$emit('delete-review', review)
		},
	},
}

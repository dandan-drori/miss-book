import { bookService } from '../services/book-service.js'
import longText from './long-text.js'
import csv from './csv.js'
import reviewAdd from './review-add.js'
import bookReviews from './book-reviews.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
	components: {
		longText,
		csv,
		reviewAdd,
		bookReviews,
	},
	template: `
        <section v-if="book" class="book-details">
			<article>
				<button @click="onBack">Back</button>
				<section>
					<h3>Id:</h3>
					<p>{{book.id}}</p>
				</section>
				<section>
					<h3>Title:</h3>
					<p>{{book.title}}</p>
				</section>
				<section>
					<h3>Subtitle:</h3>
					<p>{{book.subtitle}}</p>
				</section>
				<section>
				<h3>Authors:</h3>
					<span v-for="author in book.authors" :key="author">
						<p>{{author}}</p>
					</span>
				</section>
				<h3>Publish Date:</h3>
				<p>{{publishCategory}}</p>
				<section>
					<h3>Description: </h3>
					<long-text :text="book.description" :max-length="100" />
				</section>
				<section>
					<h3>Page Category:</h3>
					<p>{{pageLengthCategory}}</p>
				</section>
				<section>
					<h3>Categories:</h3>
					<csv :initial-list="book.categories"/>
				</section>
				<section>
					<h3>Language:</h3>
					<p>{{formattedLanguage}}</p>
				</section>
				<section>
					<h3>Price:</h3>
					<p :class="priceClass">{{formattedPrice}}</p>
				</section>
				<book-reviews v-if="bookReviews" :initialReviews="bookReviews" @delete-review="onDeleteReview" />
			</article>

			<div>
				<section class="image-container">
					<img :src="book.thumbnail"/>
					<section class="sale-container">
						<p>On Sale!</p>
					</section>
				</section>
				<review-add :bookId="book.id" @add-review="onAddReview"/>
			</div>

        </section>
    `,
	data() {
		return {
			book: null,
			bookReviews: [],
		}
	},
	methods: {
		loadBook() {
			const { bookId } = this.$route.params
			bookService.getBookById(bookId).then(book => {
				this.book = book
				this.bookReviews = book?.reviews || this.bookReviews
			})
		},
		onBack() {
			this.$router.push('/book')
		},
		onAddReview(review) {
			const { bookId } = this.$route.params
			bookService
				.getBookById(bookId)
				.then(book => {
					this.book = book
					this.bookReviews = book.reviews
					const msg = {
						txt: 'The review has been added',
						type: 'success',
						link: `/book/${bookId}`,
					}
					eventBus.$emit('show-msg', msg)
					this.loadBook()
				})
				.catch(err => {
					console.log(err)
					const msg = {
						txt: 'The review could not be added',
						type: 'error',
						link: `/book/${bookId}`,
					}
					eventBus.$emit('show-msg', msg)
				})
			this.bookReviews.push(review)
		},
		onDeleteReview(reviewToDel) {
			const { bookId } = this.$route.params
			bookService
				.getBookById(bookId)
				.then(() => {
					bookService.deleteReview(bookId, reviewToDel)
					const msg = {
						txt: 'The review has been deleted',
						type: 'success',
						link: `/book/${bookId}`,
					}
					eventBus.$emit('show-msg', msg)
					this.loadBook()
				})
				.catch(err => {
					console.log(err)
					const msg = {
						txt: 'The review could not be deleted',
						type: 'error',
						link: `/book/${bookId}`,
					}
					eventBus.$emit('show-msg', msg)
				})
			const idx = this.bookReviews.findIndex(
				review => review.review === reviewToDel.review && review.fullName === reviewToDel.fullName
			)
			this.bookReviews.splice(idx, 1)
		},
	},
	computed: {
		pageLengthCategory() {
			const pageCount = this.book.pageCount
			const diff =
				pageCount > 500
					? ' - Long Reading'
					: pageCount > 200
					? ' - Decent Reading'
					: pageCount < 100
					? ' - Light Reading'
					: ''
			return pageCount + diff
		},
		publishCategory() {
			const publishDate = this.book.publishedDate
			const diff = new Date().getFullYear() - publishDate
			const category = diff > 10 ? ' - Veteran Book' : diff < 1 ? ' - New!' : ''
			return publishDate + category
		},
		priceClass() {
			const price = this.book.listPrice.amount
			return { high: price > 150, low: price < 20 }
		},
		isOnSale() {
			return this.book.isOnSale
		},
		formattedLanguage() {
			switch (this.book.language) {
				case 'he':
					return 'Hebrew'
				case 'en':
					return 'English'
				case 'sp':
					return 'Spanish'
			}
		},
		formattedPrice() {
			return bookService.getPriceToShow(this.book.listPrice)
		},
	},
	created() {
		this.loadBook()
	},
}

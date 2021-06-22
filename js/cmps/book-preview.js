import { bookService } from '../services/book-service.js'

export default {
	props: { book: Object },
	template: `
        <article>
			<img :src="book.thumbnail" alt="book cover" />
            <h2>{{book.title}}</h2>
            <p>{{formattedPrice}}</p>
			<router-link :to="'/book/'+book.id">Show Details</router-link>
        </article>
    `,
	computed: {
		formattedPrice() {
			return bookService.getPriceToShow(this.book.listPrice)
		},
	},
}

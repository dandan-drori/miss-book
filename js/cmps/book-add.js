import { bookService } from '../services/book-service.js'

export default {
	template: `
        <section>
            <h2>Find and Add new Books:</h2>
            <input type="search" v-model="inputVal" placeholder="Search for a book" @input="getGoogleBooks"/>
            <li v-if="books.length" v-for="book in books">
                <p>{{book.volumeInfo.title}}</p>
                <button @click="onAddBook(book)">+</button>
            </li>
        </section>
    `,
	data() {
		return {
			inputVal: '',
			books: null,
		}
	},
	methods: {
		getGoogleBooks() {
			if (!this.inputVal) return
			bookService
				.queryGoogle(this.inputVal)
				.then(books => {
					this.books = books
				})
				.catch(err => console.log(err))
		},
		onAddBook(book) {
			const addedBook = bookService.addGoogleBook(book)
			this.$emit('add-book', addedBook)
		},
	},
	computed: {},
}

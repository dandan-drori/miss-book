import { bookService } from '../services/book-service.js'
import bookFilter from '../cmps/book-filter.js'
import bookList from '../cmps/book-list.js'
import bookDetails from '../cmps/book-details.js'
import bookAdd from '../cmps/book-add.js'

export default {
	components: {
		bookFilter,
		bookList,
		bookDetails,
		bookAdd,
	},
	template: `
		<main>
			<book-add @add-book="refresh"></book-add>
			<book-filter @filtered="setFilter"></book-filter>
			<book-list :books="booksToShow"></book-list>
		</main>
    `,
	data() {
		return {
			books: [],
			filterBy: null,
		}
	},
	methods: {
		loadBooks() {
			bookService.query().then(books => (this.books = books))
		},
		setFilter(filterBy) {
			this.filterBy = filterBy
		},
		refresh(addedBook) {
			this.books.push(addedBook)
		},
	},
	watch: {
		books() {
			return {
				handler(newVal) {
					this.books = newVal
				},
				deep: true,
			}
		},
	},
	computed: {
		booksToShow() {
			if (!this.filterBy) return this.books
			return this.books.filter(book => {
				return (
					book.title.toLowerCase().includes(this.filterBy.byName.toLowerCase()) &&
					book.listPrice.amount >= this.filterBy.fromPrice &&
					book.listPrice.amount <= (this.filterBy.toPrice || Infinity)
				)
			})
		},
	},
	created() {
		this.loadBooks()
	},
}

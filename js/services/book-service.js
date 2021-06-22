import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js'

export const bookService = {
	query,
	getEmptyBook,
	getBookById,
	getPriceToShow,
	addReview,
	deleteReview,
}

const BOOKS_KEY = 'books'
const gBooks = _createBooks()

function query() {
	return storageService.query(BOOKS_KEY)
}

function getBookById(bookId) {
	return storageService.get(BOOKS_KEY, bookId)
}

function addReview(bookId, review) {
	if (!review) {
		review = {
			fullName: 'Books Reader',
			rating: 5,
			readAt: new Date().toLocaleString(),
			review: 'The book was very good!',
		}
	} else {
		review = {
			fullName: review.fullName || 'Books Reader',
			rating: 5,
			readAt: review.readAt || new Date().toLocaleString(),
			review: review.review || 'The book was very good!',
		}
	}
	storageService.get(BOOKS_KEY, bookId).then(book => {
		book.reviews.push(review)
		storageService.put(BOOKS_KEY, book)
	})
}

function deleteReview(bookId, reviewToDel) {
	storageService.get(BOOKS_KEY, bookId).then(book => {
		book.reviews = book.reviews.filter(
			review =>
				review.fullName !== reviewToDel.fullName &&
				review.readAt !== reviewToDel.readAt &&
				review.review !== reviewToDel.review
		)
		storageService.put(BOOKS_KEY, book)
	})
}

function getPriceToShow({ amount, currencyCode }) {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(
		amount
	)
}

function getEmptyBook() {
	return {
		id: '',
		title: '',
		subtitle: '',
		authors: [],
		publishedDate: 0,
		description: '',
		pageCount: 0,
		categories: [],
		thumbnail: '',
		language: '',
		listPrice: {
			amount: 0,
			currencyCode: '',
			isOnSale: false,
		},
		reviews: [],
	}
}

function _createBooks() {
	let books = utilService.loadFromStorage(BOOKS_KEY)
	if (!books || !books.length) {
		books = []
		books.push(
			_createBook(
				'metus hendrerit',
				'mi est eros convallis auctor arcu dapibus himenaeos',
				['Barbara Cartland'],
				1999,
				'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
				713,
				['Computers', 'Hack'],
				'http://coding-academy.org/books-photos/20.jpg',
				'en',
				{ amount: 109, currencyCode: 'EUR', isOnSale: false }
			)
		)
		books.push(
			_createBook(
				'morbi',
				'lorem euismod dictumst inceptos mi',
				['Barbara Cartland'],
				1978,
				'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
				129,
				['Computers', 'Hack'],
				'http://coding-academy.org/books-photos/14.jpg',
				'sp',
				{ amount: 44, currencyCode: 'EUR', isOnSale: true }
			)
		)
		books.push(
			_createBook(
				'at viverra venenatis',
				'gravida libero facilisis rhoncus urna etiam',
				['Dr. Seuss'],
				1999,
				'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
				972,
				['Computers', 'Hack'],
				'http://coding-academy.org/books-photos/2.jpg',
				'he',
				{
					amount: 108,
					currencyCode: 'ILS',
					isOnSale: false,
				}
			)
		)
		utilService.saveToStorage(BOOKS_KEY, books)
	}
	return books
}

function _createBook(
	title = '',
	subtitle = '',
	authors = [],
	publishedDate,
	description = '',
	pageCount = 0,
	categories = [],
	thumbnail,
	language = 'en',
	listPrice,
	reviews = []
) {
	const book = {
		id: utilService.makeId(),
		title,
		subtitle,
		authors,
		publishedDate,
		description,
		pageCount,
		categories,
		thumbnail,
		language,
		listPrice,
		reviews,
	}
	return book
}

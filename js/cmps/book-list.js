import bookPreview from './book-preview.js'

export default {
	components: {
		bookPreview,
	},
	props: ['books'],
	template: `
        <ul class="books-list">
            <li v-for="book in books">
                <book-preview :book="book" :key="book.id"></book-preview>
            </li>
        </ul>
    `,
}

export default {
	template: `
        <section class="book-filter">
            <label for="name">Name: </label>
            <input type="search" placeholder="Filter by name" v-model="filterBy.byName" @input="filter" id="name" autocomplete="off"/>

            <label for="fromPrice">Minimum Price: </label>
            <input type="number" placeholder="Minimum price" v-model.number="filterBy.fromPrice" @input="filter" id="fromPrice"/>
            
            <label for="toPrice">Maximum Price: </label>
            <input type="number" placeholder="Infinity" v-model.number="filterBy.toPrice" @input="filter" id="toPrice"/>
        </section>
    `,
	data() {
		return {
			filterBy: {
				byName: '',
				fromPrice: 0,
				toPrice: Infinity,
			},
		}
	},
	methods: {
		filter() {
			this.$emit('filtered', this.filterBy)
		},
	},
}

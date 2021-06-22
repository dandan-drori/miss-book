export default {
	props: { initialList: Array },
	template: `
        <span>
            <p v-for="(item,idx) in list" :key="item">
                {{idx === list.length - 1 ? item : item + ', '}}
            </p>
        </span> 
    `,
	data() {
		return {
			list: this.initialList,
		}
	},
}

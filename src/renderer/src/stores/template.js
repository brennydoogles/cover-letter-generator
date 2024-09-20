import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTemplateStore = defineStore('template', () => {
	const templates = ref({})

	const test = ref('')

	return { templates, test }
})

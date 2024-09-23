import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateStore } from '../stores/template'

export default function useTemplate() {
	const templateStore = useTemplateStore()
	const { templates } = storeToRefs(templateStore)
	const selectedTemplateKey = ref('')
	const templateParams = ref({})

	const handleNewTemplateSelected = function () {
		if (Object.prototype.hasOwnProperty.call(selectedTemplate.value, 'sections')) {
			for (const section of selectedTemplate.value.sections) {
				templateParams.value[section.key] = {
					isSelected: section.isSelected,
					value: section.text
				}
			}
		}
	}

	const updateSelectedTemplateKey = function (newKey) {
		selectedTemplateKey.value = newKey
		handleNewTemplateSelected()
	}

	const selectedTemplate = computed(() => {
		if (Object.prototype.hasOwnProperty.call(templates.value, selectedTemplateKey.value)) {
			return templates.value[selectedTemplateKey.value]
		}
		return {
			id: '',
			name: '',
			templateText: '',
			sections: []
		}
	})

	return {
		templates,
		selectedTemplateKey,
		selectedTemplate,
		templateParams,
		handleNewTemplateSelected,
		updateSelectedTemplateKey
	}
}

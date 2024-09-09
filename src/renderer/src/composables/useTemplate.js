import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTemplateStore } from '../stores/template'

export default function useTemplate() {
	const templateStore = useTemplateStore()
	const { templates, addTemplate } = storeToRefs(templateStore)

	const selectedTemplateKey = ref('')
	const templateParams = ref({})

	const handleNewTemplateSelected = function () {
		for (const section of selectedTemplate.value.sections) {
			templateParams.value[section.key] = {
				isSelected: section.isSelected,
				value: section.text
			}
		}
	}

	const updateSelectedTemplateKey = function (newKey) {
		selectedTemplateKey.value = newKey
		handleNewTemplateSelected()
	}

	const selectedTemplate = computed(() => {
		return templates.value[selectedTemplateKey.value]
	})

	return {
		templates,
		addTemplate,
		selectedTemplateKey,
		selectedTemplate,
		templateParams,
		handleNewTemplateSelected,
		updateSelectedTemplateKey
	}
}

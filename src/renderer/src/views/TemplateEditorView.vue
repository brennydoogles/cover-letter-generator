<script setup>
import TemplateSelectorComponent from '../components/TemplateSelectorComponent.vue'
import useTemplate from '../composables/useTemplate'
import { computed, ref, watch } from 'vue'
import AddSectionModal from '../components/AddSectionModal.vue'
import { useTemplateStore } from '../stores/template'
import { storeToRefs } from 'pinia'
import TemplateVariableSidebarItemComponent from '../components/TemplateVariableSidebarItemComponent.vue'

const templateStore = useTemplateStore()
const { templates } = storeToRefs(templateStore)
const { selectedTemplate, selectedTemplateKey, updateSelectedTemplateKey } = useTemplate()

const newTemplate = ref({
	id: '',
	name: '',
	templateText: '',
	sections: []
})
const showModal = ref(false)

const handleModalSubmit = function (section) {
	newTemplate.value.sections.push(section)
	showModal.value = false
}
const persistTemplates = function () {
	window.api.fileStore.persistTemplates(JSON.stringify(templates.value))
}
const handleSave = function () {
	if (saveEnabled.value) {
		delete templates.value[newTemplate.value.id]
		templates.value[newTemplate.value.id] = newTemplate.value
		clearForm()
		persistTemplates()
	}
}

function clearForm() {
	newTemplate.value = {
		id: '',
		name: '',
		templateText: '',
		sections: []
	}
	updateSelectedTemplateKey('')
}

const handleDelete = function () {
	if (deleteEnabled.value) {
		delete templates.value[selectedTemplateKey.value]
		clearForm()
		persistTemplates()
	}
}

const handleSectionDelete = function (key) {
	var tempTemplate = newTemplate.value
	var removalIndex = tempTemplate.sections.map((section) => section.key).indexOf(key)
	if (removalIndex >= 0) {
		tempTemplate.sections.splice(removalIndex, 1)
	}
	newTemplate.value = tempTemplate
}

const deleteEnabled = computed(() => {
	return Object.hasOwn(templates.value, selectedTemplateKey.value)
})

const saveEnabled = computed(() => {
	return newTemplate.value.id && newTemplate.value.name && newTemplate.value.templateText
})

watch(selectedTemplate, async () => {
	newTemplate.value = selectedTemplate.value
})
</script>

<template>
	<div id="template-editor-view-content" class="view-container">
		<div class="col">
			<div class="row">
				<div class="col text-center"><h1>Template Editor</h1></div>
			</div>
			<div class="row">
				<div id="options-column" class="left-column">
					<div class="row pt-3">
						<div class="col"><h2 class="text-center">Template Options</h2></div>
					</div>
					<TemplateSelectorComponent @selected-template-changed="updateSelectedTemplateKey" />
					<div class="row">
						<div class="col">
							<h3 class="text-center">Global Variables</h3>
						</div>
					</div>
					<TemplateVariableSidebarItemComponent
						:is-global-variable="true"
						section-key="companyName"
						section-label="Company Name"
						section-text="'Name of Company'"
					/>
					<TemplateVariableSidebarItemComponent
						:is-global-variable="true"
						section-key="jobTitle"
						section-label="Job Title"
						section-text="'Job Title'"
					/>
					<template v-if="newTemplate.sections">
						<div class="row">
							<div class="col">
								<h3 class="text-center">Template Variables</h3>
							</div>
						</div>
						<TemplateVariableSidebarItemComponent
							v-for="section in newTemplate.sections"
							:key="section.key"
							:is-global-variable="false"
							:section-key="section.key"
							:section-label="section.label"
							:section-text="section.text"
							@delete="handleSectionDelete"
						/>
					</template>
				</div>
				<div id="working-area" class="right-column">
					<div class="row align-items-center">
						<div class="col-auto">
							<label for="templateKeyInput" class="col-form-label-lg">Template ID</label>
						</div>
						<div class="col">
							<input
								id="templateKeyInput"
								v-model="newTemplate.id"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
						<div class="col-auto">
							<label for="templateNameInput" class="col-form-label-lg">Template Name</label>
						</div>
						<div class="col">
							<input
								id="templateNameInput"
								v-model="newTemplate.name"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
					</div>
					<div class="row text-center justify-content-center">
						<div class="col-2">
							<button type="button" class="btn btn-secondary" @click="showModal = true">
								Add Section
							</button>
						</div>
						<div class="col-2">
							<button
								type="button"
								class="btn btn-success"
								:disabled="!saveEnabled"
								@click="handleSave"
							>
								Save Template
							</button>
						</div>
						<div class="col-2">
							<button
								type="button"
								class="btn btn-danger"
								:disabled="!deleteEnabled"
								@click="handleDelete"
							>
								Delete Template
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<textarea
								id="templateTextArea"
								v-model="newTemplate.templateText"
								class="form-control letter-body"
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
		<AddSectionModal :show="showModal" @close="showModal = false" @submit="handleModalSubmit" />
	</div>
</template>

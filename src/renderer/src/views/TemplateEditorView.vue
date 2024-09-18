<script setup>
import TemplateSelectorComponent from '../components/TemplateSelectorComponent.vue'
import useTemplate from '../composables/useTemplate'
import { computed, ref, watch } from 'vue'
import AddSectionModal from '../components/AddSectionModal.vue'
import { useTemplateStore } from '../stores/template'
import { storeToRefs } from 'pinia'

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

const handleSave = function () {
	if (saveEnabled.value) {
		templates.value[newTemplate.value.id] = newTemplate.value
		clearForm()
	}
}

function clearForm() {
	newTemplate.value = {
		id: '',
		name: '',
		templateText: '',
		sections: []
	}
}

const handleDelete = function () {
	if (deleteEnabled.value) {
		// removeTemplate(selectedTemplateKey.value)
		delete templates.value[selectedTemplateKey.value]
		clearForm()
	}
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
	<div id="template-editor-view-content" class="row p-1 pt-4">
		<div class="col">
			<div class="row">
				<div class="col"><h1>Template Editor</h1></div>
			</div>
			<div class="row">
				<div id="options-column" class="col-4 primary-bordered vh-85">
					<div class="row pt-3">
						<div class="col"><h2 class="text-center">Template Options</h2></div>
					</div>
					<TemplateSelectorComponent @selected-template-changed="updateSelectedTemplateKey" />
					<div class="row">
						<div class="col">
							<h3 class="text-center">Global Variables</h3>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div id="globalVarsAccordion" class="accordion">
								<div class="accordion-item">
									<h2 id="companyNameAccordionHeader" class="accordion-header">
										<button
											class="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#companyNameAccordionBody"
											aria-expanded="false"
											aria-controls="companyNameAccordionBody"
										>
											Company Name
										</button>
									</h2>
									<div
										id="companyNameAccordionBody"
										class="accordion-collapse collapse"
										aria-labelledby="companyNameAccordionHeader"
										data-bs-parent="#globalVarsAccordion"
									>
										<div class="accordion-body">
											<ul class="list-group list-group-horizontal">
												<li class="list-group-item">isSelected</li>
												<li v-pre class="list-group-item">{{ companyName.isSelected }}</li>
											</ul>
											<ul class="pt-2 list-group list-group-horizontal">
												<li class="list-group-item">value</li>
												<li v-pre class="list-group-item">{{ companyName.value }}</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="accordion-item">
									<h2 id="jobTitleAccordionHeader" class="accordion-header">
										<button
											class="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#jobTitleAccordionBody"
											aria-expanded="false"
											aria-controls="jobTitleAccordionBody"
										>
											Job Title
										</button>
									</h2>
									<div
										id="jobTitleAccordionBody"
										class="accordion-collapse collapse"
										aria-labelledby="jobTitleAccordionHeader"
										data-bs-parent="#globalVarsAccordion"
									>
										<div class="accordion-body">
											<ul class="list-group list-group-horizontal">
												<li class="list-group-item">isSelected</li>
												<li v-pre class="list-group-item">{{ jobTitle.isSelected }}</li>
											</ul>
											<ul class="pt-2 list-group list-group-horizontal">
												<li class="list-group-item">value</li>
												<li v-pre class="list-group-item">{{ jobTitle.value }}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<template v-if="newTemplate.sections">
						<div class="row">
							<div class="col">
								<h3 class="text-center">Template Variables</h3>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div id="templateVarsAccordion" class="accordion">
									<div
										v-for="section in newTemplate.sections"
										:key="section.key"
										class="accordion-item"
									>
										<h2 id="`${section.key}AccordionHeader`" class="accordion-header">
											<button
												class="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#`${section.key}AccordionBody`"
												aria-expanded="false"
												aria-controls="`${section.key}AccordionBody`"
											>
												{{ section.label }}
											</button>
										</h2>
										<div
											id="`${section.key}AccordionBody`"
											class="accordion-collapse collapse"
											aria-labelledby="`${section.key}AccordionHeader`"
											data-bs-parent="#templateVarsAccordion"
										>
											<div class="accordion-body">
												<ul class="list-group list-group-horizontal">
													<li class="list-group-item">isSelected</li>
													<li class="list-group-item">
														<span v-pre>{{</span> {{ section.key }}.isSelected <span v-pre>}}</span>
													</li>
												</ul>
												<ul class="pt-2 list-group list-group-horizontal">
													<li class="list-group-item">value</li>
													<li class="list-group-item">
														<span v-pre>{{</span> {{ section.key }}.value <span v-pre>}}</span>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<div id="working-area" class="col vh-85">
					<form class="row gx-3 align-items-center pb-3 pt-2">
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
					</form>
					<form class="row text-center justify-content-center">
						<div class="col-2">
							<button class="btn btn-secondary" @click="showModal = true">Add Section</button>
						</div>
						<div class="col-2">
							<button class="btn btn-success" :disabled="!saveEnabled" @click="handleSave">
								Save Template
							</button>
						</div>
						<div class="col-2">
							<button class="btn btn-danger" :disabled="!deleteEnabled" @click="handleDelete">
								Delete Template
							</button>
						</div>
					</form>
					<div class="row pt-3">
						<div class="col">
							<textarea
								id="templateTextArea"
								v-model="newTemplate.templateText"
								class="form-control"
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
		<AddSectionModal :show="showModal" @close="showModal = false" @submit="handleModalSubmit" />
	</div>
</template>

<style scoped>
#templateTextArea {
	min-height: 65vh;
}
</style>

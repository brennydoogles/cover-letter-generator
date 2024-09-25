<script setup>
import { computed, ref } from 'vue'
import Mustache from 'mustache'
import useTemplate from '../composables/useTemplate'
import TemplateSelectorComponent from '../components/TemplateSelectorComponent.vue'
import { useClipboard } from '@vueuse/core'
import { hideAllPoppers } from 'floating-vue'

const companyName = ref('')
const jobTitle = ref('')

const { selectedTemplate, templateParams, updateSelectedTemplateKey } = useTemplate()

const globalTemplateParams = computed(() => {
	return {
		jobTitle: {
			isSelected: Boolean(jobTitle.value),
			value: jobTitle.value
		},
		companyName: {
			isSelected: Boolean(companyName.value),
			value: companyName.value
		}
	}
})
const letterContent = computed(() => {
	if (!selectedTemplate.value) {
		return ''
	}
	const template = selectedTemplate.value['templateText']
	const params = {
		...globalTemplateParams.value,
		...templateParams.value
	}
	return Mustache.render(template, params)
})

const { copy } = useClipboard()

const handleCopyButton = function () {
	copy(letterContent.value)
	setTimeout(() => hideAllPoppers(), 2000)
}
</script>

<template>
	<div id="home-view-content" class="view-container">
		<div class="col">
			<div class="row">
				<div class="col text-center"><h1>Generate Cover Letter</h1></div>
			</div>
			<div class="row">
				<div id="options-column" class="left-column">
					<div class="row pt-2">
						<div class="col"><h2 class="text-center">Template Selection</h2></div>
					</div>
					<TemplateSelectorComponent @selected-template-changed="updateSelectedTemplateKey" />
					<div class="row pt-4">
						<div class="col"><h2 class="text-center">Template Options</h2></div>
					</div>

					<template v-if="selectedTemplate">
						<template v-for="section in selectedTemplate.sections" :key="section.key">
							<div id="template-options-row" class="row pt-2 d-flex justify-content-center">
								<div class="col form-check form-switch ms-5 ps-5">
									<input
										:id="`${section.key}-input`"
										v-model="templateParams[section.key].isSelected"
										class="form-check-input"
										type="checkbox"
									/>
									<label class="form-check-label" :for="`${section.key}-input`">
										{{ section.label }}
									</label>
								</div>
							</div>
						</template>
					</template>
				</div>
				<div id="letter-area" class="right-column">
					<div class="row align-items-center">
						<div class="col-auto">
							<label for="company-name" class="col-form-label-lg">Company Name:</label>
						</div>
						<div class="col">
							<input
								id="company-name"
								v-model="companyName"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
						<div class="col-auto">
							<label for="job-title" class="col-form-label-lg">Job Title:</label>
						</div>
						<div class="col">
							<input
								id="job-title"
								v-model="jobTitle"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
					</div>
					<div class="row">
						<div class="col text-end">
							<button
								id="copy-button"
								v-tooltip="{
									content: 'Copied!',
									placement: 'left',
									triggers: ['click']
								}"
								type="button"
								class="btn btn-primary"
								@click="handleCopyButton"
							>
								<i class="bi bi-clipboard"></i> Copy To Clipboard
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div id="letter-output" class="card">
								<div id="letter-content" class="card-body letter-body">{{ letterContent }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Mustache from 'mustache'
import useTemplate from '../composables/useTemplate'
import TemplateSelectorComponent from '../components/TemplateSelectorComponent.vue'
import { useClipboard } from '@vueuse/core'
import { Tooltip } from 'bootstrap'

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

const { copy, copied } = useClipboard()
const tooltip = new Tooltip(document.body, {
	selector: "[data-bs-toggle='tooltip']",
	animation: true,
	trigger: 'click'
})
const handleCopyButton = function () {
	copy(letterContent.value)
	if (copied) {
		tooltip.show()
		setTimeout(() => {
			tooltip.blur()
		}, 1500)
	}
}
</script>

<template>
	<div id="home-view-content" class="row p-1 pt-4">
		<div class="col">
			<div class="row">
				<div class="col"><h1>Generate Cover Letter</h1></div>
			</div>
			<div class="row">
				<div id="options-column" class="col-4 primary-bordered">
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
				<div id="letter-area" class="col">
					<form class="row gx-3 align-items-center">
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
					</form>
					<div class="row">
						<div class="col float-end">
							<span data-bs-toggle="tooltip" title="Copied!" data-bs-placement="bottom">
								<button id="copy-button" class="btn btn-primary" @click="handleCopyButton">
									<i class="bi bi-clipboard">Copy To Clipboard</i>
								</button>
							</span>
						</div>
					</div>
					<div class="row pt-3">
						<div class="col">
							<div id="letter-output" class="card">
								<div class="card-body vh-85">{{ letterContent }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#letter-output {
	div {
		white-space: preserve;
	}
}
</style>

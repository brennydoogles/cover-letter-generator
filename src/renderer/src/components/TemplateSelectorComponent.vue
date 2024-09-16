<script setup>
import useTemplate from '../composables/useTemplate'
import { useTemplateStore } from '../stores/template'
import { storeToRefs } from 'pinia'

const templateStore = useTemplateStore()
const { selectedTemplateKey } = useTemplate()
const { templates } = storeToRefs(templateStore)

defineEmits(['selectedTemplateChanged'])
</script>

<template>
	<div id="template-selection-row" class="row pt-2 align-items-center">
		<div class="col-auto">
			<label for="templateSelector" class="col-form-label">Select a Template</label>
		</div>
		<div class="col">
			<select
				id="templateSelector"
				v-model="selectedTemplateKey"
				class="form-control form-select"
				@change="$emit('selectedTemplateChanged', selectedTemplateKey)"
			>
				<option
					v-for="(template, index) in templates"
					:key="template.id"
					:value="template.id"
					:selected="index === 0"
				>
					{{ template.name }}
				</option>
			</select>
		</div>
	</div>
</template>

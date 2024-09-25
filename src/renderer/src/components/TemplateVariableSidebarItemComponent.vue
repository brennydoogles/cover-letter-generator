<script setup>
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { hideAllPoppers } from 'floating-vue'

const props = defineProps({
	isGlobalVariable: Boolean,
	sectionKey: String,
	sectionLabel: String,
	sectionText: String
})
const emit = defineEmits(['delete'])
const conditionalInsertTemplate = computed(() => {
	return `{{# ${props.sectionKey}.isSelected}}
	{{ ${props.sectionKey}.value }}
{{/ ${props.sectionKey}.isSelected}}`
})

const insertTemplate = computed(() => {
	return `{{ ${props.sectionKey}.value }}`
})

const textVisible = ref(false)

const { copy } = useClipboard()

const handleCopyButton = function (toggleable) {
	if (toggleable) {
		copy(conditionalInsertTemplate.value)
	} else {
		copy(insertTemplate.value)
	}
	setTimeout(() => hideAllPoppers(), 2000)
}

const handleDeleteButton = function () {
	if (!props.isGlobalVariable) {
		emit('delete', props.sectionKey)
	}
}
</script>

<template>
	<div class="row templateVariableSidebarComponent">
		<div class="col">
			<div class="row">
				<div class="col">
					<h4>{{ props.sectionLabel }}</h4>
				</div>
			</div>

			<div v-if="!props.isGlobalVariable" class="row" @click="textVisible = !textVisible">
				<div class="col">
					<div class="row">
						<div class="col">
							<h5 v-if="!textVisible">View Text</h5>
							<h5 v-if="textVisible">Collapse Text</h5>
						</div>
						<div class="col text-end">
							<i v-if="!textVisible" class="bi bi-caret-down-fill" />
							<i v-if="textVisible" class="bi bi-caret-up-fill" />
						</div>
					</div>
					<div v-if="textVisible" class="row">
						<div class="col">
							<p>{{ props.sectionText }}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="row text-center justify-content-center">
				<div class="col">
					<button
						v-tooltip="{
							content: 'Copied!',
							placement: 'bottom',
							triggers: ['click']
						}"
						type="button"
						class="btn btn-success text-nowrap"
						@click="handleCopyButton(false)"
					>
						Copy Stub
					</button>
				</div>
				<div class="col">
					<button
						v-tooltip="{
							content: 'Copied!',
							placement: 'bottom',
							triggers: ['click']
						}"
						type="button"
						class="btn btn-success text-nowrap"
						@click="handleCopyButton(true)"
					>
						Copy Conditional Stub
					</button>
				</div>
				<div class="col">
					<button
						type="button"
						class="btn btn-danger text-nowrap"
						:disabled="props.isGlobalVariable"
						@click="handleDeleteButton"
					>
						Delete Section
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

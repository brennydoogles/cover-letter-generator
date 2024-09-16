<script setup>
import GenericModal from './GenericModal.vue'
import { computed, ref } from 'vue'

defineProps({
	show: Boolean
})
const emit = defineEmits(['close', 'submit'])

const section = ref({
	key: '',
	label: '',
	text: '',
	isSelected: false
})

function clearState() {
	section.value = {
		key: '',
		label: '',
		text: '',
		isSelected: false
	}
}

const submitEnabled = computed(() => {
	return section.value.key && section.value.text && section.value.label
})

const handleClose = function () {
	clearState()
	emit('close')
}

const handleSubmit = function () {
	if (submitEnabled.value) {
		const value = section.value
		clearState()
		emit('submit', value)
	}
}
</script>

<template>
	<Teleport to="body">
		<GenericModal :show="show">
			<template #header>
				<h5 class="mx-auto">Add New Section</h5>
			</template>

			<template #body>
				<div class="container">
					<div class="row gx-3 align-items-center">
						<div class="col-3">
							<label for="sectionKey" class="col-form-label-lg">Section Key</label>
						</div>
						<div class="col">
							<input
								v-model="section.key"
								name="sectionKey"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
					</div>
					<div class="row pt-2 gx-3 align-items-center">
						<div class="col-3">
							<label for="sectionLabel" class="col-form-label-lg">Section Label</label>
						</div>
						<div class="col">
							<input
								v-model="section.label"
								name="sectionLabel"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
					</div>
					<div class="row pt-2 gx-3 align-items-center">
						<div class="col-3">
							<label for="sectionText" class="col-form-label-lg">Section Text</label>
						</div>
						<div class="col">
							<input
								v-model="section.text"
								name="sectionText"
								type="text"
								class="form-control form-control-lg"
							/>
						</div>
					</div>
				</div>
			</template>

			<template #footer>
				<div class="row gx-1 float-end">
					<div class="col">
						<button class="btn btn-danger" @click="handleClose">Cancel</button>
					</div>
					<div class="col">
						<button class="btn btn-success" :disabled="!submitEnabled" @click="handleSubmit">
							Submit
						</button>
					</div>
				</div>
			</template>
		</GenericModal>
	</Teleport>
</template>

<style scoped></style>

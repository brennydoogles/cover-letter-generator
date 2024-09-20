<script setup>
import NavBarComponent from './components/NavBarComponent.vue'
import { onMounted } from 'vue'
import { useTemplateStore } from './stores/template'
import { storeToRefs } from 'pinia'

const templateStore = useTemplateStore()
const { templates } = storeToRefs(templateStore)

onMounted(async () => {
	templates.value = await window.api.fileStore.loadTemplatesOrDefault()
})
</script>

<template>
	<div id="main-app" class="container-fluid">
		<div class="row">
			<div class="col">
				<NavBarComponent />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	url: String
})
const handleClick = function () {
	window.shell.openExternal(props.url)
}
</script>

<template>
	<div class="row">
		<div class="col">
			<a href="#" @click.prevent="handleClick"><slot></slot></a>
		</div>
	</div>
</template>

<style scoped></style>

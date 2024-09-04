<script setup>

// import { shell } from 'electron'

function openLink() {
	window.shell.openExternal('https://www.google.com')
}
</script>

<template>
	<div class="row">
		<div class="col">
			<div class="row">
				<div class="col"><h1 class="test">Template Editor</h1></div>
			</div>

			<div class="row">
				<div class="col">
					<form>
						<button class="btn btn-primary" @click="openLink">Test Link</button>
					</form>
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped></style>

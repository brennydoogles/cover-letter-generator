<script setup>
import { computed, ref } from 'vue'

const companyName = ref('')
const jobTitle = ref('')
const letterContent = computed(() => {
  if (companyName.value && jobTitle.value) {
    return `${companyName.value} - ${jobTitle.value}`
  }
  return ''
})
</script>

<template>
  <div id="home-view-content" class="row pt-4">
    <div class="col">
      <div class="row">
        <div class="col"><h1>Generate Cover Letter</h1></div>
      </div>
      <div class="row">
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
          <div class="row pt-3">
            <div class="col">
              <div id="letter-output" class="card">
                <div class="card-body vh-85">{{ letterContent }}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="options-column" class="col-4">
          <div class="row pt-2">
            <div class="col"><h2 class="text-center">Template Options</h2></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/bootstrap-custom';

#options-column {
  border: $primary solid 1px;
  border-radius: 15px;
}
</style>

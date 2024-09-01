import { defineStore } from 'pinia'

export const useTemplateStore = defineStore({
  id: 'template',
  state: () => ({
    templates: {}
  }),
  actions: {
    addTemplate(template) {
      this.templates[template.id] = template
    }
  }
})

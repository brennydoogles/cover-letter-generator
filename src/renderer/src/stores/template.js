import { defineStore } from 'pinia'

export const useTemplateStore = defineStore({
	id: 'template',
	state: () => ({
		templates: {
			default: {
				id: 'default',
				name: 'Default Template',
				templateText: `To whom it may concern,


I am interested in joining {{companyName.value}} as a {{jobTitle.value}}. In addition to my great admiration of {{companyName.value}}'s brand, I feel my skills and experience would make me an ideal member of the {{companyName.value}} team.
{{#managementExperience.isSelected}}

{{managementExperience.value}}
{{/managementExperience.isSelected}}

Thank you,
Wile E. Coyote`,
				sections: [
					{
						key: 'managementExperience',
						label: 'Line Management Experience',
						text: 'I am an experienced line manager, having managed teams for 10 years.',
						isSelected: false
					}
				]
			}
		}
	}),
	actions: {
		addTemplate(template) {
			this.templates[template.id] = template
		}
	}
})

<script setup>
import ExternallyClickableLinkComponent from '../components/ExternallyClickableLinkComponent.vue'
</script>

<template>
	<div id="about-view-content" class="row p-1 pt-4">
		<div class="col">
			<div class="row">
				<div class="col text-center">
					<h1 class="test">About</h1>
				</div>
			</div>
			<div class="row pt-2">
				<div id="links-column" class="col-4 primary-bordered vh-85 text-center">
					<h1>Useful Links</h1>
					<h2>Mustache</h2>
					<ExternallyClickableLinkComponent url="https://mustache.github.io/mustache.5.html"
						>Mustache Language Documentation</ExternallyClickableLinkComponent
					>
					<ExternallyClickableLinkComponent
						url="https://docs.getdrafts.com/docs/actions/templates/mustache"
						>Mustache Language Tutorial</ExternallyClickableLinkComponent
					>
					<h2>Cover Letter Writing</h2>
					<ExternallyClickableLinkComponent
						url="https://uk.indeed.com/career-advice/cvs-cover-letters/how-to-write-a-cover-letter"
						>Indeed Cover Letter Writing Tutorial</ExternallyClickableLinkComponent
					>
					<ExternallyClickableLinkComponent
						url="https://nationalcareers.service.gov.uk/careers-advice/covering-letter"
						>UK Government Cover Letter Writing Tutorial</ExternallyClickableLinkComponent
					>
					<ExternallyClickableLinkComponent url="https://www.youtube.com/watch?v=NUhDP30IRKk"
						>Jeff Su Cover Letter Tutorial (Youtube)</ExternallyClickableLinkComponent
					>
				</div>
				<div id="docs-column" class="col px-4">
					<h2>Introduction</h2>
					<p>
						Cover Letter Generator is a tool designed to make the process of job searching easier by
						allowing candidates to create cover letter templates and tailor them to each specific
						job with minimal effort. This is achieved by allowing candidates to create text
						templates using the Mustache templating language. Each template will have access to some
						information by default, but can also have custom sections defined which can be toggled
						on or off at will once the template has been saved.
					</p>
					<h2>How It Works</h2>
					<p>
						The cover letter generator is easy to use. First, you set up a template (or more than
						one if that suits you) using the Mustache templating language. In that template, you'll
						define as many toggleable sections as you need to be able to customize your cover letter
						in any situation you might need (don't worry, you can always edit an existing cover
						letter if you want). Once your template is defined you can choose it in the cover letter
						generator, type in the name of the company and job title you are applying for, toggle on
						the sections you want to enable, and then copy your cover letter for use in your job
						application. Easy-peasy.
					</p>
					<h2>Writing Templates</h2>
					<h3>Mustache Format</h3>
					<p>
						The mustache language is both powerful and easy to use, and was therefore a logical
						choice for this application. Rather than document the entire language here, I will show
						a practical example that should be enough to write most cover letters. This example will
						be written to reference variables in a cover letter generator specific way. To find out
						more, check out the Mustache documentation!
					</p>
					<h4>Most Common Use Case: Referencing a Variable if it has Been Selected in Options</h4>
					<p>
						In this case, let us imagine that we are writing a template for restaurant job
						applications, and in some cases we might want to highlight management experience (for
						management roles). In this case we would configure our template with the following
						variable:
					</p>
					<pre>
management: {
	value: "I worked previously a shift manager at my local Nando's and received good reviews from the store owner.",
	isSelected: true
}
					</pre
					>
					<p>We could then optionally reference this variable in our template as follows:</p>
					<pre v-pre>
To whom it may concern,

	I would like to apply for the open position at your restaurant.
	{{#management.isSelected}} {{ management.value }} {{/management.isSelected}}

Sincerely,
John Doe
					</pre
					>
					<p>
						What have we done above? The first construct of note is the conditional, defined as
						<span v-pre>{{#management.isSelected}} {{/management.isSelected}}</span
						>. Whatever content exists between those tags (including spaces, line breaks, text,
						other variables, or even nested conditionals) will only be displayed if the variable
						with the key 'management' has been toggled on. Otherwise, all content between those tags
						will not be in the text of your cover letter. Note that the opening tag begins with a
						'#' character, and the closing tag begins with the '/' character.
					</p>
					<p>
						The next construct of note is the <span v-pre>{{ management.value }}</span> tag. This
						tag, when used inside a conditional or on its own, will display the value configured for
						the management variable. This could be a single word, or multiple paragraphs of text.
						The world is your burrito!
					</p>
					<h3>Variables</h3>
					<h4>Variable Structure</h4>
					<p>
						All variables which are available for use in the Cover Letter Generator have a
						consistent structure and are made of the following parts: The key, the value, and
						isSelected. The key of a variable is how we identify which variable we want to use in
						our template. The value is the text that will be injected into the template when that
						variable's value is used. The isSelected field can be used to determine if that variable
						has a value (for global variables) or whether or not that variable has been toggled on
						(for template variables). The generalized structure of the variables available to a
						template might look something like this:
					</p>
					<pre>
	[
		key1: {
			value: "This is the value of key1",
			isSelected: true
		},
		key2: {
			value: "This is the value of key2",
			isSelected: false
		}
	]
					</pre
					>
					<h4>Global Variables</h4>
					<p>
						When using the cover letter generator one might notice the text inputs allowing them to
						enter the company name and job title for the job to which they are applying. The values
						of these text inputs are made available as the global variables 'companyName' and
						'jobTitle' using the structure as defined above, with the isSelected variable
						representing whether or not the text input contains any text.
					</p>
					<h4>Template Variables</h4>
					<p>
						Template variables are structurally identical to global variables, with the one
						difference being that their 'isSelected' property is controlled by a toggle in the cover
						letter generator Template Options area. When defining a new template section (which is
						how you create template sections) you will have three fields to provide. The first is
						the section key. This corresponds directly to the variable key. The next is the section
						label. This will set the text shown in the options column of the cover letter generator
						next to the toggle used to toggle the variable on and off. Finally, there is the section
						text. This will become the variable value.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
h2 {
	text-align: center;
}
#docs-column {
	max-height: 80vh;
	overflow-y: scroll;
}
</style>

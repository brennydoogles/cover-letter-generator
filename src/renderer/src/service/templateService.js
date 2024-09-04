export default (function() {

	function substituteValue(templateString, key, value) {
		return templateString.replaceAll(`{{${key}}}`, value)
	}

	return { // public interface
		render: function(templateString, params) {
			var processed = 0
			params.forEach(function (param) {
				if (param.isSelected) {
					templateString = substituteValue(templateString, param.key, param.text)
					processed++
				} else {
					templateString = substituteValue(templateString, param.key, '')
				}
			})

			return processed > 0 ? templateString:''
		}
	}
})()


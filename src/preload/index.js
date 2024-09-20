import { contextBridge, shell, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
	testApi: {
		testLogWithParam: (param) => {
			ipcRenderer.send('testLog', param)
		},
		testWithReturn: () => {
			return ipcRenderer.invoke('testInvoke')
		}
	},
	fileStore: {
		persistTemplates: (templates) => {
			ipcRenderer.send('saveTemplates', JSON.parse(templates))
		},
		loadTemplatesOrDefault: () => {
			return ipcRenderer.invoke('loadTemplates')
		}
	}
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
		contextBridge.exposeInMainWorld('shell', shell)
	} catch (error) {
		console.error(error)
	}
} else {
	window.electron = electronAPI
	window.api = api
	window.shell = shell
}

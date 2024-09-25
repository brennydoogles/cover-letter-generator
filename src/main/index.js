import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from '../store/store'

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1500,
		height: 900,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.on('ping', () => console.log('pong'))
	ipcMain.on('testLog', (event, param) => {
		console.log(param)
	})
	ipcMain.handle('testInvoke', async () => {
		return 'Skibidi toilet'
	})

	let templates = {
		example1: {
			id: 'example1',
			name: 'Example 1',
			templateText:
				'John Doe\n123 Somestreet\nBroadstairs, UK, CT10 2BF\njohndoe@email.com\n\nDear Hiring Committee,\n\nI am excited to apply for the {{ jobTitle.value }} position at {{ companyName.value }}, as advertised on your careers page. With a strong foundation in software engineering and a passion for leading teams to achieve exceptional results, I am eager to contribute to {{ companyName.value }}’s innovative projects and collaborative culture.\n\nIn my previous role at Black Mesa, I successfully led a team of software engineers in developing a scalable web application that increased user engagement by 40%. This experience honed my skills in project management, team dynamics, and agile methodologies. I prioritized fostering a culture of open communication and continuous learning, encouraging my team to share ideas and challenge the status quo. As a result, we consistently met project deadlines while maintaining high-quality code and innovative solutions.\n{{# language-list.isSelected}}\n\nThroughout my career, I have gained extensive technical expertise in {{ language-list.value }}, which has enabled me to mentor junior engineers effectively. I believe that a manager’s role extends beyond task delegation; it is about inspiring and empowering team members to reach their full potential. I am particularly drawn to {{ companyName.value }}’s commitment to innovation and collaboration—values I strive to embody in my leadership approach.\n{{/ language-list.isSelected}}\n{{# kt.isSelected}}\n\n{{ kt.value }}.   I am excited about the prospect of bringing this initiative to {{ companyName.value }}, ensuring that every team member feels valued and has opportunities to grow.\n{{/ kt.isSelected}}\n{{# ai.isSelected}}\n\nI am particularly impressed by {{ companyName.value }}’s focus on {{ ai.value }}, and I am eager to leverage my skills to contribute to such impactful work. I am confident that my background in software development, combined with my passion for team leadership, will allow me to make a meaningful contribution to your team.\n{{/ ai.isSelected}} \n\nThank you for considering my application. I look forward to the opportunity to discuss how my experience and vision align with {{ companyName.value }}’s goals. I am excited about the prospect of joining a company that is at the forefront of technology and innovation.\n\nWarm regards,\n\nJohn Doe',
			sections: [
				{
					key: 'language-list',
					label: 'Language List',
					text: 'Java, C#, C++, X86 Assembler, Javascript, Rust, and Whitespace',
					isSelected: false
				},
				{
					key: 'kt',
					label: 'Knowledge Transfer',
					text: 'At Black Mesa, I initiated a bi-weekly knowledge-sharing session that not only improved team cohesion but also enhanced our collective skills',
					isSelected: false
				},
				{
					key: 'ai',
					label: 'AI',
					text: 'Artificial Intelligence',
					isSelected: false
				}
			]
		}
	}
	const store = new Store({
		configName: 'template-store',
		defaults: {
			templates: templates
		}
	})
	ipcMain.on('saveTemplates', (event, newTemplates) => {
		store.set('templates', newTemplates)
	})
	ipcMain.handle('loadTemplates', async () => {
		return store.get('templates')
	})

	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import 'maplibre-gl/dist/maplibre-gl.css'
import './styles/global.css'
import { mount } from 'svelte'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) throw new Error('Root element #app not found')

const app = mount(App, {
  target,
})

export default app

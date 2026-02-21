import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

import 'primereact/resources/themes/lara-light-blue/theme.css';  
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';  

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
    <App />
  </Provider>
)

import { router } from 'router-link'
 
// Do this anywhere inside your component to redirect
router.push('/login')

const routes = [
    { path: '/messages/:id', view: Messages }
  ]
   
  // Use like this
  <Link to={ `/messages/${ message.id }` }>Message</Link>
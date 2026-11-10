import type { Metadata } from 'next'
import Store from './store'
export const metadata: Metadata = {title:'Crach Co — Demo Store',robots:{index:false,follow:false}}
export default function Page(){return <Store/>}

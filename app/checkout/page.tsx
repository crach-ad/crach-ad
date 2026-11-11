import type { Metadata } from 'next'
import Cart from './cart'
export const metadata: Metadata = { title: 'Your book bag · CRACH Books', description: 'Your selection from CRACH Books, an independent bookshop for curious minds.', robots: { index: false, follow: false } }
export default function Page() { return <Cart /> }

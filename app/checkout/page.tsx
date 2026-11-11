import type { Metadata } from 'next'
import { checkoutConfig } from '@/lib/tutorial-checkout'
import Cart from './cart'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Your book bag · CRACH Books', description: 'Your selection from CRACH Books, an independent bookshop for curious minds.', robots: { index: false, follow: false } }
export default function Page() { return <Cart config={checkoutConfig()} /> }

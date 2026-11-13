export const BOOKS = [
  { id: 'quiet-atlas', title: 'The Quiet Atlas', author: 'Rowan Ellis', category: 'Travel & Essays', cents: 1000, theme: 'atlas' },
  { id: 'tidal-notes', title: 'Tidal Notes', author: 'Maya Reed', category: 'Nature & Place', cents: 750, theme: 'tidal' },
  { id: 'paper-gardens', title: 'Paper Gardens', author: 'Iris Vale', category: 'Art & Design', cents: 1250, theme: 'garden' },
] as const

export type BookId = typeof BOOKS[number]['id']
export type Cart = Partial<Record<BookId, number>>
export const MAX_CART_CENTS = 10000
export const CART_COOKIE = 'crach_bookshop_cart'

export function readCart(value: unknown): Cart {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid cart')
  const cart: Cart = {}
  for (const [id, quantity] of Object.entries(value)) {
    if (!BOOKS.some(book => book.id === id) || !Number.isInteger(quantity) || quantity < 0 || quantity > 10) {
      throw Error('Invalid cart item')
    }
    if (quantity) cart[id as BookId] = quantity
  }
  return cart
}

export function priceBookshop(cart: Cart) {
  const selected = BOOKS.filter(book => cart[book.id])
  return {
    lines: selected.map(book => ({ id: book.id, quantity: cart[book.id]! })),
    totalCents: selected.reduce((sum, book) => sum + book.cents * cart[book.id]!, 0),
    item: selected.map(book => `${book.title} × ${cart[book.id]}`).join('; '),
  }
}

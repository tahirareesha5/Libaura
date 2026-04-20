import { create } from "zustand";
import { getDiscountedPrice } from "@/lib/products";

const defaultCheckoutDraft = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

export const useStore = create((set) => ({
  cartItems: [],
  cartOpen: false,
  lastOrder: null,
  checkoutDraft: defaultCheckoutDraft,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const unitPrice = getDiscountedPrice(product);
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            listPrice: product.price,
            unitPrice,
            quantity,
          },
        ],
      };
    }),

  updateQuantity: (productId, nextQuantity) =>
    set((state) => {
      if (nextQuantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        };
      }

      return {
        cartItems: state.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: nextQuantity } : item
        ),
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cartItems: [] }),

  setCheckoutDraft: (values) =>
    set((state) => ({
      checkoutDraft: {
        ...state.checkoutDraft,
        ...values,
      },
    })),

  setLastOrder: (order) => set({ lastOrder: order }),
}));

export const selectCartCount = (state) =>
  state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state) =>
  Number(
    state.cartItems
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
      .toFixed(2)
  );

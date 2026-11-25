import React, { useState } from 'react';
import { CheckCircle2, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem, OrderResponse } from '../../types/coffee';
import { submitOrder } from '../../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] =
    useState<OrderResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const firstItem = items[0];
      const res = await submitOrder({
        productId: firstItem.productId,
        grind: firstItem.grind,
        weightGrams: firstItem.weightGrams,
        isSubscription: firstItem.isSubscription,
        quantity: firstItem.quantity,
        customerName,
        customerEmail,
      });
      setOrderConfirmation(res);
      onClearCart();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not connect to NestJS server on port 3000.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E6DEC8]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D95D39]" />
              <h3 className="font-extrabold text-lg text-[#1E140F]">
                Your Roast Bag
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderConfirmation(null);
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white border border-[#E6DEC8] flex items-center justify-center text-[#1E140F] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {orderConfirmation ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#284234] mx-auto" />
              <h4 className="text-xl font-extrabold text-[#1E140F]">
                OrderConfirmed #{orderConfirmation.orderId}
              </h4>
              <p className="text-xs text-[#6E6156]">
                {orderConfirmation.estimatedDispatch}
              </p>
              <div className="rounded-2xl bg-white border border-[#E6DEC8] p-4 text-left text-xs space-y-1.5">
                <div className="font-bold text-[#1E140F]">
                  {orderConfirmation.productName} ({orderConfirmation.weightGrams}g ·{' '}
                  {orderConfirmation.grind})
                </div>
                <div className="text-[#6E6156]">
                  Plan:{' '}
                  {orderConfirmation.isSubscription
                    ? 'Subscription (15% off)'
                    : 'One-time purchase'}
                </div>
                <div className="font-extrabold text-[#D95D39] pt-1">
                  Total charged: ${orderConfirmation.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#6E6156]">
              Your bag is empty. Pick your grind & size to get started!
            </div>
          ) : (
            <div className="py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-[#E6DEC8] p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-extrabold text-sm text-[#1E140F]">
                      {item.productName}
                    </div>
                    <div className="text-xs text-[#6E6156]">
                      {item.grind} · {item.sizeLabel} ·{' '}
                      {item.isSubscription ? 'Subscribe (15% off)' : 'One-time'}
                    </div>
                    <div className="text-xs font-extrabold text-[#D95D39] mt-1">
                      ${item.unitPrice.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#8C7F73] hover:text-[#D95D39] p-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !orderConfirmation && (
          <form
            onSubmit={handleCheckout}
            className="pt-4 border-t border-[#E6DEC8] space-y-3"
          >
            <div className="flex items-center justify-between text-sm font-extrabold text-[#1E140F]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl bg-white border border-[#E6DEC8] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1E140F]"
            />
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Email for roast tracking"
              className="w-full rounded-xl bg-white border border-[#E6DEC8] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1E140F]"
            />

            {errorMsg && (
              <p className="text-xs text-[#D95D39] font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#1E140F] hover:bg-[#32231B] text-[#FAF6F0] font-extrabold text-xs tracking-wide uppercase transition-colors cursor-pointer"
            >
              {isSubmitting
                ? 'Roasting your order...'
                : `Complete Order · $${subtotal.toFixed(2)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

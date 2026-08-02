import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, CheckCircle2, QrCode, CreditCard, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { BookingItem, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';

interface BookingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: BookingItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: 'ZAR' | 'USD';
  language: Language;
}

export const BookingCartDrawer: React.FC<BookingCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  currency,
  language
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const rateZARtoUSD = 0.055;

  const totalZAR = cartItems.reduce((acc, item) => acc + (item.priceZAR || 0), 0);
  const totalUSD = Math.round(totalZAR * rateZARtoUSD);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payfast' | 'snapscan' | 'eft'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedPass, setConfirmedPass] = useState<any | null>(null);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          paymentMethod
        })
      });
      const data = await response.json();

      if (data.success) {
        setConfirmedPass(data);
        onClearCart();
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-amber-500/30 text-white shadow-2xl flex flex-col h-full overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black tracking-tight">{t.cartTitle}</h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Ticket Digital Pass View */}
        {confirmedPass ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-700/20 border border-amber-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-amber-300">Booking Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Your KwaZulu-Natal Travel Pass has been generated. Show this reference at permits & park gates.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Digital Travel Reference</span>
                <span className="text-2xl font-black text-amber-400 tracking-wider font-mono">
                  {confirmedPass.referenceCode}
                </span>
                
                {/* Simulated QR Pass */}
                <div className="py-3 flex justify-center">
                  <div className="p-3 bg-white rounded-xl shadow-lg inline-block">
                    <QrCode className="w-24 h-24 text-slate-950" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 block">Scan at Hluhluwe Gate, Drakensberg Office & Shuttles</span>
              </div>

              <div className="text-left text-xs space-y-1.5 pt-2 text-slate-300">
                <div><strong>Total Paid:</strong> R{confirmedPass.totalPaidZAR} ({confirmedPass.paymentMethod.toUpperCase()})</div>
                <div><strong>Issued Date:</strong> {new Date().toLocaleDateString()}</div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  id="print-pass-btn"
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition"
                >
                  Print Voucher
                </button>
                <button
                  id="done-pass-btn"
                  onClick={() => {
                    setConfirmedPass(null);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm">{t.cartEmpty}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-400 block">{item.type}</span>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.details}</p>
                      <span className="text-xs font-black text-amber-300 block mt-1">
                        {currency === 'ZAR' ? `R${item.priceZAR}` : `$${Math.round(item.priceZAR * rateZARtoUSD)}`}
                      </span>
                    </div>

                    <button
                      id={`remove-cart-item-${item.id}`}
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
                
                {/* Payment Options */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">South Africa Payment Method:</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      id="pay-opt-card"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        paymentMethod === 'card' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      id="pay-opt-payfast"
                      onClick={() => setPaymentMethod('payfast')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        paymentMethod === 'payfast' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      PayFast
                    </button>
                    <button
                      id="pay-opt-snapscan"
                      onClick={() => setPaymentMethod('snapscan')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        paymentMethod === 'snapscan' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      SnapScan
                    </button>
                    <button
                      id="pay-opt-eft"
                      onClick={() => setPaymentMethod('eft')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        paymentMethod === 'eft' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      EFT
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-slate-300">{t.cartTotal}:</span>
                  <span className="text-2xl font-black text-amber-400">
                    {currency === 'ZAR' ? `R${totalZAR}` : `$${totalUSD}`}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  id="checkout-cart-btn"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm hover:brightness-110 transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{isProcessing ? 'Processing Payment...' : t.checkoutBtn}</span>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

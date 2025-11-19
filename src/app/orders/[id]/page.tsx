import { notFound } from 'next/navigation';
import { orders } from '@/lib/data';
import OrderStatusTracker from '@/components/order/order-status-tracker';

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <OrderStatusTracker initialOrder={order} />
    </div>
  );
}

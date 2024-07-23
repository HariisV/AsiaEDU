import BreadCrumb from '@/components/breadcrumb';
import CardProduct from '@/components/card-product';
import PaymentModal from '@/components/payment-modal';
import useGetList from '@/hooks/use-get-list';
import { useState } from 'react';

export default function AllClass() {
  const [paymentModal, setPaymentModal] = useState(false);

  const [itemDetail, setItemDetail] = useState({});

  const getClass = useGetList({
    url: 'user/tryout/my-tryout',
    initialParams: {
      skip: 0,
      take: 0,
      category: '',
    },
  });

  return (
    <div>
      {paymentModal && (
        <PaymentModal setVisible={setPaymentModal} itemDetail={itemDetail} />
      )}
      <BreadCrumb
        page={[{ name: 'Paket Pembelian', link: '/paket-pembelian' }]}
      />
      <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full">
        <div className="title flex justify-between w-full">
          <h1 className="text-2xl text-indigo-900 font-bold mb-5">
            Paket Pembelian
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {getClass?.list?.map((item) => (
          <CardProduct
            setVisible={setPaymentModal}
            item={item}
            setItemDetail={setItemDetail}
          />
        ))}
      </div>
    </div>
  );
}

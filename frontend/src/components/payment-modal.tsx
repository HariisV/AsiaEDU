import { postData } from '@/utils/axios';
import { useState } from 'react';
import { Dialog } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';
import Button from './button';

export default function PaymentModal({
  setVisible,
  setDetail,
  itemDetail,
}: any) {
  const navigate = useNavigate();

  const handleClose = () => {
    setVisible(false);
    setDetail({});
  };

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);

    postData('user/kelas/join', {
      id: itemDetail.id,
    })
      .then((res) => {
        console.log(res);
        navigate(`/kelas/${itemDetail.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog
      header={'Join Kelas'}
      visible
      onClose={handleClose}
      className="w-[800px]"
      footer={null}
    >
      <p>
        Apakah anda yakin ingin bergabung dengan kelas ini? Dengan bergabung di
        kelas ini, anda akan mendapatkan akses ke seluruh materi yang ada di
        kelas ini.
      </p>
      <div className="flex justify-end gap-2 mt-5">
        <Button
          type="submit"
          disabled={isLoading}
          onClick={handlePayment}
          className="px-5 disabled:opacity-50 disabled:bg-primary"
          isLoading={isLoading}
        >
          Gabung Sekarang
        </Button>
      </div>
    </Dialog>
  );
}

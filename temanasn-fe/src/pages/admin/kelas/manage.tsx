import Form from '@/components/form';
import Input from '@/components/input';
import { patchData, postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { jsonToFormData } from '@/utils/json-to-form-data';
import { useState } from 'react';
import { Button, Dialog } from 'tdesign-react';

export default function ManageKelas({
  setVisible,
  params,
  detail,
  setDetail,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);

    const payload = jsonToFormData(data);

    FetchAPI(
      detail.id
        ? patchData(`admin/kelas/update/${detail.id}`, payload)
        : postData('admin/kelas/insert', payload)
    )
      .then(() => {
        params.refresh();
        setVisible(false);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setDetail({});
  };

  return (
    <Dialog
      header={detail.id ? 'Edit Kelas' : 'Tambah Kelas'}
      visible
      onClose={handleClose}
      className="w-[800px]"
      footer={null}
    >
      <Form
        onSubmit={handleSubmit}
        className="space-y-6"
        defaultValues={detail}
      >
        <Input
          title="Nama Lengkap"
          name="name"
          type="text"
          validation={{
            required: 'Nama lengkap harus di isi',
          }}
        />
        <Input
          title="Thumbnail"
          name="gambar"
          type="file"
          accept=".jpg,.jpeg,.png"
          validation={{
            required: detail.id ? false : 'Thumbnail tidak boleh kosong',
          }}
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            size="large"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" size="large" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}

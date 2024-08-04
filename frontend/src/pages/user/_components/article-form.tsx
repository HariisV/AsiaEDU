import { Button, Dialog, Row, Col } from 'tdesign-react';
import Form from '@/components/form.tsx';
import Input from '@/components/input.tsx';
import { useState, ChangeEvent } from 'react';
import { AddIcon } from 'tdesign-icons-react';
import { postData } from '@/utils/axios.ts';
import FetchAPI from '@/utils/fetch-api.ts';

interface MediaItem {
  urlFile: any;
  type: string;
}

interface ArticleFormProps {
  setVisible: (visible: boolean) => void;
  kelasId?: any;
  params?: any;
}

export default function ArticleForm({
  setVisible,
  kelasId,
  params,
}: ArticleFormProps) {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([
    { urlFile: '', type: 'image' },
  ]);

  const handleAddMedia = () => {
    setMedia([...media, { urlFile: '', type: 'image' }]);
  };

  const handleMediaChange = (
    index: number,
    key: keyof MediaItem,
    value: any
  ) => {
    const newMedia = [...media];
    newMedia[index][key] = value;
    setMedia(newMedia);
  };

  const handleUrlChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    handleMediaChange(index, 'urlFile', e.target.value);
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('kelasId', kelasId);
    data.media.forEach((item: any, index: number) => {
      if (item.urlFile && item.urlFile[0]) {
        formData.append(`media[${index}][urlFile]`, item.urlFile[0]);
      } else {
        console.warn(
          `Media item at index ${index} does not have a valid urlFile.`
        );
      }
      formData.append(`media[${index}][type]`, item.type);
    });

    FetchAPI(postData('user/kelas/article/insert', formData))
      .then(() => {
        params.refresh();
        setVisible(false);
        setLoading(false);
      })
      .finally(() => {
        params.refresh();
        setLoading(false);
      });
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Dialog
      header={'Buat Article'}
      visible
      onClose={handleClose}
      className="w-[1200px]"
      footer={null}
    >
      <Form onSubmit={handleSubmit} className="space-y-6 overflow-hidden">
        <Input
          title="Judul Artikel"
          name="title"
          type="text"
          validation={{
            required: 'Judul artikel harus diisi',
          }}
        />
        <Input title="Deskripsi" name={`description`} type="ckeditor" />
        <div className="flex flex-col justify-end gap-2">
          <div>
            {media.map((_, index) => (
              <Row key={index} gutter={4} className="mt-4">
                <Col span={12}>
                  <Input
                    title="Media URL"
                    name={`media[${index}][urlFile]`}
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleUrlChange(index, e)
                    }
                  />
                </Col>
              </Row>
            ))}
          </div>
          <Button onClick={handleAddMedia} icon={<AddIcon />} className="mt-3">
            Media
          </Button>
        </div>

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

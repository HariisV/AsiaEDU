import {
  Avatar,
  Button,
  Card,
  Col,
  Comment,
  Dialog,
  Divider,
  Image,
  ImageViewer,
  ImageViewerProps,
  Row,
  Space,
  Textarea,
} from 'tdesign-react';
import { ChatIcon, Icon, ThumbUpIcon } from 'tdesign-icons-react';
import CommentList from '@/pages/user/_components/comment-list.tsx';
import { useEffect, useState } from 'react';
import FetchAPI from '@/utils/fetch-api.ts';
import { postData } from '@/utils/axios.ts';
import moment from 'moment';
import { imageLink } from '@/utils/image-link';
import ReactPlayer from 'react-player';

type Article = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  media?: any;
  User?: any;
  comment?: any;
  like?: any;
  countLike?: number;
  countComment?: number;
  _count?: any;
};

type ArticleCardProps = {
  data: Article;
  refetch: any;
};

export default function ArticleCard({ data, refetch }: ArticleCardProps) {
  const [comment, setComment] = useState('');
  const [payload, setPayload] = useState<Article>(data);
  const [like, setLike] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  function submitComment() {
    FetchAPI(
      postData('user/kelas/article/comment', {
        articleId: payload.id,
        comment: comment,
      })
    ).then(() => {
      setComment('');
      refetch.refresh();
    });
  }

  const replyForm = (
    <Space direction="vertical" align="end" style={{ width: '100%' }}>
      <Textarea
        placeholder="Tulis komentar disini..."
        value={comment}
        onChange={setComment}
      />
      <Button style={{ float: 'right' }} onClick={submitComment}>
        Send
      </Button>
    </Space>
  );

  function handleClickMedia(url: string) {
    window.open(url);
  }

  function handleLike() {
    FetchAPI(
      postData('user/kelas/article/like', {
        articleId: payload.id,
        id: payload.like[0]?.id,
      })
    ).then(() => {
      refetch.refresh();
    });
  }

  useEffect(() => {
    setPayload(data);

    if (payload.like) {
      setLike(payload.like.length);
    }
  }, [payload, data]);

  return (
    <>
      <Card
        title={payload.title}
        description={`by ${payload?.User?.name} at ${moment(
          payload.createdAt
        ).fromNow()}`}
        style={{
          width: '100%',
        }}
        avatar={
          <Avatar size="40px" image={imageLink(payload?.User?.gambar)}></Avatar>
        }
        footer={
          <Comment
            avatar={
              <Avatar
                size="40px"
                image={imageLink(payload?.User?.gambar)}
              ></Avatar>
            }
            content={replyForm}
          />
        }
        className="rounded-xl"
      >
        <Row style={{ marginBottom: '1rem', marginTop: '.5rem' }}>
          <Col span={12} className="mb-3">
            {payload.media
              ?.filter((e: any) => e.type === 'IMAGE')
              .map((item: any, index: number) => {
                const trigger: ImageViewerProps['trigger'] = ({ open }) => {
                  const mask = (
                    <div
                      style={{
                        background: 'rgba(0,0,0,.6)',
                        color: '#fff',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={open}
                    >
                      <span>
                        <Icon size="16px" name={'browse'} /> Lihat
                      </span>
                    </div>
                  );

                  return (
                    <Image
                      alt={'image'}
                      src={imageLink(item.urlFile)}
                      overlayContent={mask}
                      overlayTrigger="hover"
                      fit="contain"
                      style={{
                        width: 160,
                        height: 160,
                        border:
                          '4px solid var(--td-bg-color-secondarycontainer)',
                        borderRadius: 'var(--td-radius-medium)',
                        backgroundColor: '#fff',
                      }}
                    />
                  );
                };

                return (
                  <ImageViewer
                    key={index}
                    trigger={trigger}
                    images={[imageLink(item.urlFile)]}
                    defaultIndex={index}
                  />
                );
              })}
          </Col>
          <Col span={12} className="mb-3">
            {payload.description}
          </Col>
          <Col span={12} className="mb-2 flex gap-3">
            {payload.media
              ?.filter((e: any) => e.type !== 'IMAGE')
              .map((item: any, index: number) => (
                <div key={index}>
                  {item.type === 'VIDEO' ? (
                    <Button
                      variant="outline"
                      size="large"
                      onClick={() => {
                        setVisible(true);
                        setVideoUrl(imageLink(item.urlFile));
                      }}
                      icon={<Icon name="logo-youtube" />}
                      className="flex items-center justify-start"
                    >
                      Video Pembelajaran
                    </Button>
                  ) : item.type === 'DOCUMENT' ? (
                    <Button
                      variant="outline"
                      size="large"
                      onClick={() => handleClickMedia(imageLink(item.urlFile))}
                      icon={<Icon name="file-attachment" />}
                      className="flex items-center justify-start"
                    >
                      Modul Pembelajaran
                    </Button>
                  ) : // <PDFViewer fileUrl={item.urlFile}/>
                  null}
                </div>
              ))}
          </Col>
        </Row>
        <Divider className="my-4" />
        <Row align="middle" justify="start" className="mb-4" gutter={6}>
          <Col span={6}>
            <Button
              shape="round"
              variant={like ? 'base' : 'text'}
              icon={<ThumbUpIcon />}
              onClick={handleLike}
            >
              {payload._count.like} Suka
            </Button>
            <Button shape="round" variant="text" icon={<ChatIcon />}>
              {payload.comment.length} Komentar
            </Button>
          </Col>
        </Row>
        <div className="-mt-2 py-2 lg:mt-0 lg:flex-shrink-0 w-full overflow-y-auto max-h-36">
          <CommentList data={payload.comment} />
        </div>
        <Dialog
          visible={visible}
          onClose={() => setVisible(false)}
          header="Video Player"
          footer={null}
          width="60%"
        >
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        </Dialog>
      </Card>
    </>
  );
}

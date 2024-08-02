import {
    Avatar,
    Button,
    Card,
    Col,
    Comment,
    Divider,
    Dropdown, Image, ImageViewer, ImageViewerProps, MessagePlugin,
    NotificationPlugin,
    Row,
    Space,
    Textarea
} from "tdesign-react";
import {ChatIcon, Icon, Share1Icon, ThumbUpIcon} from "tdesign-icons-react";
import CommentList from "@/pages/user/_components/comment-list.tsx";
import {useEffect, useState} from "react";
import {parseToDayjs} from "tdesign-react/es/_common/js/date-picker/format";
import FetchAPI from "@/utils/fetch-api.ts";
import {postData} from "@/utils/axios.ts";

type Article = {
    id: number
    title: string
    description: string
    createdAt: string
    updatedAt: string
    media?: any
    User?: any
    comment?: any
    like?: any
    countLike?: number
    countComment?: number,
    _count?: any
}

type ArticleCardProps = {
    data: Article,
    refetch: any
}

export default function ArticleCard({data, refetch}: ArticleCardProps) {
    const [comment, setComment] = useState('');
    const [payload, setPayload] = useState<Article>(data);
    const [like, setLike] = useState<boolean>(false)

    function submitComment() {
        FetchAPI(postData('user/kelas/article/comment', {articleId: payload.id, comment: comment}))
            .then(() => {
                NotificationPlugin.success({
                    title: 'Komentar Terkirim',
                    duration: 3000,
                });
                setComment('')
                refetch.refresh()
            });
    }

    const replyForm = (
        <Space direction="vertical" align="end" style={{width: '100%'}}>
            <Textarea placeholder="Tulis komentar disini..." value={comment} onChange={setComment}/>
            <Button style={{float: 'right'}} onClick={submitComment}>Send</Button>
        </Space>
    );


    function handleShare() {
        NotificationPlugin.success({
            title: 'Shared',
            content: 'Kelas telah di share',
            duration: 3000,
        });
    }

    function handleClickMedia(url: string) {
        window.open(url)
    }

    function handleLike() {
        FetchAPI(postData('user/kelas/article/like', {articleId: payload.id, id: payload.like[0]?.id}))
            .then(() => {
                NotificationPlugin.success({
                    title: 'Liked',
                    duration: 3000,
                });
                refetch.refresh()
            });
    }

    useEffect(() => {
        setPayload(data)

        if (payload.like) {
            setLike(payload.like.length)
        }
    }, [payload, data]);

    return (
        <>
            <Card
                title={payload.title}
                description={`by ${payload?.User?.name} at ${parseToDayjs(payload.createdAt, 'DD MMMM YYYY')}`}
                style={{
                    width: '100%',
                }}
                avatar={<Avatar size="48px" image="https://tdesign.gtimg.com/site/avatar.jpg"></Avatar>}
                footer={
                    <Comment avatar="https://tdesign.gtimg.com/site/avatar.jpg" content={replyForm}/>
                }
                className="rounded-xl"
            >
                <Row style={{marginBottom: '1rem', marginTop: '.5rem'}}>
                    <Col span={12} className="mb-3">
                        {payload.media?.filter((e: any) => e.type === 'IMAGE').map((item: any, index: number) => {
                            const trigger: ImageViewerProps['trigger'] = ({open}) => {
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
                                        <Icon size="16px" name={'browse'}/> Lihat
                                      </span>
                                    </div>
                                );

                                return (
                                    <Image
                                        alt={'image'}
                                        src={item.urlFile}
                                        overlayContent={mask}
                                        overlayTrigger="hover"
                                        fit="contain"
                                        style={{
                                            width: 160,
                                            height: 160,
                                            border: '4px solid var(--td-bg-color-secondarycontainer)',
                                            borderRadius: 'var(--td-radius-medium)',
                                            backgroundColor: '#fff',
                                        }}
                                    />
                                );
                            };

                            return <ImageViewer key={index} trigger={trigger} images={[item.urlFile]}
                                                defaultIndex={index}/>;
                        })}
                    </Col>
                    <Col span={12} className="mb-3">
                        {payload.description}
                    </Col>
                    <Col span={12} className="mb-2 flex gap-3">
                        {payload.media?.filter((e: any) => e.type !== 'IMAGE').map((item: any, index: number) => (
                            <div key={index}>
                                {
                                    item.type === 'VIDEO' ? (
                                        <Button
                                            variant="outline"
                                            size="large"
                                            onClick={() => handleClickMedia(item.urlFile)}
                                            icon={<Icon name="logo-youtube"/>}
                                            className="flex items-center justify-start"
                                        >
                                            Video Pembelajaran
                                        </Button>
                                    ) : item.type === 'DOCUMENT' ? (
                                        <Button
                                            variant="outline"
                                            size="large"
                                            onClick={() => handleClickMedia(item.urlFile)}
                                            icon={<Icon name="file-attachment"/>}
                                            className="flex items-center justify-start"
                                        >
                                            Modul Pembelajaran
                                        </Button>
                                    ) : null
                                }
                            </div>
                        ))}
                    </Col>
                </Row>
                <Divider className="my-4"/>
                <Row align="middle" justify="start" className="mb-4" gutter={6}>
                    <Col span={6}>
                        <Button shape="round" variant={like ? 'base' : 'text'} icon={<ThumbUpIcon/>}
                                onClick={handleLike}>
                            {payload._count.like} Suka
                        </Button>
                        <Button shape="round" variant="text" icon={<ChatIcon/>}>
                            {payload.comment.length} Komentar
                        </Button>
                    </Col>
                    <Col span={6} className="flex justify-end">
                        <Button variant="text" icon={<Share1Icon/>} onClick={handleShare}>
                        </Button>
                    </Col>
                </Row>
                <div className="-mt-2 py-2 lg:mt-0 lg:flex-shrink-0 w-full overflow-y-auto max-h-36">
                    <CommentList data={payload.comment}/>
                </div>
            </Card>
        </>
    )
}
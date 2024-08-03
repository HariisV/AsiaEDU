import {Row, Col, Typography, Button, Tooltip} from 'tdesign-react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useGetList from '@/hooks/use-get-list.tsx';
import ArticleCard from '@/pages/user/_components/article-card.tsx';
import {AddIcon} from 'tdesign-icons-react';
import ArticleForm from '@/pages/user/_components/article-form.tsx';
import {getData} from '@/utils/axios.ts';

const {Title} = Typography;

type KelasDetail = {
    name: string;
    gambar: string;
};

const initialData = {
    name: '',
    gambar: '',
};

export default function KelasDetail() {
    const params = useParams();
    const [showForm, setShowForm] = useState(false);
    const [kelasId, setKelasId] = useState<string | undefined>();
    const [kelasDetail, setKelasDetail] = useState<KelasDetail>(initialData);
    const [articles, setArticles] = useState<any[]>([]);

    const getDetail = async () => {
        getData(`user/kelas/find/${kelasId}`).then((res) => {
            setKelasDetail(res);
        });
    };

    const getArticles = useGetList({
        url: `user/kelas/article/get`,
        initialParams: {
            skip: 0,
            take: 9999,
            kelasId: params.id,
        },
    });

    useEffect(() => {
        if (params.id) {
            setKelasId(params.id);
        }

        if (kelasDetail == initialData && kelasId) {
            getDetail();
        }

        setArticles(getArticles?.list);
    }, [kelasId, params, getArticles]);

    return (
        <>
            <Row>
                <Col span={12} style={{marginBottom: '1rem'}}>
                    <Title style={{fontSize: '2rem'}}>{kelasDetail?.name}</Title>
                </Col>
                {articles?.map((item, index) => (
                    <Col span={12} className="mb-3">
                        <ArticleCard data={item} key={index} refetch={getArticles}/>
                    </Col>
                ))}
            </Row>
            <div className="fixed right-10 bottom-10 z-[99]">
                <Tooltip
                    content="Post Article"
                    destroyOnClose
                    showArrow
                    theme="default"
                >
                    <Button
                        shape="circle"
                        icon={<AddIcon/>}
                        size={'large'}
                        onClick={() => setShowForm(true)}
                    />
                </Tooltip>
            </div>

            {!getArticles?.isLoading && getArticles?.list?.length === 0 && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-gray-500">Belum ada artikel yang di publish</p>
                </div>
            )}

            {getArticles?.isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-[999]">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"/>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <ArticleForm
                    setVisible={setShowForm}
                    kelasId={kelasId}
                    params={getArticles}
                />
            )}
        </>
    );
}

import {Button, Dialog, Textarea, Select, Row, Col} from "tdesign-react";
import Form from "@/components/form.tsx";
import Input from "@/components/input.tsx";
import {useState, ChangeEvent} from "react";
import FormItem from "tdesign-react/es/form/FormItem";
import {AddIcon} from "tdesign-icons-react";
import {postData} from "@/utils/axios.ts";
import FetchAPI from "@/utils/fetch-api.ts";

interface MediaItem {
    urlFile: string
    type: string
}

interface ArticleFormProps {
    setVisible: (visible: boolean) => void
    kelasId?: any
    params?: any
}

const mediaTypes = [
    {label: 'Image', value: 'IMAGE'},
    {label: 'Video', value: 'VIDEO'},
    {label: 'Document', value: 'DOCUMENT'},
];

export default function ArticleForm({
                                        setVisible,
                                        kelasId,
                                        params
                                    }: ArticleFormProps) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [media, setMedia] = useState<MediaItem[]>([{urlFile: '', type: 'image'}]);

    const handleAddMedia = () => {
        setMedia([...media, {urlFile: '', type: 'image'}]);
    };

    const handleMediaChange = (index: number, key: keyof MediaItem, value: any) => {
        const newMedia = [...media];
        newMedia[index][key] = value;
        setMedia(newMedia);
    };

    const handleUrlChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        handleMediaChange(index, 'urlFile', e.target.value);
    };

    const handleTypeChange = (index: number, type: string) => {
        handleMediaChange(index, 'type', type);
    };

    const handleSubmit = () => {
        setLoading(true);

        FetchAPI(postData('user/kelas/article/insert', {title, description, media, kelasId}))
            .then(() => {
                params.refresh()
                setVisible(false);
                setLoading(false);
            })
            .finally(() => {
                params.refresh()
                setLoading(false);
            });
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Dialog
            header={'Post Article'}
            visible
            onClose={handleClose}
            className="w-[1200px]"
            footer={null}
        >
            <Form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <Input
                    title="Judul Artikel"
                    name="title"
                    type="text"
                    validation={{
                        required: 'Judul artikel harus diisi',
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <FormItem
                    initialData=""
                    label="Description"
                    name="description"
                    labelAlign={'top'}
                >
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e)}
                    />
                </FormItem>
                <div className="flex flex-col justify-end gap-2">
                    <div>
                        {media.map((item, index) => (
                            <Row key={index} gutter={4}>
                                <Col span={6}>
                                    <Input
                                        title="Media URL"
                                        name={`mediaUrl_${index}`}
                                        type="text"
                                        value={item.urlFile}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleUrlChange(index, e)}
                                    />
                                </Col>
                                <Col span={6}>
                                    <FormItem
                                        label="Media Type"
                                        labelAlign={'top'}
                                    >
                                        <Select
                                            value={item.type}
                                            options={mediaTypes}
                                            className={`border border-gray-300 rounded-md py-1.5`}
                                            onChange={(value) => {
                                                handleTypeChange(index, value as string)
                                            }}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                        ))}
                    </div>
                    <Button onClick={handleAddMedia} icon={<AddIcon/>}>Media</Button>
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

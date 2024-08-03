import {Comment, List} from 'tdesign-react';
import {parseToDayjs} from "tdesign-react/es/_common/js/date-picker/format";

const {ListItem} = List;

type CommentListProps = {
    data?: any[]
}

export default function CommentList({
                                        data
                                    }: CommentListProps) {
    const avatar = 'https://tdesign.gtimg.com/site/avatar.jpg'

    return (
        <List split={false}>
            {data?.map((item) => (
                <ListItem key={item.id} className="px-0 py-1">
                    <Comment
                        className="rounded-2xl rounded-bl-none bg-gray-50 py-2 px-2 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center text-sm w-auto"
                        avatar={avatar}
                        author={item.User.name}
                        datetime={parseToDayjs(item.createdAt, 'YYYY-MM-DD HH:mm').toString()}
                        content={item.comment}
                    />
                </ListItem>
            ))}
        </List>
    );
}

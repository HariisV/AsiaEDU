import { imageLink } from '@/utils/image-link';
import moment from 'moment';
import { Avatar, Comment, List } from 'tdesign-react';

const { ListItem } = List;

type CommentListProps = {
  data?: any[];
};

export default function CommentList({ data }: CommentListProps) {
  return (
    <List split={false}>
      {data?.map((item) => (
        <ListItem key={item.id} className="px-0 py-1">
          <Comment
            className="rounded-2xl rounded-bl-none w-full bg-gray-50 py-2 px-2 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center text-sm"
            avatar={
              <Avatar
                size="40px"
                image={imageLink(item?.User?.gambar)}
              ></Avatar>
            }
            author={item.User.name}
            datetime={moment(item.createdAt).fromNow()}
            content={item.comment}
          />
        </ListItem>
      ))}
    </List>
  );
}

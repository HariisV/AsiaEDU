import TableWrapper from '@/components/table';
import useGetList from '@/hooks/use-get-list';
import { IconBan, IconCheck, IconPlus } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { Avatar, Button, Popconfirm } from 'tdesign-react';
import BreadCrumb from '@/components/breadcrumb';
import ManageKelas from './manage';
import { patchData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { imageLink } from '@/utils/image-link';

enum FilterType {
  Input = 'input',
}
enum AlignType {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export default function ArtikelIndex() {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const dataKelas = useGetList({
    url: 'admin/kelas/article/get',
    initialParams: {
      skip: 0,
      take: 10,
    },
  });
  const handleUpdate = async (id: number) => {
    FetchAPI(
      patchData(`admin/kelas/article/update`, {
        id,
      })
    ).then(() => {
      dataKelas.refresh();
    });
  };
  const columns = [
    {
      colKey: 'applicant',
      title: '#',
      width: 60,
      cell: (row: any) => {
        return <span>{row.rowIndex + 1 * dataKelas.params.skip + 1}</span>;
      },
    },
    {
      title: 'Judul',
      colKey: 'title',
      filter: {
        type: FilterType.Input,
        resetValue: '',
        confirmEvents: ['onEnter'],
        props: { placeholder: 'Input title' },
        showConfirmAndReset: true,
      },
    },
    {
      title: 'Kelas',
      colKey: 'Kelas.name',
    },
    {
      title: 'Dibuat Oleh',
      colKey: 'created_by',
      cell: ({ row }: any) => (
        <span>
          {' '}
          <Avatar
            size="20px"
            image={imageLink(row.User?.gambar)}
            className="mr-3"
          />
          {row.User?.name}
        </span>
      ),
    },
    {
      title: 'Like',
      align: AlignType.Center,
      colKey: '_count.like',
    },
    {
      title: 'Komentar',
      align: AlignType.Center,
      colKey: '_count.comment',
    },
    {
      title: 'Dibuat Pada',
      colKey: 'created_at',
      width: 150,
      sorter: true,
      cell: ({ row }: any) => {
        return <span>{moment(row.createdAt).format('DD/MM/YYYY')}</span>;
      },
    },
    {
      title: 'Action',
      align: AlignType.Center,
      colKey: 'action',
      width: 150,

      cell: ({ row }: any) => {
        return (
          <div className="flex justify-center gap-5">
            <Popconfirm
              content="Apakah kamu yakin ?"
              theme="danger"
              onConfirm={() => handleUpdate(row.id)}
            >
              {row.isApprove ? (
                <Button shape="circle" theme="danger">
                  <IconBan size={14} />
                </Button>
              ) : (
                <Button shape="circle" theme="success">
                  <IconCheck size={14} />
                </Button>
              )}
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <section className="">
      {visible && (
        <ManageKelas
          setDetail={setDetail}
          params={dataKelas}
          setVisible={setVisible}
          detail={detail}
        />
      )}
      <BreadCrumb page={[{ name: 'Manage Kelas', link: '/manage-kelas' }]} />
      <div className="bg-white p-8 rounded-2xl min-w-[400px]">
        <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full">
          <div className="title border-b border-[#ddd] w-full flex justify-between">
            <h1 className="text-2xl text-indigo-950 font-bold mb-5 ">
              Manage Artikel
            </h1>
            <div className="flex gap-3">
              <Button
                theme="default"
                size="large"
                className="border-success hover:bg-success hover:text-white group hover:shadow-xl"
                onClick={() => setVisible(true)}
              >
                <IconPlus
                  size={20}
                  className="text-success group-hover:text-white"
                />
              </Button>
            </div>
          </div>
        </div>
        <TableWrapper data={dataKelas} columns={columns} />
      </div>
    </section>
  );
}

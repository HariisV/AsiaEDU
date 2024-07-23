import TableWrapper from '@/components/table';
import useGetList from '@/hooks/use-get-list';
import { IconApps, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Button, Popconfirm, Popup } from 'tdesign-react';
import ManagePaketSoal from './manage';
import FetchAPI from '@/utils/fetch-api';
import { deleteData, getData } from '@/utils/axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '@/components/breadcrumb';
import toast from 'react-hot-toast';

enum FilterType {
  Input = 'input',
}

enum AlignType {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export default function ManageSoalPaketLatihan() {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});
  const [detailKategori, setDetailKategori] = useState({
    nama: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const getList = useGetList({
    url: 'admin/paket-latihan-soal/get',
    initialParams: {
      skip: 0,
      take: 10,
      sortBy: 'createdAt',
      descending: true,
      paketLatihanId: id,
    },
  });

  const handleDeleted = async (id: number) => {
    FetchAPI(deleteData(`admin/paket-latihan-soal/remove/${id}`)).then(() => {
      getList.refresh();
    });
  };

  const columns = [
    {
      colKey: 'applicant',
      title: '#',
      width: 60,
      cell: (row: any) => {
        return <span>{row.rowIndex + 1 * getList.params.skip + 1}</span>;
      },
    },

    {
      title: 'Name',
      colKey: 'nama',
      filter: {
        type: FilterType.Input,
        resetValue: '',
        confirmEvents: ['onEnter'],
        props: { placeholder: 'Input Nama' },
        showConfirmAndReset: true,
      },
      cell: ({ row }: any) => {
        return <span>{row.bankSoalCategory?.nama}</span>;
      },
    },

    {
      title: 'Jumlah Soal',
      colKey: 'jumlahSoal',
      align: AlignType.Center,
      width: 150,
      cell: ({ row }: any) => {
        return <span>{row.bankSoalCategory?._count?.BankSoal}</span>;
      },
    },
    {
      title: 'Tanggal Dibuat',
      colKey: 'createdAt',
      sorter: true,
      cell: ({ row }: any) => {
        return <span>{moment(row.createdAt).format('DD/MM/YYYY')}</span>;
      },
    },
    {
      title: 'Action',
      align: AlignType.Center,
      colKey: 'action',
      cell: ({ row }: any) => {
        return (
          <div className="flex justify-center gap-5">
            <Popup content="Manage Bank Soal" trigger="hover">
              <Button
                shape="circle"
                theme="primary"
                onClick={() => {
                  navigate(`/manage-soal/${row.bankSoalCategory?.id}`);
                }}
              >
                <IconApps size={14} />
              </Button>
            </Popup>
            <Popconfirm
              content="Apakah kamu yakin ?"
              theme="danger"
              onConfirm={() => handleDeleted(row.id)}
            >
              <Button shape="circle" theme="danger">
                <IconTrash size={14} />
              </Button>{' '}
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getDetail = async () => {
    getData(`admin/paket-latihan/find/${id}`).then((res) => {
      setDetailKategori(res);

      if (!res.id) {
        toast.error('Data tidak ditemukan');
        navigate('/manage-paket');
      }
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <section className="">
      {visible && (
        <ManagePaketSoal
          setDetail={setDetail}
          params={getList}
          setVisible={setVisible}
          detail={detail}
        />
      )}
      <BreadCrumb
        page={[
          { name: 'Paket Latihan', link: '/manage-latihan' },
          {
            name: detailKategori?.nama || 'Dashboard Detail',
            link: '/admin/manage-paket',
          },
        ]}
      />

      <div className="bg-white p-8 rounded-2xl min-w-[400px]">
        <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full mt-2">
          <div className="title border-b border-[#ddd] w-full flex justify-between">
            <h1 className="text-xl text-indigo-950 font-bold mb-5 ">
              Manage Paket latihan soal
            </h1>
            <Button
              theme="default"
              size="large"
              className="border-success hover:bg-success hover:text-white group"
              onClick={() => setVisible(true)}
            >
              <IconPlus
                size={20}
                className="text-success group-hover:text-white"
              />
            </Button>
          </div>
        </div>
        <TableWrapper data={getList} columns={columns} />
      </div>
    </section>
  );
}

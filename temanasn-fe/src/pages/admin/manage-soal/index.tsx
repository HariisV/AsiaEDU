import { useEffect, useState } from 'react';
import Input from '@/components/input';
import {
  IconFileSpreadsheet,
  IconPencil,
  IconPlus,
  IconTableImport,
  IconTrash,
} from '@tabler/icons-react';
import { Alert, Button, Dialog, Upload } from 'tdesign-react';
import { useParams } from 'react-router-dom';
import FetchAPI from '@/utils/fetch-api';
import {
  deleteData,
  getData,
  getExcel,
  patchData,
  postData,
} from '@/utils/axios';
import FormCreate from './FormCreate';
import BreadCrumb from '@/components/breadcrumb';
import { imageLink } from '@/utils/image-link';
import { useAuthStore } from '@/stores/auth-store';
import CKeditor from '@/components/ckeditor';

const DEFAULT_FORM = {
  soal: '',
  pembahasan: '',
  jawaban: [
    {
      jawaban: '',
      point: 0,
      id: 0,
    },
    {
      jawaban: '',
      point: 0,
      id: 1,
    },
    {
      jawaban: '',
      point: 0,
      id: 2,
    },
    {
      jawaban: '',
      point: 0,
      id: 3,
    },
  ],
};

interface JawabanItem {
  jawaban: string;
  point: number;
  id: number;
  isDeleted?: boolean; // Add this line to define the property
}

interface ValueState {
  soal: string;
  pembahasan: string;
  jawaban: JawabanItem[];
}
interface OutputObject {
  isChecked: string;
  [key: string]: string | boolean | undefined; // Add an index signature
}

export default function ManageSoal() {
  const { id } = useParams();
  const [idRender, setIdRender] = useState(0);
  const [detail, setDetail] = useState({
    nama: '',

    parentCategoryId: 0,
    BankSoal: [],
  });
  const [editId, setEditId] = useState(false);

  const [value, setValue] = useState<ValueState>(DEFAULT_FORM);

  const getDetail = async () => {
    getData(`admin/bank-soal-kategori/find/${id}`).then((res) => {
      setDetail(res);
      setIdRender(idRender + 1);
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const [parent, setParent] = useState<any>({});

  const getParent = async () => {
    getData(
      `admin/bank-soal-parent-kategori/find/${detail?.parentCategoryId}`
    ).then((res) => {
      setParent(res);
    });
  };

  useEffect(() => {
    if (detail.parentCategoryId) {
      getParent();
    }
  }, [detail]);
  const hapusSoal = async (idSoal: number) => {
    FetchAPI(deleteData(`admin/bank-soal/remove/${idSoal}`)).then(() => {
      getDetail();
    });
  };
  const hapusJawaban = (index: number) => {
    setValue((prev: any) => ({
      ...prev,
      jawaban: prev.jawaban.map((item: any) => {
        if (item.id === index) {
          return {
            ...item,
            isDeleted: true,
          };
        }
        return item;
      }),
    }));
  };
  const tambahJawaban = () => {
    setValue((prev: any) => ({
      ...prev,
      jawaban: [
        ...prev.jawaban,
        {
          jawaban: '',
          point: 0,
          id: prev.jawaban.length + 1,
        },
      ],
    }));
  };
  function convertObjToAnswer(obj: any) {
    const jawabanArray = [];

    for (const key in obj) {
      if (key.startsWith('value-')) {
        const id = key.split('-')[1];
        const status = value.jawaban.find((item: any) => item.id == id);
        const jawabanObj = {
          id: parseInt(id),
          value: obj[key],
          isCorrect: obj[`isChecked`] == id,
          point: parseInt(obj[`point-${id}`]) || 0,
          isUpdate: obj[`isUpdated-${id}`] || false,
          isDeleted: status?.isDeleted || false,
        };
        jawabanArray.push(jawabanObj);
      }
    }

    return jawabanArray;
  }
  function convertArrayToObject(jawabanArray: any, isUpdated: boolean) {
    const outputObject: OutputObject = {
      isChecked: '',
    };

    jawabanArray.forEach((jawaban: any) => {
      const jawabanKey = `value-${jawaban.id}`;
      const pointKey = `point-${jawaban.id}`;
      const idKey = `id-${jawaban.id}`;
      const isUpdateKey = `isUpdated-${jawaban.id}`;

      outputObject[jawabanKey] = jawaban.jawaban;
      outputObject[pointKey] = jawaban.point?.toString();
      outputObject[idKey] = jawaban.id;

      if (isUpdated) outputObject[isUpdateKey] = true;

      if (jawaban.isCorrect) {
        outputObject.isChecked = jawaban.id?.toString();
      }
    });

    return outputObject;
  }

  const onSubmit = async (data: any) => {
    const payload = {
      categoryId: id,
      soal: data.soal,
      pembahasan: data.pembahasan,
      jawaban: convertObjToAnswer(data),
      subCategory: data.subcategory,
    };

    FetchAPI(
      editId === true
        ? postData(`admin/bank-soal/insert`, payload)
        : patchData(`admin/bank-soal/update/${editId}`, payload)
    ).then(() => {
      getDetail();
      setEditId(false);
      setValue(DEFAULT_FORM);
    });
  };

  const handleExportExcel = async () => {
    await getExcel(
      `admin/bank-soal/export/${id}`,
      `Bank Soal - ${detail?.nama}`
    );
  };

  const [showModal, setShowModal] = useState(false);

  const token = useAuthStore.getState().token
    ? useAuthStore.getState().token
    : '';

  const [uploadStatus, setUploadStatus] = useState({
    status: '',
    erorrList: [],
  });

  return (
    <>
      <div className=" flex justify-center">
        <Dialog
          visible={showModal}
          header="Import Soal"
          onClose={() => setShowModal(false)}
          className="w-[800px]"
          footer={null}
        >
          <ol className="list-decimal list-inside">
            <li>
              <a
                href={imageLink('public/soal.xlsx')}
                className="text-blue-500"
                download
              >
                Download template
              </a>{' '}
              excel
            </li>
            <li>Isi data sesuai dengan template</li>
            <li>Upload Kembali file excel</li>
          </ol>

          <Upload
            showUploadProgress
            className="mt-4 mb-2"
            theme="file"
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            useMockProgress
            action={imageLink(`api/admin/bank-soal/import/${id}`)}
            method="POST"
            files={[]}
            onSuccess={() => {
              getDetail();
              setUploadStatus({
                status: 'SUCCESS',
                erorrList: [],
              });
            }}
            onFail={(res: any) => {
              setUploadStatus({
                status: 'ERROR',
                erorrList: JSON.parse(res.XMLHttpRequest?.responseText)?.error,
              });
            }}
          />
          {uploadStatus.status === 'ERROR' && (
            <Alert
              theme="error"
              message={
                <ol className=" list-disc list-inside">
                  {uploadStatus.erorrList.map((item: any) => (
                    <li>{item}</li>
                  ))}
                </ol>
              }
            />
          )}

          {uploadStatus.status === 'SUCCESS' && (
            <Alert theme="success" message="Berhasil Melakukan Import" />
          )}
        </Dialog>
        <div className="p-8 pt-2 rounded-2xl max-w-5xl w-full ">
          <BreadCrumb
            page={[
              { name: 'Bank Soal', link: '/manage-soal-category' },
              {
                name: parent?.nama || 'Category',
                link: `/manage-soal-subcategory/${detail?.parentCategoryId}`,
              },
              {
                name: detail?.nama || 'Manage Soal',
                link: '#',
              },
            ]}
          />
          <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full mb-5">
            <div className="title border-b border-[#ddd] w-full flex justify-between">
              <h1 className="text-xl text-indigo-950 font-bold mb-5 ">
                Manage Soal
              </h1>
              <div className="flex gap-3">
                <Button
                  theme="success"
                  size="medium"
                  variant="dashed"
                  onClick={handleExportExcel}
                  className="hover:shadow-xl"
                >
                  <IconTableImport size={20} className="" />
                </Button>
                <Button
                  theme="primary"
                  size="medium"
                  variant="dashed"
                  onClick={() => setShowModal(true)}
                  className="hover:shadow-xl"
                >
                  <IconFileSpreadsheet size={20} className="" />
                </Button>
              </div>
            </div>
          </div>
          <div className="" key={idRender}>
            {detail?.BankSoal?.map((item: any, index: number) => {
              if (editId == item.id) {
                return (
                  <FormCreate
                    value={value}
                    setValue={setValue}
                    onSubmit={onSubmit}
                    editId={editId}
                    tambahJawaban={tambahJawaban}
                    hapusJawaban={hapusJawaban}
                  />
                );
              }
              return (
                <div key={index} className=" p-10 rounded-xl mb-5 bg-white ">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">
                      Pertanyaan No. {index + 1}{' '}
                      {item.subCategory ? ` | ${item.subCategory}` : ''}
                    </div>
                    <div className="">
                      <button
                        type="button"
                        className="px-3 text-sm text-blue-600 font-semibold h-fit "
                        onClick={() => {
                          setValue(() => ({
                            ...convertArrayToObject(item.BankSoalJawaban, true),
                            soal: item.soal,
                            pembahasan: item.pembahasan,
                            jawaban: Array.from(item.BankSoalJawaban),
                            subcategory: item.subCategory,
                          }));
                          setEditId(item.id);
                        }}
                      >
                        <IconPencil />
                      </button>
                      <button
                        type="button"
                        className="px-3 text-sm text-red-600 font-semibold h-fit "
                        onClick={() => hapusSoal(item.id)}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                  <CKeditor content={item.soal} readOnly />
                  <div className="text-sm text-gray-600 mt-4 mb-4">
                    Jawaban:{' '}
                  </div>
                  {item.BankSoalJawaban.map((jawaban: any, index: number) => (
                    <div key={index} className="flex  mb-2">
                      <Input
                        name={`isChecked-${item.id}`}
                        value={index}
                        containerClass=" mr-1 w-6 mt-1"
                        type="radio"
                        disabled
                        defaultChecked={jawaban.isCorrect}
                      />

                      <p className="mr-2 w-[10px] ">
                        {String.fromCharCode(65 + index)}.{' '}
                      </p>
                      <div className="w-10/12 mr-4 self-start">
                        <CKeditor content={jawaban.jawaban} readOnly />
                      </div>

                      <div className="w-1/12 h-full text-right">
                        {jawaban.point}
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-gray-600 mt-4">Pembahasan: </div>
                  <CKeditor content={item.pembahasan} readOnly />
                </div>
              );
            })}
          </div>

          {editId === true && (
            <FormCreate
              value={value}
              setValue={setValue}
              onSubmit={onSubmit}
              tambahJawaban={tambahJawaban}
              hapusJawaban={hapusJawaban}
            />
          )}

          <div className="flex justify-center mt-10">
            <Button
              theme="success"
              variant="outline"
              disabled={editId !== false}
              onClick={() => setEditId(true)}
            >
              <IconPlus size={20} />
              Tambah Soal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

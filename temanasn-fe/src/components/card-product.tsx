import { imageLink } from '@/utils/image-link';

export default function CardProduct({ setVisible, item, setItemDetail }: any) {
  return (
    <div className="relative flex w-full flex-col rounded-xl bg-white h-fit bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
        <img src={imageLink(item?.gambar)} alt={item?.nama} />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h5 className="block font-sans text-2xl  w-full mt-4 text-center font-semibold antialiased leading-snug tracking-normal text-blue-gray-900">
            {item?.name}
          </h5>
        </div>
      </div>
      <div className="p-6 pt-3">
        <button
          className="block w-full select-none rounded-lg bg-primary py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled={item?._count?.KelasUser}
          onClick={() => {
            setVisible(true);
            setItemDetail(item);
          }}
        >
          {item?._count?.KelasUser ? 'Telah Bergabung' : 'Gabung!'}
        </button>
      </div>
    </div>
  );
}

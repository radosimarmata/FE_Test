import { useState } from "react";
import { Table, Pagination, ActionIcon, Button, Modal, Image, TextInput, FileInput, rem, Text  } from '@mantine/core';
import { PencilSquareIcon, EyeIcon, TrashIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Case from "../components/Case";
import Navbar from "../components/Navbar";
import RuasService from "../services/ruas.services";
import unit_kerjaServices from "../services/unit_kerja.services";

const RuasAll = await RuasService.getRuasAll(1,5);
const unitkerja = await unit_kerjaServices.get();
export default function MasterData() {
  const [activePage, setPage] = useState(RuasAll.current_page);
  const [ruas_id, setRuasID] = useState("");
  const [ruas_name, setRuas] = useState("");
  const [unit_id, setUnitId] = useState("");
  const [unit_kerja, setUnitKerja] = useState();
  const [km_awal, setKmawal] = useState("");
  const [km_akhir, setKmakhir] = useState("");
  const [status, setStatus] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [dokumentUrl, setDokumenUrl] = useState("");
  const [isOpenFoto, setOpenFoto] = useState(false);
  const [isView, setView] = useState(false);
  const [isDelete, setDelete] = useState(false);


  const rows = (RuasAll.data).map((e:any) => (
    <tr key={e.id}>
      <td className="text-center">{e.id}</td>
      <td className="text-center">{e.ruas_name}</td>
      <td className="text-center">{e.km_awal} s/d {e.km_akhir}</td>
      <td className="text-center">
        <Button variant="light" radius="md" compact 
          onClick={()=>{
            setRuas(e.ruas_name);
            setFotoUrl(e.photo_url);
            setOpenFoto(true);
        }}>
          Lihat
        </Button>
      </td>
      <td className="text-center"><Button variant="light" radius="md" compact>
            Download
          </Button>
      </td>
      <td className="text-center">{e.unit_id}</td>
      <td className="text-center">{e.status == 1 ? "Aktif" : "Tidak Aktif"}</td>
      <td className="flex justify-center">
          <ActionIcon variant="transparent"><PencilSquareIcon/></ActionIcon>
          <ActionIcon variant="transparent" onClick={()=>{
            setView(true);
            setRuas(e.ruas_name);
            setUnitId(e.unit_id);
            setStatus(e.status);
            (unitkerja.data).map((element : any)=>{
              if(element.id == e.unit_id)setUnitKerja(element.unit);
            })
            setKmawal(e.km_awal);
            setKmakhir(e.km_akhir);
            setFotoUrl(e.photo_url);
            setDokumenUrl(e.doc_url);

          }}><EyeIcon/></ActionIcon>
          <ActionIcon variant="transparent" onClick={()=>{
            setDelete(true);
            setRuas(e.ruas_name);
            setRuasID(e.id);
          }}><TrashIcon/></ActionIcon>
      </td>
    </tr>
  ));

  return (
    <Case>
      <Navbar />
      <Modal opened={isOpenFoto} onClose={()=>{setOpenFoto(false)}} title={ruas_name}>
        <Image maw={240} mx="auto" radius="md" src={fotoUrl} alt={ruas_name} />
      </Modal>

      <Modal opened={isDelete} onClose={()=>{setDelete(false)}} title="Konfirmasi Hapus Ruas" >
        <Text>Apakah anda yakin ingin menghapus {ruas_name} ?</Text>
        <div className="flex justify-center ps-6 pe-6 pt-6">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-6 me-6" onClick={()=>setDelete(false)}>
            Tidak
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-6 me-6" onClick={async ()=>{
            await RuasService.deleteRuas(ruas_id).then(
              () => {
                window.location.reload(true);
              },
              (error) => {
                alert(error.response.data.message);
              });
          }}>
            Ya
          </button>
        </div>
      </Modal>

      <Modal opened={isView} onClose={()=>{setView(false)}} title="Detail Ruas">
        <TextInput
        label="Ruas*"
        placeholder="Ruas"
        value={ruas_name}
        readOnly
        />
        <TextInput
        label="Ruas*"
        placeholder="Ruas"
        value={unit_kerja}
        readOnly
        />
      <FileInput label="Foto*" placeholder={fotoUrl.split("/").pop()} icon={<ArrowUpTrayIcon size={rem(15)} />}  readOnly/>
      <FileInput label="Dokumen *" placeholder={dokumentUrl.split("/").pop()} icon={<ArrowUpTrayIcon size={rem(15)} />} readOnly/>
      <TextInput
        label="Panjang (km)*"
        placeholder="Panjang (km)"
        value={ruas_name}
        readOnly
        />
      <TextInput
        label="Km awal*"
        placeholder="Panjang (km)"
        value={km_awal}
        readOnly
        />
      <TextInput
        label="Km akhir*"
        placeholder="Panjang (km)"
        value={km_akhir}
        readOnly
        />
      <TextInput
        label="Status*"
        placeholder="Status"
        value={status == 1? "Aktif" : "Tidak Aktif"}
        readOnly
        />

      </Modal>
      <div className="container mx-auto">
      <div className="m-3">
        <p className="text-lg leading-relaxed text-black">
          Master Data Ruas
        </p>
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>No</th>
              <th>Ruas</th>
              <th>Lokasi</th>
              <th>Foto</th>
              <th>Document</th>
              <th>Unit Kerja</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
        <Pagination value={activePage} size="sm" onChange={setPage} total={RuasAll.total} />

      </div>


    </Case>
  );
}

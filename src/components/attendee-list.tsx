import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { attendees } from "../data/attendees";
import { useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList(){
  const [searCh, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const totalPage = Math.ceil(attendees.length / 10)
  function goToFirstPage(){
    setPage(1)
  }

  function goToLastPage(){
    setPage(totalPage)
  }
  function goToPreviousPage(){
    setPage(page - 1)
  }
  function goToNextPage(){
    setPage(page + 1)
  }
  return(
   <div className="flex flex-col gap-4">
     <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
        <Search className="size-4 text-emerald-300"/>
        <input className="bg-transparent flex-1 border-0 outline-none p-0" placeholder="Buscar participantes..."/>
      </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10 ">
            <TableHeader style={{width: 48}}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{width: 64}}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
            <TableRow key={attendee.id}>
            <TableCell> 
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400"  />
            </TableCell>
            <TableCell>{attendee.id}</TableCell>
            <TableCell> 
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">{attendee.name}</span>
                <span>{attendee.email}</span>
              </div>
            </TableCell>
            <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
            <TableCell>{dayjs().to(attendee.checkdInAt)}</TableCell>
            <TableCell>
              <IconButton transparent>
                <MoreHorizontal className="size-4"/>
              </IconButton>
            </TableCell>
          </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
             <div className="inline-flex items-center gap-8">
             <span> Página {page} de {totalPage}</span>
              <div className="flex gap-1.5">
               <IconButton onClick={goToFirstPage} disabled={page === 1}>
                  <ChevronsLeft className="size-4"/>
                </IconButton>
               <IconButton onClick={goToPreviousPage}  disabled={page === 1}>
                  <ChevronLeft className="size-4"/>
                </IconButton>
               <IconButton onClick={goToNextPage}  disabled={page === totalPage}>
                  <ChevronRight className="size-4"/>
                </IconButton>
               <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                  <ChevronsRight className="size-4"/>
                </IconButton>
              </div>
             </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
   </div>
  )
}
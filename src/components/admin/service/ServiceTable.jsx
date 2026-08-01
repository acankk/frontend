import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Pencil, Trash2 } from "lucide-react";

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Gambar</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Deskripsi</TableHead>
            <TableHead className="text-right text-white">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-white/60"
              >
                Belum ada service.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow
                key={service.id}
                className="hover:bg-violet-500/30"
              >
                <TableCell>
                  {service.id}
                </TableCell>

                <TableCell>
                  {service.gambar ? (
                    <img
                      src={service.gambar}
                      alt={service.nama}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-white/5 flex items-center justify-center text-xs text-white/40">
                      No Image
                    </div>
                  )}
                </TableCell>

                <TableCell className="font-medium">
                  {service.nama}
                </TableCell>

                <TableCell className="max-w-sm truncate">
                  {service.deskripsi}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(service)}
                      className="hover:text-violet-400 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(service.id)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
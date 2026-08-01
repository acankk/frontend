import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import { getImageUrl } from "@/utils/image";

export default function MemberTable({
  members,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
      <Table>

        <TableHeader className="bg-white/5">
          <TableRow>

            <TableHead className="text-white">
              ID
            </TableHead>

            <TableHead className="text-white">
              Photo
            </TableHead>

            <TableHead className="text-white">
              Nama
            </TableHead>

            <TableHead className="text-white">
              Role
            </TableHead>

            <TableHead className="text-white">
              Harga
            </TableHead>

            <TableHead className="text-white">
              Status
            </TableHead>

            <TableHead className="text-right text-white">
              Aksi
            </TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>

          {members.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={7}
                className="text-center py-10 text-white/60"
              >
                Belum ada member.
              </TableCell>

            </TableRow>

          ) : (

            members.map((member) => (

              <TableRow
                key={member.id}
                className="hover:bg-violet-500/30"
              >

                <TableCell>
                  {member.id}
                </TableCell>

                <TableCell>
                  <img
                    src={getImageUrl(member.foto)}
                    alt={member.nama}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {member.nama}
                </TableCell>

                <TableCell>
                  {member.jabatan}
                </TableCell>

                <TableCell>
                  Rp{" "}
                  {Number(
                    member.starting_price
                  ).toLocaleString("id-ID")}
                </TableCell>

                <TableCell>

                  <span
                    className={`text-sm font-medium ${
                      member.is_available
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {member.is_available
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </TableCell>

                <TableCell>

                  <div className="flex justify-end gap-3">

                    <button
                      onClick={() => onEdit(member)}
                      className="hover:text-violet-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(member.id)}
                      className="hover:text-red-500"
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
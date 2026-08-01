import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Pencil, Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/image";

export default function TeamTable({
  teams,
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
              Logo
            </TableHead>

            <TableHead className="text-white">
              Nama
            </TableHead>

            <TableHead className="text-white">
              Harga Mulai
            </TableHead>

            <TableHead className="text-white">
              Member
            </TableHead>

            <TableHead className="text-white">
              Deskripsi
            </TableHead>

            <TableHead className="text-right text-white">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-white/60"
              >
                Belum ada team.
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow
                key={team.id}
                className="hover:bg-violet-500/30"
              >
                <TableCell>
                  {team.id}
                </TableCell>

                <TableCell>
                  <img
                    src={getImageUrl(team.logo)}
                    alt={team.nama}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {team.nama}
                </TableCell>

                <TableCell>
                  Rp{" "}
                  {Number(
                    team.starting_price
                  ).toLocaleString("id-ID")}
                </TableCell>

                <TableCell>
                  {team.member_count}
                </TableCell>

                <TableCell className="max-w-sm truncate">
                  {team.deskripsi}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(team)}
                      className="hover:text-violet-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(team.id)
                      }
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
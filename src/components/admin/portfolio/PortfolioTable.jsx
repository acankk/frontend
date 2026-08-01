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

export default function PortfolioTable({
  portfolios,
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
              Gambar
            </TableHead>

            <TableHead className="text-white">
              Judul
            </TableHead>

            <TableHead className="text-white">
              Service
            </TableHead>

            <TableHead className="text-white">
              Team
            </TableHead>

            <TableHead className="text-white">
              Member
            </TableHead>

            <TableHead className="text-white">
              Demo
            </TableHead>

            <TableHead className="text-right text-white">
              Aksi
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {portfolios.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={8}
                className="text-center py-10 text-white/60"
              >
                Belum ada portfolio.
              </TableCell>

            </TableRow>

          ) : (

            portfolios.map((portfolio) => (

              <TableRow
                key={portfolio.id}
                className="hover:bg-violet-500/30"
              >

                <TableCell>
                  {portfolio.id}
                </TableCell>

                <TableCell>

                  <img
                    src={getImageUrl(portfolio.gambar)}
                    alt={portfolio.judul}
                    className="w-16 h-12 object-cover rounded-lg"
                  />

                </TableCell>

                <TableCell className="font-medium">
                  {portfolio.judul}
                </TableCell>

                <TableCell>
                  {portfolio.jasa_nama}
                </TableCell>

                <TableCell>
                  {portfolio.team_nama}
                </TableCell>

                <TableCell>
                  {portfolio.member_nama || "-"}
                </TableCell>

                <TableCell>

                  {portfolio.demo_url ? (

                    <a
                      href={portfolio.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      Demo
                    </a>

                  ) : (

                    "-"

                  )}

                </TableCell>

                <TableCell>

                  <div className="flex justify-end gap-3">

                    <button
                      onClick={() =>
                        onEdit(portfolio)
                      }
                      className="hover:text-violet-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(portfolio.id)
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
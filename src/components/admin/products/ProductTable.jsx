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

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Thumbnail</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Harga</TableHead>
            <TableHead className="text-white">Tech</TableHead>
            <TableHead className="text-white">Deskripsi</TableHead>
            <TableHead className="text-right text-white">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-white/60"
              >
                Belum ada produk.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-violet-500/30"
              >
                <TableCell>{product.id}</TableCell>

                <TableCell>
                  <img
                    src={getImageUrl(product.thumbnail)}
                    alt={product.nama}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {product.nama}
                </TableCell>

                <TableCell>
                  Rp{" "}
                  {Number(product.harga).toLocaleString("id-ID")}
                </TableCell>

                <TableCell>
                  {product.tech}
                </TableCell>

                <TableCell className="max-w-sm truncate">
                  {product.deskripsi}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="hover:text-violet-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(product.id)
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
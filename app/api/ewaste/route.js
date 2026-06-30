import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =========================
// GET → Ambil semua data
// =========================
export async function GET() {
  const data = await prisma.ewasteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(data);
}

// =========================
// POST → Tambah data
// =========================
export async function POST(request) {
  const body = await request.json();

  const newData = await prisma.ewasteRequest.create({
    data: {
      jenis: body.jenis,
      jumlah: parseInt(body.jumlah),
      lokasi: body.lokasi,
    },
  });

  return NextResponse.json(newData);
}

// =========================
// PATCH → Update status
// =========================
export async function PATCH(request) {
  const body = await request.json();

  const updated = await prisma.ewasteRequest.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(updated);
}

// DELETE → Hapus berdasarkan ID
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID wajib diisi" },
      { status: 400 }
    );
  }

  await prisma.ewasteRequest.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ message: "Data berhasil dihapus" });
}

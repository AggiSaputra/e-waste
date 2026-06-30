export default function History() {
  return (
    <div className="container-page">
      <h1 className="section-title">
        Riwayat Limbah
      </h1>

      <div className="space-y-4">
        <div className="card flex justify-between items-center">
          <span>Laptop Rusak</span>
          <span className="badge badge-success">
            Selesai
          </span>
        </div>

        <div className="card flex justify-between items-center">
          <span>Handphone Mati</span>
          <span className="badge badge-info">
            Diproses
          </span>
        </div>
      </div>
    </div>
  );
}
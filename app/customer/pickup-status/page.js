export default function PickupStatus() {
  return (
    <div className="container-page">
      <h1 className="section-title">Status Penjemputan</h1>

      <div className="card table-wrapper">
        <table className="table-theme">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jenis Limbah</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10-02-2026</td>
              <td>Laptop</td>
              <td>
                <span className="badge badge-warning">
                  Menunggu
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
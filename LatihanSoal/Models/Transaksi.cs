namespace LatihanSoal.Models
{
    public class Transaksi
    {
        public int Id { get; set; }
        public string? KodeTransaksi { get; set; }
        public DateTime Tanggal { get; set; }
        public int PelangganId { get; set; }
        public Pelanggan Pelanggan { get; set; }
        public List<TransaksiDetail>? TransaksiDetail { get; set; }
        public decimal Total { get; set; }
    }
}

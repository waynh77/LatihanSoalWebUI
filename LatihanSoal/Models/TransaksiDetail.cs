namespace LatihanSoal.Models
{
    public class TransaksiDetail
    {
        public int Id { get; set; }
        public int TransaksiId { get; set; }
        public Transaksi? Transaksi { get; set; }
        public int ProductId { get; set; }
        public Product? Produk { get; set; }
        public decimal Harga { get; set; }
        public int Jumlah { get; set; }
    }
}

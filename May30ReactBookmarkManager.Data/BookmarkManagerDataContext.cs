using Microsoft.EntityFrameworkCore;

namespace May30ReactBookmarkManager.Data
{
    public class BookmarkManagerDataContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarkManagerDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
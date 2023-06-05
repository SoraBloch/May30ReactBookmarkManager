using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace May30ReactBookmarkManager.Data
{
    public class BookmarkManagerDataContextFactory : IDesignTimeDbContextFactory<BookmarkManagerDataContext>
    {
        public BookmarkManagerDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}May30ReactBookmarkManager.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookmarkManagerDataContext(config.GetConnectionString("ConStr"));
        }
    }
}
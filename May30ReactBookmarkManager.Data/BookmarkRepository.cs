using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace May30ReactBookmarkManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmarkForUser(int userId, Bookmark b)
        {
            b.UserId = userId;
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Add(b);
            context.SaveChanges();
        }
        public List<Bookmark> GetBookmarksForUser(int userId)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
        public void UpdateBookmarkTitle(int id, string title)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            var bookmark = context.Bookmarks.FirstOrDefault(b => b.Id == id);
            bookmark.Title = title;
            context.SaveChanges();
        }
        public List<BookmarkUrls> GetFiveMostUsedBookmarks()
        {
            using var context = new BookmarkManagerDataContext(_connectionString);

            var bookmarkUrls = context.Bookmarks
                .GroupBy(b => b.Url)
                .Select(g => new BookmarkUrls { Url = g.Key, Count = g.Count() })
                .OrderByDescending(b => b.Count)
                .Take(5)
                .ToList();

            return bookmarkUrls;
        }
        public void DeleteBookmark(int bookmarkId)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from BookMarks where Id = {bookmarkId}");
        }
        public void UpdateBookmark(int id, string title)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            var bookmark = context.Bookmarks.FirstOrDefault(b => b.Id == id);
            bookmark.Title = title;
            context.SaveChanges();
        }
    }
}

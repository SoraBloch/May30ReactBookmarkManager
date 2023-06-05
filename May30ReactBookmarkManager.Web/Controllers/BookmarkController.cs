using May30ReactBookmarkManager.Data;
using May30ReactBookmarkManager.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace May30ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getbookmarksforcurrentuser")]
        [Authorize]
        public List<Bookmark> GetBookmarksForUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new BookmarkRepository(_connectionString);
            var user = GetCurrentUser();
            return repo.GetBookmarksForUser(user.Id);
        }
        [HttpGet]
        [Route("getfivemostusedbookmarks")]
        public List<BookmarkUrls> GetFiveMostUsedBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetFiveMostUsedBookmarks();
        }
        [HttpPost]
        [Route("addbookmark")]
        [Authorize]
        public void AddBookmark(Bookmark b)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            var user = GetCurrentUser();
            repo.AddBookmarkForUser(user.Id, b);
        }
        [HttpPost]
        [Route("deletebookmark")]
        [Authorize]
        public void DeleteBookmark(IdViewModel vm)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(vm.Id);
        }
        [HttpPost]
        [Route("updatebookmark")]
        [Authorize]
        public void UpdateBookmark(UpdateBookmarkViewModel vm)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(vm.Id, vm.Title);
        }
        private User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
    }
}

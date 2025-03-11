using QtechBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QtechBackend.Interfaces
{
    public interface IDocumentationService
    {
        Task<IEnumerable<Documentation>> GetDocumentationsAsync();
        Task<Documentation> GetDocumentationByIdAsync(int id);
        Task<Documentation> AddDocumentationAsync(Documentation documentation);
        Task<Documentation> UpdateDocumentationAsync(Documentation documentation);
        Task<Documentation> PatchDocumentationAsync(int id, Dictionary<string, object> patchData);
        Task DeleteDocumentationAsync(int id);
    }
}
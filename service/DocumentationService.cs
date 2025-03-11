using QtechBackend.Interfaces;
using QtechBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QtechBackend.Services
{
    public class DocumentationService : IDocumentationService
    {
        private readonly IDocumentationRepository _documentationRepository;

        public DocumentationService(IDocumentationRepository documentationRepository)
        {
            _documentationRepository = documentationRepository;
        }

        public async Task<IEnumerable<Documentation>> GetDocumentationsAsync()
        {
            return await _documentationRepository.GetDocumentationsAsync();
        }

        public async Task<Documentation> GetDocumentationByIdAsync(int id)
        {
            return await _documentationRepository.GetDocumentationByIdAsync(id);
        }

        public async Task<Documentation> AddDocumentationAsync(Documentation documentation)
        {
            return await _documentationRepository.AddDocumentationAsync(documentation);
        }

        public async Task<Documentation> UpdateDocumentationAsync(Documentation documentation)
        {
            return await _documentationRepository.UpdateDocumentationAsync(documentation);
        }

        public async Task<Documentation> PatchDocumentationAsync(int id, Dictionary<string, object> patchData)
        {
            return await _documentationRepository.PatchDocumentationAsync(id, patchData);
        }

        public async Task DeleteDocumentationAsync(int id)
        {
            await _documentationRepository.DeleteDocumentationAsync(id);
        }
    }
}
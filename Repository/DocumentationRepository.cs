using Microsoft.EntityFrameworkCore;
using QtechBackend.Context;
using QtechBackend.Interfaces;
using QtechBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QtechBackend.Repositories
{
    public class DocumentationRepository : IDocumentationRepository
    {
        private readonly ElearningContext _context;

        public DocumentationRepository(ElearningContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Documentation>> GetDocumentationsAsync()
        {
            return await _context.Documentations.ToListAsync();
        }

        public async Task<Documentation> GetDocumentationByIdAsync(int id)
        {
            return await _context.Documentations.FindAsync(id);
        }

        public async Task<Documentation> AddDocumentationAsync(Documentation documentation)
        {
            _context.Documentations.Add(documentation);
            await _context.SaveChangesAsync();
            return documentation;
        }

        public async Task<Documentation> UpdateDocumentationAsync(Documentation documentation)
        {
            _context.Entry(documentation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return documentation;
        }

        public async Task<Documentation> PatchDocumentationAsync(int id, Dictionary<string, object> patchData)
        {
            var existingDocumentation = await _context.Documentations.FindAsync(id);
            if (existingDocumentation == null) return null;

            foreach (var property in patchData)
            {
                var prop = existingDocumentation.GetType().GetProperty(property.Key);
                if (prop != null && prop.CanWrite)
                {
                    prop.SetValue(existingDocumentation, property.Value);
                }
            }
            await _context.SaveChangesAsync();
            return existingDocumentation;
        }

        public async Task DeleteDocumentationAsync(int id)
        {
            var documentation = await _context.Documentations.FindAsync(id);
            if (documentation != null)
            {
                _context.Documentations.Remove(documentation);
                await _context.SaveChangesAsync();
            }
        }
    }
}
﻿using Microsoft.EntityFrameworkCore;
using QtechBackend.Context;
using QtechBackend.Interfaces;
using QtechBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QtechBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ElearningContext _context;

        public UserRepository(ElearningContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Users>> GetUsersAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Users> GetUserByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task<Users> AddUserAsync(Users user)
        {
            _context.Employees.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Users> UpdateUserAsync(Users user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Users> PatchUserAsync(int id, Dictionary<string, object> patchData)
        {
            var existingUser = await _context.Employees.FindAsync(id);
            if (existingUser == null) return null;

            foreach (var property in patchData)
            {
                var prop = existingUser.GetType().GetProperty(property.Key);
                if (prop != null && prop.CanWrite)
                {
                    prop.SetValue(existingUser, property.Value);
                }
            }
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Employees.FindAsync(id);
            if (user != null)
            {
                _context.Employees.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Users> AuthenticateUserAsync(string email, string password)
        {
            return await _context.Employees.FirstOrDefaultAsync(u => u.Email == email && u.Password == password); // Ensure password hashing
        }
    }
}